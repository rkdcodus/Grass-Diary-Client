import stylex from '@stylexjs/stylex';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import { Header, BackButton, Like } from '@components/index';
import EMOJI from '@constants/emoji';
import Setting from './Setting';
import { useDiaryDetail } from '@hooks/api/useDiaryDetail';
import ImageModal from './modal/ImageModal';
import { useParamsId } from '@hooks/useParamsId';
import { useUser } from '@state/user/useUser';

import { ReactComponent as AvatarBg } from '@svg/avatarBg.svg';
import { ReactComponent as LeftArrow } from '@svg/chevron_left.svg';
import { ReactComponent as LockOpen } from '@svg/lock_open.svg';

import { ReactComponent as Tag } from '@svg/tag.svg';
import { ReactComponent as LogoText } from '@svg/logo.svg';
import logoIcon from '@image/sampleLogo_white.png';

const styles = stylex.create({
  wrap: {
    background: '#F9F9F9',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
    minHeight: '100vh',
    margin: '10px auto 0',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 80px 0 80px',
  },
  feelBackground: {
    position: 'relative',
    width: '40px',
    height: '40px',
    marginLeft: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '1px solid #BFBFBF',
  },
  feel: backgroundColor => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor,
  }),
  diaryFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '36px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '30px',
  },
});

const titleStyle = stylex.create({
  progileBox: {
    position: 'relative',
    width: '50px',
    height: '50px',
    margin: '44px 0 28px 0',
  },
  profileImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  emoji: {
    zIndex: '1',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate(3px, 3px)',
  },
  name: {
    width: '300px',
    position: 'absolute',
    bottom: 0,
    left: '70px',
    fontSize: '13px',
  },
  diaryHeader: {
    position: 'relative',
  },
  title: {
    fontSize: '40px',
    fontWeight: '600',
    marginRight: '24px',
  },
  time: {
    fontSize: '16px',
    marginRight: '24px',
  },
  privateOrPubilc: {
    fontSize: '16px',
  },
  ellipsis: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: '7px',
    cursor: 'pointer',
  },
});

const contentStyle = stylex.create({
  diaryContent: {
    margin: '36px 0px',
    borderTop: '1px solid #BFBFBF',
  },
  hashTag: {
    color: '#28B91C',
    fontSize: '13px',
    margin: '36px 0',
  },
  content: {
    minHeight: '200px',
  },
  image: {
    display: 'block',
    margin: '30px auto',
    width: '50%',
    cursor: 'pointer',
  },
});

