import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import { Header, Footer, BackButton, Like, Comments } from '@components/index';
import EMOJI from '@constants/emoji';
import ImageModal from './modal/ImageModal';
import Setting from './Setting';

import { useDiaryDetail } from '@hooks/api/useDiaryDetail';
import { useParamsId } from '@hooks/useParamsId';
import { useUser } from '@state/user/useUser';

import { ReactComponent as AvatarBg } from '@svg/avatarBg.svg';
import { ReactComponent as LockOpen } from '@svg/lock_open.svg';
import { ReactComponent as Lock } from '@svg/lock.svg';
import { ReactComponent as Tag } from '@svg/tag.svg';

const DiaryDetail = () => {
  const diaryId = useParamsId();
  const memberId = useUser();
  const [likeCount, setLikeCount] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const { detail, writer } = useDiaryDetail(diaryId);

  const zoom = () => {
    if (!imageModal) setImageModal(true);
  };

  useEffect(() => {
    if (detail) setLikeCount(detail.likeCount);
  }, [detail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = (htmlContent: string | undefined) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
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
              <BackButton />
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
              {detail && (
                <>
                  {detail.isPrivate ? <Lock /> : <LockOpen />}
                  <PrivateLable>
                    {detail.isPrivate ? '비공개' : '공개'}
                  </PrivateLable>
                </>
              )}
            </PrivateContainer>
            <EmojiContainer>
              <Emoji>{detail && EMOJI[detail.transparency * 10]}</Emoji>
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
                  <HashWrap key={tag.id}>
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
          <Divider />
          <Comments />
        </DiaryBox>
      </Container>
      <Footer />
    </>
  );
};

export default DiaryDetail;

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-width: var(--vw-desktop-min, 960px);
  max-width: var(--vw-desktop-max, 2560px);
  flex-direction: column;
  align-items: center;

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
  align-items: center;
  gap: var(--gap-xl, 24px);
  align-self: stretch;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 8px);
`;

const Date = styled.div`
  ${TYPO.title1}
  color: ${semantic.light.object.transparent.neutral};
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  object-fit: cover;
`;

const Nickname = styled.div`
  ${TYPO.label2}
  color: ${semantic.light.object.solid.normal};
`;

const Time = styled.div`
  ${TYPO.caption3}
  color: ${semantic.light.object.transparent.assistive};
`;

const PrivateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-4xs, 4px);
`;

const PrivateLable = styled.div`
  ${TYPO.label1}
  color: ${semantic.light.object.transparent.alternative};
`;

const EmojiContainer = styled.div`
  position: relative;
  width: 26px;
  height: 26px;
  padding: var(--gap-5xs, 2px);
  border-radius: var(--radius-round, 96px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.assistive};
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
  flex-direction: column;
  align-items: center;
  gap: var(--gap-xl, 24px);
  align-self: stretch;
`;

const ImageCard = styled.img`
  height: 460px;
  width: 100%;
  border-radius: var(--radius-sm, 12px);
  object-fit: cover;
`;

const ContentCard = styled.div`
  min-height: 200px;
  align-self: stretch;

  ${TYPO.body2}
  color: ${semantic.light.object.solid.normal};
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
  align-items: center;
  align-content: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;
  flex-wrap: wrap;
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
  background: ${semantic.light.fill.transparent.assistive};
`;

const HashText = styled.p`
  ${TYPO.caption1}s
  color: ${semantic.light.object.transparent.alternative};
`;

const Divider = styled.div`
  width: 912px;
  height: 1px;

  background: ${semantic.light.border.transparent.alternative};
`;
