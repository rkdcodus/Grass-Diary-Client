import * as S from '@styles/ThemePage/ThemePage.style';
import { semantic } from '@styles/semantic';
import { ReactComponent as Arrow } from '@svg/chevron_right.svg';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useReward } from '@hooks/api/useReward';
import { useUser } from '@state/user/useUser';
import { useTheme } from '@hooks/api/useTheme';
import { useModal } from '@state/modal/useModal';

const ThemeSettingPage = () => {
  const { reward } = useReward();
  const { modal } = useModal();
  const memberId = useUser();
  const { mutate: purchaseTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const previewBoxes = 3;
  const previewDays = 31;
  const handleColorClick = useCallback(
    (color: string, name: string, id: number) => {
      setSelectedColor(color);
      setSelectedColorName(name);
      setSelectedColorId(id);
    },
    [],
  );

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
          <Link to="/main">
            <S.ThemeStoreBtn onClick={handleClick}>
              <S.ThemeStoreBtnText>메인 페이지로 이동하기</S.ThemeStoreBtnText>
              <Arrow
                width={18}
                height={18}
                fill={semantic.light.accent.solid.hero}
              />
            </S.ThemeStoreBtn>
          </Link>
          <S.ThemeTitle>테마 설정</S.ThemeTitle>
        </S.ThemeTitleBox>

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
                  handleColorClick(
                    semantic.light.inverse.solid.accent,
                    'default',
                    1,
                  )
                }
                isSelected={
                  selectedColor === semantic.light.inverse.solid.accent
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.red}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.red, 'red', 2)
                }
                isSelected={selectedColor === semantic.light.theme.solid.red}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.amber}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.amber, 'amber', 3)
                }
                isSelected={selectedColor === semantic.light.theme.solid.amber}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.blue}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.blue, 'blue', 4)
                }
                isSelected={selectedColor === semantic.light.theme.solid.blue}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.purple}
                onClick={() =>
                  handleColorClick(
                    semantic.light.theme.solid.purple,
                    'purple',
                    5,
                  )
                }
                isSelected={selectedColor === semantic.light.theme.solid.purple}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightpink}
                onClick={() =>
                  handleColorClick(
                    semantic.light.theme.solid.lightpink,
                    'lightpink',
                    6,
                  )
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightpink
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightpurple}
                onClick={() =>
                  handleColorClick(
                    semantic.light.theme.solid.lightpurple,
                    'lightpurple',
                    7,
                  )
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightpurple
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.lightblue}
                onClick={() =>
                  handleColorClick(
                    semantic.light.theme.solid.lightblue,
                    'lightblue',
                    8,
                  )
                }
                isSelected={
                  selectedColor === semantic.light.theme.solid.lightblue
                }
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.ruby}
                onClick={() =>
                  handleColorClick(semantic.light.theme.solid.ruby, 'ruby', 9)
                }
                isSelected={selectedColor === semantic.light.theme.solid.ruby}
              />

              <S.ThemeColor
                backgroundColor={semantic.light.theme.solid.diamond}
                onClick={() =>
                  handleColorClick(
                    semantic.light.theme.solid.diamond,
                    'diamond',
                    10,
                  )
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
            <S.BuyThemeBtnText>적용하기</S.BuyThemeBtnText>
          </S.BuyThemeBtn>
        </S.BuyThemeBox>
      </S.Layout>
    </>
  );
};

export default ThemeSettingPage;
