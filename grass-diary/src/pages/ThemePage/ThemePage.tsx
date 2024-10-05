import * as S from '@styles/ThemePage/ThemePage.style';
import * as SMB from '@styles/Main/BottomSection.style';
import { semantic } from '@styles/semantic';
import { ReactComponent as Arrow } from '@svg/chevron_right.svg';
import { ReactComponent as Avatar } from '@svg/avatarBg.svg';
import { ReactComponent as Navigate } from '@svg/navigate_next.svg';
import { MAIN_MESSAGES } from '@constants/message';
import AnimateReward from '@pages/Main/AnimateReward';
import { useReward } from '@hooks/api/useReward';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ThemePage = () => {
  const { reward } = useReward();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const previewDays = 31;
  const previewBoxes = 3;
  const boxes = Array.from({ length: previewDays }, (_, index) => {
    const isAccent = index < previewBoxes;

    const backgroundColor = isAccent
      ? semantic.light.accent.solid.alternative
      : semantic.light.fill.transparent.assistive;

    if (selectedColor) {
      const backgroundColor = isAccent
        ? selectedColor
        : semantic.light.fill.transparent.assistive;
      return <S.Box key={index} backgroundColor={backgroundColor} />;
    }

    return <S.Box key={index} backgroundColor={backgroundColor} />;
  });

  const handleClick = () => window.scrollTo(0, 0);

  return (
    <>
      <S.Layout>
        <S.ThemeTitleBox>
          <S.ThemeStoreBtn>
            <S.ThemeStoreBtnText>
              테마 설정 페이지로 이동하기
            </S.ThemeStoreBtnText>
            <Arrow
              width={18}
              height={18}
              fill={semantic.light.accent.solid.hero}
            />
          </S.ThemeStoreBtn>
          <S.ThemeTitle>테마 상점</S.ThemeTitle>
        </S.ThemeTitleBox>
        <S.ThemeSubTitleBox>
          <S.ThemeSubTitle>
            잔디 포인트로 다양한 테마를 구입해 보세요!
          </S.ThemeSubTitle>
        </S.ThemeSubTitleBox>

        <SMB.Card>
          <S.RewardTitleBox>
            <SMB.CardText>
              {MAIN_MESSAGES.bottom_section.my_reward}
            </SMB.CardText>
            <Link to="/rewardpage">
              <S.RewardPageBtn onClick={handleClick}>
                <S.RewardBtnText>리워드 내역</S.RewardBtnText>
                <Navigate />
              </S.RewardPageBtn>
            </Link>
          </S.RewardTitleBox>
          <SMB.CardSubText>
            {MAIN_MESSAGES.bottom_section.reward_message}
          </SMB.CardSubText>
          <SMB.Divider />
          <SMB.Wrap>
            <SMB.RewardContainer>
              <Avatar />
              <SMB.RewardPointBox>
                <AnimateReward n={reward?.rewardPoint ?? 0} />
              </SMB.RewardPointBox>
            </SMB.RewardContainer>
          </SMB.Wrap>
        </SMB.Card>

        <S.ThemePreviewContainer>
          <S.ThemePreviewTextBox>
            <S.ThemePreviewText>테마 미리 보기 -</S.ThemePreviewText>
            <S.ThemePreviewSubText>Grassdiary</S.ThemePreviewSubText>
          </S.ThemePreviewTextBox>
        </S.ThemePreviewContainer>
        <S.BoxContainer>{boxes}</S.BoxContainer>

        <S.ThemeColorContainer>
          <S.ThemeColorSection>
            <S.ThemeColorBox>
              <S.ThemeColorTitleContainer>
                <S.ThemeColorTitleBox>
                  <S.ThemeColorTitle>잔디 테마 색상</S.ThemeColorTitle>
                  <S.ThemeColorSubTitle>
                    모은 포인트로 나만의 색다른 잔디를 만들어요.
                  </S.ThemeColorSubTitle>
                </S.ThemeColorTitleBox>
              </S.ThemeColorTitleContainer>
              <S.ThemeColor
                backgroundColor={semantic.light.inverse.solid.accent}
                onClick={() =>
                  handleColorClick(semantic.light.inverse.solid.accent)
                }
                isSelected={
                  selectedColor === semantic.light.inverse.solid.accent
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.red}
                onClick={() => handleColorClick(semantic.light.theme.solid.red)}
                isSelected={selectedColor === semantic.light.theme.solid.red}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.amber}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.amber)
                }
                isSelected={selectedColor === semantic.light.theme.solid.amber}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.blue}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.blue)
                }
                isSelected={selectedColor === semantic.light.theme.solid.blue}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.purple}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.purple)
                }
                isSelected={selectedColor === semantic.light.theme.solid.purple}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightpink}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.lightpink)
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightpink
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightpurple}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.lightpurple)
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightpurple
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightblue}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.lightblue)
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightblue
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.ruby}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.ruby)
                }
                isSelected={selectedColor === semantic.light.theme.solid.ruby}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.diamond}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.diamond)
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.diamond
                }
              />
            </S.ThemeColorBox>
          </S.ThemeColorSection>
        </S.ThemeColorContainer>

        <S.BuyThemeBox>
          <S.BuyThemeBtn>
            <S.BuyThemeBtnText>구입하기</S.BuyThemeBtnText>
          </S.BuyThemeBtn>
        </S.BuyThemeBox>
      </S.Layout>
    </>
  );
};

export default ThemePage;
