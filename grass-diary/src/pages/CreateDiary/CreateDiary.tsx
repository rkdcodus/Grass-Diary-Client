import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import QuillEditor from './QuillEditor';
import 'dayjs/locale/ko';

import { Header, BackButton, Button, Container } from '@components/index';
import EMOJI from '@constants/emoji';
import { ERROR } from '@constants/message';
import { useCreateDiary } from '@hooks/api/useCreateDiary';
import 'dayjs/locale/ko';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { usePostImage } from '@hooks/api/usePostImage';
import { useUser } from '@state/user/useUser';

const CreateDiary = () => {
  const navigate = useNavigate();
  const memberId = useUser();
  const { mutate: createDiary } = useCreateDiary(memberId);
  const { mutate: postImage } = usePostImage();
  const { date } = useTodayDate();
  const [diaryInfo, setDiaryInfo] = useState<IDiaryInfo>({
    hashArr: [],
    moodValue: 5,
    quillContent: '',
    isPrivate: true,
    year: null,
    month: null,
    date: null,
    day: null,
  });

  // 해시태그 state
  const [hashtag, setHashtag] = useState<string>('');

  // 이미지 state
  const [file, setFile] = useState<FormData>();
  const [image, setImage] = useState<DiaryImage>({
    imageId: 0,
    imageURL: '',
  });

  // 상태 업데이트 함수
  const setDiaryField = (field: Partial<IDiaryInfo>) => {
    setDiaryInfo(prev => ({ ...prev, ...field }));
  };

  const handlePrivateChange = () => setDiaryField({ isPrivate: true });
  const handlePublicChange = () => setDiaryField({ isPrivate: false });
  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDiaryField({ moodValue: parseInt(e.target.value) });
  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHashtag(e.target.value);

  // 해시태그 로직 함수
  const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputText = (e.target as HTMLInputElement).value.trim();
      const validCharsPattern =
        /[가-힣A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;

      const matches = inputText.match(validCharsPattern);
      if (matches && matches.length > 0 && diaryInfo.hashArr.length < 15) {
        const hashtagText = matches.join('');
        // 중복 체크
        if (!diaryInfo.hashArr.includes(hashtagText)) {
          setDiaryField({ hashArr: [...diaryInfo.hashArr, hashtagText] });
        } else {
          alert('이미 존재하는 해시태그입니다.'); // 작성 페이지 UI 변경 시 수정
        }
        setHashtag('');
      }
    }
  };

  // 해시태그를 배열에서 제거하는 함수
  const removeHashtag = (index: number) => {
    setDiaryField({ hashArr: diaryInfo.hashArr.filter((_, i) => i !== index) });
  };

  const checkWritingPermission = () => {
    const lastWritingDate = localStorage.getItem('lastWritingDate');
    const currentDate = `${diaryInfo.year}년/${diaryInfo.month}월/${diaryInfo.date}일`;
    return lastWritingDate !== currentDate;
  };

  const removeImage = () => {
    setImage({
      imageId: 0,
      imageURL: '',
    });
  };

  const handleSave = async () => {
    const { quillContent, isPrivate, hashArr, moodValue } = diaryInfo;
    const request = {
      content: quillContent,
      isPrivate,
      conditionLevel: `LEVEL_${moodValue}`,
      hashtags: hashArr,
      imageId: 0,
    };

    if (!checkWritingPermission()) {
      Swal.fire({
        title: ERROR.diary_already_exists,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#28CA3B',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!diaryInfo.quillContent || !diaryInfo.quillContent.trim()) {
      Swal.fire({
        title: ERROR.diary_not_write,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#28CA3B',
        confirmButtonText: '확인',
      });
      return;
    }

    // 사용자가 이미지를 첨부할 경우 postImage -> createDiary 실행
    if (file) {
      postImage(file, {
        onSuccess: res => {
          const request = {
            content: quillContent,
            isPrivate,
            conditionLevel: `LEVEL_${moodValue}`,
            hashtags: hashArr,
            imageId: res.data.imageId,
          };

          createDiary(request, {
            onSuccess: response => {
              const newDiaryId = response.data.diaryId;
              navigate(`/diary/${newDiaryId}`, { replace: true });
              const currentDate = `${diaryInfo.year}년/${diaryInfo.month}월/${diaryInfo.date}일`;
              localStorage.setItem('lastWritingDate', currentDate);
            },
            onError: error => {
              console.error(error);
            },
          });
        },
      });
      return;
    }

    createDiary(request, {
      onSuccess: response => {
        const newDiaryId = response.data.diaryId;
        navigate(`/diary/${newDiaryId}`, { replace: true });
        const currentDate = `${diaryInfo.year}년/${diaryInfo.month}월/${diaryInfo.date}일`;
        localStorage.setItem('lastWritingDate', currentDate);
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    if (date) {
      setDiaryField({
        year: date.year,
        month: date.month,
        date: date.date,
        day: date.day,
      });
    }
  }, [date]);

  return (
    <Container>
      <header>
        <Header />
      </header>
      <main>
        <BackButton goBackTo={'/main'} />
        <section>
          <h2>
            {diaryInfo.month}월 {diaryInfo.date}일 {diaryInfo.day}요일
          </h2>
        </section>
        <section>
          <article>
            <label>
              <input
                type="radio"
                value="private"
                checked={diaryInfo.isPrivate}
                onChange={handlePrivateChange}
              />
              비공개
              <input
                type="radio"
                value="public"
                checked={!diaryInfo.isPrivate}
                onChange={handlePublicChange}
              />
              공개
            </label>
            <div>
              <div style={{ fontSize: '30px' }}>
                {EMOJI[diaryInfo.moodValue]}
              </div>
              <div>오늘의 기분</div>
              <input
                type="range"
                name="todayMood"
                min="1"
                max="9"
                list="values"
                value={diaryInfo.moodValue}
                onChange={handleMoodChange}
              />
              <datalist id="values">
                <option value="0" label="0"></option>
                <option value="2" label="2"></option>
                <option value="4" label="4"></option>
                <option value="6" label="6"></option>
                <option value="8" label="8"></option>
                <option value="10" label="10"></option>
              </datalist>
            </div>
          </article>
        </section>
        {image.imageURL ? (
          <>
            <img src={image.imageURL} alt="image file" />
            <button onClick={removeImage}>삭제</button>
          </>
        ) : null}
        <QuillEditor
          onContentChange={content => setDiaryField({ quillContent: content })}
          quillContent={diaryInfo.quillContent}
          setImage={setImage}
          setFile={setFile}
        />
        <section>
          <article>
            <input
              type="text"
              value={hashtag}
              onChange={onChangeHashtag}
              onKeyUp={addHashtag}
              placeholder={hashtag ? '' : '#해시태그'}
            />
            <Button
              text="저장"
              width="120px"
              defaultColor="#2d2d2d"
              hoverColor="#FFF"
              defaultBgColor="#FFFFFF"
              hoverBgColor="#111111"
              border="1px solid #bfbfbf"
              onClick={handleSave}
            />
          </article>
          <div>
            {diaryInfo.hashArr.map((tag, index) => (
              <span key={index}>
                {tag}
                <button onClick={() => removeHashtag(index)}>X</button>
              </span>
            ))}
          </div>
        </section>
      </main>
    </Container>
  );
};

export default CreateDiary;
