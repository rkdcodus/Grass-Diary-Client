import styled from 'styled-components';
import Swal from 'sweetalert2';
import QuillEditor from './QuillEditor';
import EMOJI from '@constants/emoji';
import 'dayjs/locale/ko';

import { semantic } from '@styles/semantic';
import { Header, BackButton, Button } from '@components/index';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR } from '@constants/message';
import { useCreateDiary } from '@hooks/api/useCreateDiary';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { usePostImage } from '@hooks/api/usePostImage';
import { useUser } from '@state/user/useUser';
import { TYPO } from '@styles/typo';
import { ReactComponent as Publish } from '@svg/publish.svg';
import { ReactComponent as Close } from '@svg/close.svg';
import { ReactComponent as Tag } from '@svg/tag.svg';
import { ReactComponent as Lock } from '@svg/lock.svg';
import { ReactComponent as LockOpen } from '@svg/lock_open.svg';

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

  // 이미지 정보 state
  const [imageInfo, setImageInfo] = useState({
    name: '',
    size: '',
    extension: '',
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
    setImageInfo({ name: '', size: '', extension: '' });
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

  const handleImageChange = (file: File) => {
    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2); // KB 단위로 변환
    const fileExtension = fileName.split('.').pop() || '';

    setImageInfo({
      name: fileName,
      size: fileSize,
      extension: fileExtension,
    });
  };

  return (
    <>
      <Header />
      <Layout>
        <SaveWrap>
          <SaveWrapContainer>
            <BackButton goBackTo={'/main'} />
            <SaveWrapText>일기 쓰기</SaveWrapText>
          </SaveWrapContainer>
          <SaveWrapTime>
            {diaryInfo.month}월 {diaryInfo.date}일 {diaryInfo.day}요일
          </SaveWrapTime>
          <SaveBtnContainer>
            <SavePrevBtn>
              <SavePrevBtnText>임시저장(Ctrl+S)</SavePrevBtnText>
            </SavePrevBtn>
            <SaveBtn>
              <SaveBtnText>저장하기</SaveBtnText>
              <Publish />
            </SaveBtn>
          </SaveBtnContainer>
        </SaveWrap>
        <DiaryModeSelector>
          <DailyQuestionBox>
            <input type="radio" />
            <ModeBoxContainer>
              <DiaryModeSelectorText>오늘의 질문에 대해</DiaryModeSelectorText>
              <DiaryModeSelectorSubText>
                오늘의 질문을 주제로 한 일기를 작성해보세요
              </DiaryModeSelectorSubText>
            </ModeBoxContainer>
          </DailyQuestionBox>
          <CustomEntryBox>
            <input type="radio" />
            <ModeBoxContainer>
              <DiaryModeSelectorText>나만의 일기</DiaryModeSelectorText>
              <DiaryModeSelectorSubText>
                나의 오늘 하루에 대해 자유롭게 작성해보세요
              </DiaryModeSelectorSubText>
            </ModeBoxContainer>
          </CustomEntryBox>
        </DiaryModeSelector>
        <Divider>
          <DividerLine />
        </Divider>
        <ImageLayout>
          <ImageContainer>
            {image.imageURL ? (
              <>
                <Image>
                  <img src={image.imageURL} alt="image file" />
                </Image>
                <ImageName>{imageInfo.name}</ImageName>
                <ImageData>{imageInfo.size} KB</ImageData>
                <button onClick={removeImage}>
                  <ImageDelete>
                    <Close />
                  </ImageDelete>
                </button>
              </>
            ) : null}
          </ImageContainer>
        </ImageLayout>
        <MainContainer>
          <QuillEditor
            onContentChange={content =>
              setDiaryField({ quillContent: content })
            }
            quillContent={diaryInfo.quillContent}
            setImage={setImage}
            setFile={setFile}
            handleImageChange={handleImageChange}
          />
        </MainContainer>
        <HashtagContainer>
          <HashtagTitleBox>
            <HashtagTitle>해시태그</HashtagTitle>
          </HashtagTitleBox>
          <HashtagBox>
            <HashtagContent>
              <Tag />
              <HashtagPlaceholder>일상, 친구, 점심 등</HashtagPlaceholder>
            </HashtagContent>
          </HashtagBox>
          <CaptionBox>
            <CaptionText>
              태그명을 입력하고, 스페이스바를 누르면 저장돼요
            </CaptionText>
          </CaptionBox>
        </HashtagContainer>
        <SelectableContainer>
          <SelectablePublicBox>
            <SelectablePublicText>일기 공개 여부</SelectablePublicText>
            <SelectableSection>
              <RadioBox>
                <RadioBtn>
                  <input
                    id="radio-btn-public"
                    type="radio"
                    value="public"
                    checked={!diaryInfo.isPrivate}
                    onChange={handlePublicChange}
                  />
                  <label htmlFor="radio-btn-public"></label>
                </RadioBtn>
                <LockOpen />
                <RadioText>공개</RadioText>
              </RadioBox>
              <RadioBox>
                <RadioBtn>
                  <input
                    id="radio-btn-private"
                    type="radio"
                    value="private"
                    checked={diaryInfo.isPrivate}
                    onChange={handlePrivateChange}
                  />
                  <label htmlFor="radio-btn-private"></label>
                </RadioBtn>
                <Lock />
                <RadioText>비공개</RadioText>
              </RadioBox>
            </SelectableSection>
          </SelectablePublicBox>
        </SelectableContainer>
      </Layout>
      <div>
        <div style={{ fontSize: '30px' }}>{EMOJI[diaryInfo.moodValue]}</div>
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
      <div>
        {diaryInfo.hashArr.map((tag, index) => (
          <span key={index}>
            {tag}
            <button onClick={() => removeHashtag(index)}>X</button>
          </span>
        ))}
      </div>
    </>
  );
};

