import stylex from '@stylexjs/stylex';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';
import { TYPO } from '@styles/typo';

export const styles = stylex.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100%',
    maxWidth: '1200px',
  },

  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '500px',

    backgroundColor: '#F9F9F9',
    border: '1px solid #BFBFBF',
    borderRadius: '30px 30px 0 0',

    overflow: 'hidden',
  },

  profileDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '1200px',
    height: '90%',

    padding: '20px',
  },

  profileLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '25%',
    height: '100%',
  },

  profileRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    width: '70%',
    height: '100%',

    gap: '15px',
  },

  nameSection: {
    display: 'flex',
    fontSize: '20px',
  },

  profileToggle: {
    display: 'flex',
  },

  toggleButton: {
    width: '150px',
    height: '50px',

    border: 'none',
    borderBottom: '2px solid #000',

    fontSize: '18px',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  basicButton: {
    width: '150px',
    height: '50px',

    border: 'none',

    fontSize: '18px',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  mainSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '70%',
    gap: '20px',
  },

  searchSection: {
    display: 'flex',

    width: '100%',
    padding: '15px 20px 15px 20px',

    borderRadius: '30px',
    border: '1px solid #BFBFBF',
  },

  searchIcon: {
    fontSize: '20px',
    paddingRight: '10px',
  },

  searchBar: {
    position: 'relative',
    width: '95%',

    border: 'none',
    outline: 'none',
  },

  sortContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

    width: '95%',
  },

  diaryList: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    minHeight: '1050px',

    paddingBottom: '50px',
    overflowY: 'auto',
    gap: '50px',
  },

  diary: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',

    gap: '30px',
    padding: '40px 50px 40px 50px',

    border: '1px solid #B5B2B2',
    borderRadius: '20px',

    backgroundColor: '#FFF',
    cursor: 'pointer',
  },

  smallProfileSection: {
    display: 'flex',
  },

  smallDetailes: {
    display: 'flex',
    flexDirection: 'column',

    paddingLeft: '5px',
    gap: '3px',
  },

  name: {
    fontSize: '21px',
  },

  time: {
    color: '#BFBFBF',
  },

  hashtag: {
    color: '#777777',
  },

  diaryContent: {
    display: 'flex',
    flexDirection: 'column',

    color: '#474747',
    gap: '20px',
  },

  pageButtonWrap: {
    display: 'flex',
    justifyContent: 'center',

    paddingBottom: '60px',
    gap: '10px',
  },
});

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(241, 241, 241, 0.3) 100%
    ),
    ${semantic.light.bg.solid.subtler};
`;

export const ViewportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 60rem;
`;

/* 유저 컨테이너 */
export const UserInfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;

  max-width: 60rem;

  gap: 1rem;
  padding: 4rem 1.5rem 1.25rem 1.5rem;
`;

export const UserNameText = styled.span`
  text-align: center;

  ${TYPO.title2};
  color: ${semantic.light.object.solid.normal};
`;

export const UserInfoText = styled.span`
  text-align: center;

  ${TYPO.body2};
  color: ${semantic.light.object.transparent.neutral};
`;

/* 잔디 컨테이너 */

export const GrassArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;

  max-width: 60rem;

  gap: 1.5rem;
  padding: 1.5rem 1.5rem 3rem 1.5rem;
`;

export const GrassYearTagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.375rem;
  padding: 0.5rem 1rem;

  border-radius: 0.75rem;
  border: 1px solid ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.fill.transparent.assistive};
`;

export const GrassYearText = styled.span`
  text-align: center;

  ${TYPO.label2};
  color: ${semantic.light.object.transparent.alternative};
`;

export const GrassContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
`;

export const GrassBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  gap: 0.25rem;
`;

export const GrassDateBox = styled.div<{
  $border: string;
  $background: string;
}>`
  position: relative;

  width: 0.875rem;
  height: 0.875rem;

  border-radius: 0.25rem;
  border: ${({ $border }) => $border};
  background: ${({ $background }) => $background};
`;

export const DaysBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

export const DateBubbleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  gap: 0.5rem;
  padding: 0.625rem 0.75rem;

  top: -3.2rem;
  right: -1.3rem;

  ${TYPO.label1};
  text-align: center;
  color: ${semantic.light.inverse.solid.normal};

  border-radius: 0.75rem;
  background: ${semantic.light.inverse.solid.bg};

  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06),
    0px 4px 8px 0px rgba(0, 0, 0, 0.13);

  z-index: 3;

  &::after {
    content: '';

    position: absolute;

    top: 2.4rem;
    left: 1.3rem;

    width: 3rem;
    height: 3rem;

    background-image: url('../../../public/assets/icons/pin.svg');
    background-repeat: no-repeat;
  }
`;

/* 메인 섹션 */

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;

  max-width: 60rem;
  padding: 0rem 1.5rem 4.5rem 1.5rem;
`;

/* 검색 바 컴포넌트 */

export const SearchArticle = styled.article`
  display: flex;
  align-items: center;
  align-self: stretch;

  max-width: 60rem;

  gap: 1rem;
  padding: 2rem 0rem 1rem 0rem;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;

  gap: 1rem;
  padding: 1rem 1.25rem;

  border-radius: 1rem;
  border: 1px solid ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.bg.solid.normal};
`;

export const SearchImg = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

export const SearchInput = styled.input`
  width: 100%;

  ${TYPO.body2};
  color: ${semantic.light.object.transparent.assistive};

  border: none;
`;
