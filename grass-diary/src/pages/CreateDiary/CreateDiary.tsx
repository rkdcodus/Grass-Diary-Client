import styled, { css, keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import QuillEditor from './QuillEditor';
import EMOJI from '@constants/emoji';
import 'dayjs/locale/ko';

import { semantic } from '@styles/semantic';
import { Header, BackButton } from '@components/index';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR } from '@constants/message';
import { useCreateDiary } from '@hooks/api/useCreateDiary';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { usePostImage } from '@hooks/api/usePostImage';
import { useUser } from '@state/user/useUser';
import { TYPO } from '@styles/typo';
import { ReactComponent as Publish } from '@svg/publish.svg';
import { ReactComponent as PublishOn } from '@svg/publish_on.svg';
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

  // 오늘의 질문, 나만의 일기 state
  const [selectedMode, setSelectedMode] = useState('dailyQuestion');

  // 저장 버튼 활성화 state
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  // 해시태그 state
  const [hashtag, setHashtag] = useState<string>('');
  const [captionMessage, setCaptionMessage] = useState<string>(
    '태그명을 입력하고, 스페이스바를 누르면 저장돼요',
  );
  const [captionColor, setCaptionColor] = useState<string>(
    semantic.light.object.transparent.assistive,
  );

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

  const handleModeChange = (mode: string) => setSelectedMode(mode);
  const handlePrivateChange = () => setDiaryField({ isPrivate: true });
  const handlePublicChange = () => setDiaryField({ isPrivate: false });

  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDiaryField({ moodValue: parseInt(e.target.value) });

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);

    if (e.target.value === '') {
      setCaptionMessage('태그명을 입력하고, 스페이스바를 누르면 저장돼요');
      setCaptionColor(semantic.light.object.transparent.assistive);
    }

    if (e.target.value.length > 10) {
      setCaptionMessage('해시태그 길이가 너무 깁니다.');
      setCaptionColor(semantic.light.feedback.solid.negative);
      return setHashtag('');
    }
  };

  // 해시태그 로직 함수
  const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') {
      return; // 'Enter'나 'Space'가 아닌 경우 즉시 종료
    }

    e.preventDefault();
    const inputText = (e.target as HTMLInputElement).value.trim();

    if (inputText === '') {
      return; // 빈 문자열이면 즉시 종료
    }

    const specialCharsPattern = /[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/~`]/;
    const invalidKoreanPattern = /[ㄱ-ㅎㅏ-ㅣ]/;
    const validCharsPattern =
      /[가-힣A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;

    if (specialCharsPattern.test(inputText)) {
      setCaptionMessage('태그에 특수문자는 넣을 수 없어요');
      setCaptionColor(semantic.light.feedback.solid.negative);
      return setHashtag(''); // 특수문자 포함 시 즉시 종료
    }

    if (invalidKoreanPattern.test(inputText)) {
      setCaptionMessage('올바른 한글을 입력해주세요');
      setCaptionColor(semantic.light.feedback.solid.negative);
      return setHashtag(''); // 잘못된 한글 포함 시 즉시 종료
    }

    if (!validCharsPattern.test(inputText)) {
      return; // 유효한 문자가 없으면 즉시 종료
    }

    const hashtagText = inputText.match(validCharsPattern)!.join('');

    if (diaryInfo.hashArr.includes(hashtagText)) {
      setCaptionMessage('이미 존재하는 해시태그입니다.');
      setCaptionColor(semantic.light.feedback.solid.negative);
      return setHashtag(''); // 중복된 해시태그일 때 즉시 종료
    }

    if (diaryInfo.hashArr.length >= 15) {
      setCaptionMessage('해시태그는 15개까지 입력 가능합니다.');
      setCaptionColor(semantic.light.feedback.solid.negative);
      return setHashtag(''); // 해시태그 최대 개수 초과 시 즉시 종료
    }

    // 모든 조건을 통과한 경우에만 해시태그 추가
    setDiaryField({ hashArr: [...diaryInfo.hashArr, hashtagText] });
    setCaptionMessage('태그명을 입력하고, 스페이스바를 누르면 저장돼요');
    setCaptionColor(semantic.light.object.transparent.assistive);
    setHashtag('');
  };

  // 해시태그 제거 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && hashtag === '') {
      const lastHashtag = diaryInfo.hashArr[diaryInfo.hashArr.length - 1];

      if (lastHashtag) {
        setDiaryField({
          hashArr: diaryInfo.hashArr.slice(0, -1),
        });
        setHashtag(lastHashtag);
      }
    }
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
    if (isContentEmpty) return; // 일기 내용이 비어 있으면 저장 요청 불가

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

  const handleContentChange = (content: string) => {
    setDiaryField({ quillContent: content });
    const checkText = content.replace(/<\/?[^>]+(>|$)/g, '');
    setIsContentEmpty(checkText.trim().length === 0);
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
            <SaveBtn onClick={handleSave} disabled={isContentEmpty}>
              <SaveBtnText disabled={isContentEmpty}>저장하기</SaveBtnText>
              {isContentEmpty ? <Publish /> : <PublishOn />}
            </SaveBtn>
          </SaveBtnContainer>
        </SaveWrap>
        <DiaryModeSelector>
          <DailyQuestionBox isSelected={selectedMode === 'dailyQuestion'}>
            <ModeBtn>
              <input
                id="mode-btn-question"
                type="radio"
                checked={selectedMode === 'dailyQuestion'}
                onChange={() => handleModeChange('dailyQuestion')}
              />
              <label htmlFor="mode-btn-question"></label>
            </ModeBtn>
            <ModeBoxContainer>
              <DiaryModeSelectorText>오늘의 질문에 대해</DiaryModeSelectorText>
              <DiaryModeSelectorSubText>
                오늘의 질문을 주제로 한 일기를 작성해보세요
              </DiaryModeSelectorSubText>
            </ModeBoxContainer>
          </DailyQuestionBox>
          <CustomEntryBox isSelected={selectedMode === 'customEntry'}>
            <ModeBtn>
              <input
                id="mode-btn-custom"
                type="radio"
                checked={selectedMode === 'customEntry'}
                onChange={() => handleModeChange('customEntry')}
              />
              <label htmlFor="mode-btn-custom"></label>
            </ModeBtn>
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
            onContentChange={handleContentChange}
            quillContent={diaryInfo.quillContent}
            setImage={setImage}
            setFile={setFile}
            handleImageChange={handleImageChange}
            selectedMode={selectedMode}
          />
        </MainContainer>
        <HashtagContainer>
          <HashtagTitleBox>
            <HashtagTitle>해시태그</HashtagTitle>
          </HashtagTitleBox>
          <HashtagBox>
            <HashtagContent>
              <Tag />
              <HashtagArrTitle>
                {diaryInfo.hashArr.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    {`  `}
                  </span>
                ))}
              </HashtagArrTitle>
              <HashtagInput
                type="text"
                value={hashtag}
                onChange={onChangeHashtag}
                onKeyUp={addHashtag}
                onKeyDown={handleKeyDown}
                placeholder={
                  diaryInfo.hashArr.length > 0
                    ? '태그명을 작성해주세요...'
                    : '일상, 친구, 점심 등'
                }
              />
            </HashtagContent>
          </HashtagBox>
          <CaptionBox>
            <CaptionText color={captionColor}>{captionMessage}</CaptionText>
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
          <EmotionBox>
            <EmotionText>오늘의 기분</EmotionText>
            <EmojiBox>
              {Object.entries(EMOJI).map(([index, emoji]) => (
                <EmojiSelectableBox key={index}>
                  <EmojiInput
                    type="radio"
                    id={`emoji-${index}`}
                    name="mood"
                    value={index}
                    checked={diaryInfo.moodValue.toString() === index}
                    onChange={handleMoodChange}
                  />
                  <EmojiLabel htmlFor={`emoji-${index}`}>{emoji}</EmojiLabel>
                </EmojiSelectableBox>
              ))}
            </EmojiBox>
          </EmotionBox>
        </SelectableContainer>
      </Layout>
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
  background: ${semantic.light.bg.solid.normal};
`;

const SavePrevBtnText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
`;

const SaveBtn = styled.button<{ disabled: boolean }>`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  background: ${({ disabled }) =>
    disabled
      ? semantic.light.interactive.solid.disabled
      : semantic.light.accent.solid.normal};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? semantic.light.interactive.solid.disabled
        : semantic.light.accent.solid.hero};
  }
  transition: all 0.2s ease-in;