export default CreateDiary;

const Layout = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: var(--vw-desktop-min, 60rem);
  padding: var(--gap-xl, 1.5rem) var(--gap-9xl, 8.5rem) var(--gap-4xl, 3rem)
    var(--gap-9xl, 8.5rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem);
  border-top: var(--stroke-empty, 0px) solid
    ${semantic.light.border.transparent.alternative};
  border-right: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  border-bottom: var(--stroke-empty, 0px) solid
    ${semantic.light.border.transparent.alternative};
  border-left: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.subtlest};
`;

const SaveWrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-xl, 1.5rem);
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const SaveWrapContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const SaveWrapText = styled.p`
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.title1};

  opacity: var(--opacity-visible, 1);
`;

const SaveWrapTime = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.label1}
`;

const SaveBtnContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-md, 1rem);

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const SavePrevBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const SavePrevBtnText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
`;

const SaveBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.interactive.solid.disabled};
`;

const SaveBtnText = styled.p`
  color: ${semantic.light.object.transparent.disabled};
  text-align: center;

  ${TYPO.label2}
`;

const DiaryModeSelector = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const ModeBoxContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-4xs, 0.25rem);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const DiaryModeSelectorText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.label2}
`;

const DiaryModeSelectorSubText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.caption1}
`;

const DailyQuestionBox = styled.div`
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;

  border-radius: var(--radius-sm, 0.75rem);
  border: var(--stroke-thin, 1px) solid ${semantic.light.accent.solid.hero};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.accent.transparent.alternative};
`;

const CustomEntryBox = styled.div`
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;

  border-radius: var(--radius-sm, 0.75rem);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const Divider = styled.span`
  display: flex;
  height: 0rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const DividerLine = styled.span`
  width: 43rem;
  height: 0.0625rem;

  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.border.transparent.alternative};
`;

const ImageLayout = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem) var(--gap-4xs, 0.25rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
`;

const Image = styled.div`
  width: 1.25rem;
  height: 1.25rem;

  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const ImageName = styled.p`
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.caption1}
`;

const ImageData = styled.p`
  color: ${semantic.light.object.transparent.assistive};

  ${TYPO.caption1}
`;

const ImageDelete = styled.div`
  display: flex;
  padding: var(--gap-4xs, 0.25rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-md, 1rem);

  border-radius: var(--radius-2xs, 0.25rem);
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md, 1rem);
  flex: 1 0 0;
  align-self: stretch;
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
  align-items: flex-start;
  gap: var(--gap-2xs, 0.5rem);
  align-self: stretch;
`;

const HashtagTitleBox = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem) var(--gap-4xs, 0.25rem);
  align-items: flex-start;
  align-self: stretch;
`;

const HashtagTitle = styled.p`
  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.label1}
`;

const HashtagBox = styled.div`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  align-items: center;
  gap: var(--gap-sm, 0.75rem);
  align-self: stretch;

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.bg.solid.normal};
`;

const HashtagContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-sm, 0.75rem);
  flex: 1 0 0;
`;

const HashtagPlaceholder = styled.p`
  color: ${semantic.light.object.transparent.assistive};
  ${TYPO.body1}
`;

const CaptionBox = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem) var(--gap-md, 1rem);
  align-items: flex-start;
  align-self: stretch;
`;

const CaptionText = styled.p`
  color: ${semantic.light.object.transparent.assistive};
  ${TYPO.caption1}
`;

const SelectableContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const SelectablePublicBox = styled.div`
  display: flex;
  padding: var(--gap-sm, 0.75rem) var(--gap-md, 1rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.bg.solid.normal};
`;

const SelectablePublicText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  ${TYPO.label1}
`;

const SelectableSection = styled.div`
  display: flex;
  padding: var(--gap-3xs, 0.375rem) var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
`;

const RadioBtn = styled.div`
  [type='radio'] {
    display: none;
  }

  label {
    display: flex;
    width: 1.25rem;
    height: 1.25rem;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-lg, 1.5rem);
    border: var(--stroke-thick, 0.125rem) solid
      ${semantic.light.border.transparent.normal};
    background: ${semantic.light.fill.transparent.assistive};
    cursor: pointer;
    transition: border 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 0.2rem lightgray;
    }
  }

  [type='radio']:checked + label {
    background: ${semantic.light.accent.transparent.hero};
    border: var(--stroke-thicker, 0.25rem) solid
      ${semantic.light.accent.solid.hero};
  }
`;

const RadioText = styled.p`
  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.label1}
`;
