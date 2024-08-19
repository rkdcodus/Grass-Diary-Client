import { Link } from 'react-router-dom';
import { NormalLike } from '@components/index';
import { useWriterProfile } from '@hooks/api/useWriterProfile';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { ReactComponent as Comment } from '@svg/comment.svg';
interface IFeedProps {
  likeCount: number;
  link: string;
  createdAt: string;
  content: string;
  name: string;
  memberId: Id;
}

const Feed = ({
  likeCount,
  link,
  createdAt,
  content,
  name,
  memberId,
}: IFeedProps) => {
  const { data: writer } = useWriterProfile(memberId);

  const title =
    `${createdAt.slice(2, 4)}년 ` +
    `${createdAt.slice(5, 7)}월 ` +
    `${createdAt.slice(8, 10)}일`;

  const time = createdAt.slice(11, 16);

  const extractTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    return doc.body.textContent || '';
  };

  const textWithoutTags = () => {
    if (content && content.length > 210) {
      return `${extractTextFromHTML(content).slice(0, 210)}...`;
    }
    return extractTextFromHTML(content);
  };

  return (
    <>
      <Link to={link}>
        <CardContainer>
          <CardHeaderSection>
            <CardUserImg>
              <img
                src={writer?.profileImageURL}
                style={{ borderRadius: '40px' }}
              ></img>
            </CardUserImg>
            <CardHeaderWrap>
              <CardHeaderDate>{title}</CardHeaderDate>
              <CardNameWrap>
                {name}
                <CardTime>{time}</CardTime>
              </CardNameWrap>
            </CardHeaderWrap>
            <CardEmojiContainer>🔥</CardEmojiContainer>
          </CardHeaderSection>
          <CardContent>{textWithoutTags()}</CardContent>
          <CardFooterSection>
            <Comment></Comment> 0
            <NormalLike likeCount={likeCount} justifyContent={'flex-end'} />
          </CardFooterSection>
        </CardContainer>
      </Link>
    </>
  );
};

export default Feed;

const CardContainer = styled.div`
  width: 17.6875rem; /* 283px */
  height: 28.75rem; /* 460px */
  display: flex;
  flex-direction: column;
  padding: var(--gap-md, 1rem); /* 16px */
  gap: var(--gap-xl, 1.5rem); /* 24px */

  border-radius: var(--radius-md, 1rem); /* 16px */
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.assistive}; /* 1px */
  background: ${semantic.light.bg.solid.normal};
  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.08); /* 0px, 1px, 2px */
`;

const CardHeaderSection = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem); /* 0px */
  align-items: center;
  gap: var(--gap-sm, 0.75rem); /* 12px */
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem); /* 0px */
  opacity: var(--opacity-visible, 1);
`;

const CardUserImg = styled.div`
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  flex-shrink: 0;

  opacity: var(--opacity-visible, 1);
`;

const CardHeaderWrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem); /* 0px */
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--gap-4xs, 0.25rem); /* 4px */
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0rem); /* 0px */
  opacity: var(--opacity-visible, 1);
`;

const CardTime = styled.p`
  color: ${semantic.light.object.transparent.assistive};

  font-family: Pretendard;
  font-size: 0.8125rem; /* 13px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 20px, 153.846% */

  opacity: var(--opacity-visible, 1);
`;

const CardHeaderDate = styled.div`
  color: ${semantic.light.object.transparent.neutral};

  font-family: Pretendard;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 20px, 142.857% */
  letter-spacing: -0.00525rem; /* -0.084px */

  opacity: var(--opacity-visible, 1);
`;

const CardNameWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem); /* 8px */

  border-radius: var(--radius-empty, 0rem); /* 0px */
`;

const CardEmojiContainer = styled.div`
  display: flex;
  padding: var(--gap-5xs, 0.125rem); /* 2px */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap-empty, 0rem); /* 0px */

  border-radius: var(--radius-round, 6rem); /* 96px */
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.assistive}; /* 1px */
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.fill.transparent.assistive};
`;

const CardFooterSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-md, 1rem); /* 16px */
  width: 100%;
`;

const CardContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