`;

const SaveBtnText = styled.p<{ disabled: boolean }>`
  color: ${({ disabled }) =>
    disabled
      ? semantic.light.object.transparent.disabled
      : semantic.light.base.solid.white};
  text-align: center;

  ${TYPO.label2}
`;

const DiaryModeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const ModeBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-4xs, 0.25rem);
  flex: 1 0 0;
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

const DailyQuestionBox = styled.div<DiaryQuestionBox>`
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;
  border-radius: var(--radius-sm, 0.75rem);
  border: var(--stroke-thin, 1px) solid
    ${({ isSelected }) =>
      isSelected
        ? semantic.light.accent.solid.hero
        : semantic.light.border.transparent.alternative};
  background: ${({ isSelected }) =>
    isSelected
      ? semantic.light.accent.transparent.alternative
      : semantic.light.bg.solid.normal};
`;

const CustomEntryBox = styled.div<DiaryQuestionBox>`
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;
  border-radius: var(--radius-sm, 0.75rem);
  border: var(--stroke-thin, 1px) solid
    ${({ isSelected }) =>
      isSelected
        ? semantic.light.accent.solid.hero
        : semantic.light.border.transparent.alternative};
  background: ${({ isSelected }) =>
    isSelected
      ? semantic.light.accent.transparent.alternative
      : semantic.light.bg.solid.normal};