const DiaryDetail = () => {
  const diaryId = useParamsId();
  const memberId = useUser();
  const [likeCount, setLikeCount] = useState(0);
  const [mood, setMood] = useState('');
  const [imageModal, setImageModal] = useState(false);
  const { detail, writer, isLoading } = useDiaryDetail(diaryId);

  const zoom = () => {
    if (!imageModal) {
      setImageModal(true);
    }
  };

  useEffect(() => {
    if (detail) {
      setLikeCount(detail.likeCount);
      setMood(EMOJI[detail.transparency * 10]);
    }
  }, [detail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = (htmlContent: string | undefined) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  if (isLoading) {
    return (
      <>
        <Container>
          <Header />
        </Container>
      </>
    );
  }

  return (
    // <Container>
    //   {imageModal && detail?.image.length && (
    //     <ImageModal
    //       img={detail?.image[0].imageURL}
    //       setImageModal={setImageModal}
    //     />
    //   )}
    //   <Header />
    //   <div {...stylex.props(styles.wrap)}>
    //     <BackButton />
    //     {/* 일기 타이틀  */}
    //     <div>
    //       <div {...stylex.props(titleStyle.progileBox)}>
    //         <img
    //           {...stylex.props(titleStyle.profileImg)}
    //           src={writer?.profileImageURL}
    //         ></img>
    //         <div {...stylex.props(titleStyle.emoji)}>{mood}</div>
    //         <div {...stylex.props(titleStyle.name)}>{writer?.nickName}</div>
    //       </div>
    //       <div {...stylex.props(titleStyle.diaryHeader)}>
    //         <span {...stylex.props(titleStyle.title)}>
    //           {detail?.createdDate}
    //         </span>
    //         <span {...stylex.props(titleStyle.time)}>{detail?.createdAt}</span>
    //         <span {...stylex.props(titleStyle.privateOrPubilc)}>
    //           {detail?.isPrivate ? '비공개' : '공개'}
    //         </span>
    //         <div {...stylex.props(titleStyle.ellipsis)}>
    //           {memberId === detail?.memberId ? (
    //             <Setting diaryId={diaryId} createdDate={detail?.createdDate} />
    //           ) : null}
    //         </div>
    //       </div>
    //     </div>

    //     {/* 일기 내용 */}
    //     <div {...stylex.props(contentStyle.diaryContent)}>
    //       <div {...stylex.props(contentStyle.hashTag)}>
    //         {detail?.tags?.map(tag => {
    //           return `#${tag.tag} `;
    //         })}
    //       </div>
    //       {detail?.image.length ? (
    //         <img
    //           {...stylex.props(contentStyle.image)}
    //           src={detail?.image[0].imageURL}
    //           onClick={zoom}
    //         ></img>
    //       ) : null}
    //       <div
    //         {...stylex.props(contentStyle.content)}
    //         dangerouslySetInnerHTML={createMarkup(detail?.content)}
    //       />
    //     </div>

    //     {/* 일기 하단 */}
    //     <div {...stylex.props(styles.diaryFooter)}>
    //       <Like
    //         diaryId={diaryId}
    //         likeCount={likeCount}
    //         setLikeCount={setLikeCount}
    //         liked={detail?.likedByLogInMember}
    //       />
    //       <div {...stylex.props(styles.feelBackground)}>
    //         <div
    //           {...stylex.props(
    //             styles.feel(`rgba(0, 255, 0, ${detail?.transparency})`),
    //           )}
    //         ></div>
    //       </div>
    //     </div>
    //   </div>
    // </Container>
    <>
      <Header />
      <Container>
        {imageModal && detail?.image.length && (
          <ImageModal
            img={detail?.image[0].imageURL}
            setImageModal={setImageModal}
          />
        )}

        <DiaryBox>
          <TopSection>
            <Title>
              <LeftArrow />
              <Date>{detail?.createdDate}</Date>
              <SubTitle>
                {writer ? (
                  <Profile src={writer.profileImageURL} />
                ) : (
                  <AvatarBg />
                )}
                <Nickname>{writer?.nickname}</Nickname>
                <Time>{detail?.createdAt}</Time>
              </SubTitle>
            </Title>
            <PrivateContainer>
              <LockOpen />
              {detail && (
                <PrivateLable>
                  {detail.isPrivate ? '비공개' : '공개'}
                </PrivateLable>
              )}
            </PrivateContainer>
            <EmojiContainer>
              <Emoji>{mood}</Emoji>
            </EmojiContainer>
            {memberId === detail?.memberId && (
              <Setting diaryId={diaryId} createdDate={detail?.createdDate} />
            )}
          </TopSection>
          <DiaryContent>
            {detail?.image.length ? (
              <ImageCard
                src={detail?.image[0].imageURL}
                onClick={zoom}
              ></ImageCard>
            ) : null}
            <ContentCard
              dangerouslySetInnerHTML={createMarkup(detail?.content)}
            />
          </DiaryContent>
          <BottomSection>
            <HashTagContainer>
              {detail?.tags?.map(tag => {
                return (
                  <HashWrap>
                    <Tag />
                    <HashText>{tag.tag}</HashText>
                  </HashWrap>
                );
              })}
            </HashTagContainer>
            <Like
              diaryId={diaryId}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
              liked={detail?.isLikedByLogInMember}
            />
          </BottomSection>
          <Divider></Divider>
          <CommentLable>댓글</CommentLable>
          <CommentContainer></CommentContainer>
        </DiaryBox>
      </Container>
      <Footer>
        <ContentWrap>
          <LogoWrap>
            <LogoIcon src={logoIcon} />
            <LogoText fill={semantic.light.base.solid.white} />
          </LogoWrap>
          <CopyRight>
            Copyright © 2024 Jandi Diary. All rights reserved.
          </CopyRight>
        </ContentWrap>
      </Footer>
    </>
  );
};

export default DiaryDetail;

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-width: var(--vw-desktop-min, 960px);
  max-width: var(--vw-desktop-max, 2560px);
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-empty, 0px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
  background: linear-gradient(180deg, #fff 0%, #f1f1f1 100%);
`;

const DiaryBox = styled.div`
  margin: auto;
  min-height: 100vh;
  display: flex;
  width: 960px;
  padding: var(--gap-xl, 24px) var(--gap-xl, 24px) var(--gap-2xl, 32px)
    var(--gap-xl, 24px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-lg, 20px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
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

const TopSection = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-xl, 24px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Title = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;
`;

const SubTitle = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Date = styled.div`
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.title1}

  opacity: var(--opacity-visible, 1);
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  objectfit: cover;
`;

const Nickname = styled.div`
  color: ${semantic.light.object.solid.normal};

  ${TYPO.label2}

  opacity: var(--opacity-visible, 1);
`;

const Time = styled.div`
  color: ${semantic.light.object.transparent.assistive};

  ${TYPO.caption3}

  opacity: var(--opacity-visible, 1);
`;

const PrivateContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-4xs, 4px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const PrivateLable = styled.div`
  color: ${semantic.light.object.transparent.alternative};
  ${TYPO.label1}
`;

const EmojiContainer = styled.div`
  position: relative;
  width: 26px;
  height: 26px;
  padding: var(--gap-5xs, 2px);
  border-radius: var(--radius-round, 96px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.assistive};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.fill.transparent.assistive};
`;

const Emoji = styled.p`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${semantic.light.object.transparent.alternative};
  ${TYPO.title2}
  font-size: 20px !important;
  line-height: 22px !important;
`;

const DiaryContent = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-xl, 24px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const ImageCard = styled.img`
  height: 360px;

  border-radius: var(--radius-sm, 12px);
  opacity: var(--opacity-visible, 1);
`;

const ContentCard = styled.div`
  min-height: 200px;
  align-self: stretch;

  color: ${semantic.light.object.solid.normal};

  ${TYPO.body2}
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: var(--gap-sm, 12px) var(--gap-md, 16px);
  align-self: stretch;
  flex-wrap: wrap;
`;

const HashTagContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  align-content: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;
  flex-wrap: wrap;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const HashWrap = styled.div`
  display: flex;
  padding: var(--gap-4xs, 4px) var(--gap-xs, 10px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-4xs, 4px);

  border-radius: var(--radius-xs, 8px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.fill.transparent.assistive};
`;

const HashText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  ${TYPO.caption1}
`;

const Divider = styled.div`
  width: 912px;
  height: 1px;

  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.border.transparent.alternative};
`;

const CommentLable = styled.div`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.label3}
`;

const CommentContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xs, 10px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Footer = styled.div`
  min-width: var(--vw-desktop-min, 960px);

  align-self: stretch;
  display: flex;
  padding: var(--gap-xl, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 24px);

  border-radius: var(--radius-empty, 0px);
  border-top: var(--stroke-thicker, 4px) solid
    ${semantic.light.accent.solid.hero};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.base.solid.darkgray};
`;

const ContentWrap = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-empty, 0px);
  align-self: stretch;
  flex: 1;
`;

const LogoWrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-xs, 10px);
  flex: 1 0 0;
  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const LogoIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const CopyRight = styled.p`
  color: ${semantic.light.base.solid.white};
  ${TYPO.caption2}
`;
