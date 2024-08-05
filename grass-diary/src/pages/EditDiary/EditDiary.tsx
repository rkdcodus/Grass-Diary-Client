import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import QuillEditor from '../CreateDiary/QuillEditor';

import { Header, BackButton, Button, Container } from '@components/index';
import EMOJI from '@constants/emoji';
import 'dayjs/locale/ko';
import { ERROR } from '@constants/message';
import { useParamsId } from '@hooks/useParamsId';
import { usePatchDiary } from '@hooks/api/usePatchDiary';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useDiaryDetail } from '@hooks/api/useDiaryDetail';

const CreateDiaryStyle = stylex.create({
  container: {
    background: '#F9F9F9',
    width: '100vw',
    margin: 'auto',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 100px',
    maxWidth: '1200px',
  },

  title: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },

  borderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '100px',
  },

  inputStyle: {
    backgroundColor: 'white',
    border: 'solid 1px #BFBFBF',
    borderRadius: '10px',
    padding: '20px',
    width: '700px',
    height: '50px',
    outline: 'none',
    resize: 'none',
  },

  todayMood: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hashtag: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    paddingTop: '20px',
  },

  hashtagBox: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    border: 'solid 1px #bfbfbf',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },

  hashtagBtn: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
  },
  imageFile: {
    padding: '10px 0',
    width: '170px',
  },
});

const EditDiary = () => {
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
  const [image, setImage] = useState<DiaryImage>({
    imageId: 0,
    imageURL: '',
  });

  const diaryId = useParamsId();
  const { mutate } = usePatchDiary(diaryId);
  const { date } = useTodayDate();
  const { detail } = useDiaryDetail(diaryId);

  // 상태 업데이트 함수
  const setDiaryField = (field: Partial<IDiaryInfo>) => {
    setDiaryInfo(prev => ({ ...prev, ...field }));
  };

  const handlePrivateChange = () => {
    setDiaryField({ isPrivate: true });
  };

  const handlePublicChange = () => {
    setDiaryField({ isPrivate: false });
  };

  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryField({ moodValue: parseInt(e.target.value) });
  };

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };

  // 해시태그 로직 함수
  const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputText = (e.target as HTMLInputElement).value.trim();
      const validCharsPattern = /[가-힣A-Za-z0-9]+/g;

      const matches = inputText.match(validCharsPattern);
      if (matches && matches.length > 0 && diaryInfo.hashArr.length < 15) {
        const hashtagText = matches.join('');
        setDiaryField({ hashArr: [...diaryInfo.hashArr, hashtagText] });
        setHashtag('');
      }
    }
  };

  // 해시태그를 배열에서 제거하는 함수
  const removeHashtag = (index: number) => {
    setDiaryField({ hashArr: diaryInfo.hashArr.filter((_, i) => i !== index) });
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
      imageId: image.imageId,
    };

    if (!quillContent || !quillContent.trim()) {
      Swal.fire({
        title: ERROR.DIARY_NOT_WRITE,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#28CA3B',
        confirmButtonText: '확인',
      });
      return; // 저장 중단
    }

    mutate(request);
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
    if (detail) {
      setDiaryField({
        hashArr: detail.tags.map((tag: ITages) => tag.tag),
        isPrivate: detail.isPrivate,
        moodValue: detail.transparency * 10,
        quillContent: detail.content,
      });
      if (detail.image.length) {
        setImage({
          imageId: detail.image[0].imageId,
          imageURL: detail.image[0].imageURL,
        });
      }
    }
  }, [date, detail]);

  return (
    <Container>
      <header>
        <Header />
      </header>
      <main {...stylex.props(CreateDiaryStyle.container)}>
        <BackButton goBackTo={'/main'} />
        <section {...stylex.props(CreateDiaryStyle.title)}>
          <h2>
            {diaryInfo.month}월 {diaryInfo.date}일 {diaryInfo.day}요일
          </h2>
        </section>
        <section>
          <article {...stylex.props(CreateDiaryStyle.subtitle)}>
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
            <div {...stylex.props(CreateDiaryStyle.todayMood)}>
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
            <img
              {...stylex.props(CreateDiaryStyle.imageFile)}
              src={image.imageURL}
              alt="image file"
            />
            <button onClick={removeImage}>삭제</button>
          </>
        ) : null}
        <QuillEditor
          onContentChange={content => setDiaryField({ quillContent: content })}
          quillContent={diaryInfo.quillContent}
          setImage={setImage}
        />
        <section>
          <article {...stylex.props(CreateDiaryStyle.borderFooter)}>
            <input
              {...stylex.props(CreateDiaryStyle.inputStyle)}
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
          <div {...stylex.props(CreateDiaryStyle.hashtag)}>
            {diaryInfo.hashArr.map((tag, index) => (
              <span key={index} {...stylex.props(CreateDiaryStyle.hashtagBox)}>
                {tag}
                <button
                  {...stylex.props(CreateDiaryStyle.hashtagBtn)}
                  onClick={() => removeHashtag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </section>
      </main>
    </Container>
  );
};

export default EditDiary;