`;

const ModeBtn = styled.div`
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
      box-shadow: 0 0 0 0.1rem lightgray;
    }
  }

  [type='radio']:checked + label {
    background: ${semantic.light.accent.transparent.hero};
    border: var(--stroke-thicker, 0.25rem) solid
      ${semantic.light.accent.solid.hero};
  }
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

const HashtagInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${TYPO.body1}

  &::placeholder {
    color: ${semantic.light.object.transparent.assistive};
  }
`;

const HashtagArrTitle = styled.p`
  color: ${semantic.light.accent.solid.hero};

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.625rem;
`;

const CaptionBox = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem) var(--gap-md, 1rem);
  align-items: flex-start;
  align-self: stretch;
`;

const CaptionTextShake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const CaptionText = styled.p<{ color: string }>`
  color: ${props => props.color};
  ${TYPO.caption1}

  ${props =>
    props.color === semantic.light.feedback.solid.negative &&
    css`
      animation: ${CaptionTextShake} 0.3s ease;
    `}
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
      box-shadow: 0 0 0 0.1rem lightgray;
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

const EmotionBox = styled.div`
  display: flex;
  padding: var(--gap-sm, 0.75rem) var(--gap-md, 1rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.bg.solid.normal};
`;

const EmotionText = styled.p`
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.label1}
`;

const EmojiBox = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs, 0.625rem);
`;

const EmojiSelectableBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: var(--stroke-thin, 0.06rem) solid
    ${semantic.light.border.transparent.normal};
  border-radius: var(--radius-xs, 0.5rem);
  background: ${semantic.light.fill.transparent.alternative};
`;

const EmojiInput = styled.input`
  display: none;
`;

const EmojiLabel = styled.label`
  cursor: pointer;
  font-size: 1.3rem;
  border-radius: var(--radius-xs, 0.5rem);

  transition: all 0.2s ease-in-out;

  ${EmojiInput}:checked + & {
    padding: 0rem 0.2rem 0rem 0.2rem;
    background: ${semantic.light.accent.transparent.hero};
    border: var(--stroke-thicker, 0.1rem) solid
      ${semantic.light.accent.solid.hero};
  }
`;
