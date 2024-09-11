import React, { useState } from 'react';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import * as S from './styles';
import API from '@services/index';
import { Profile } from '@components/index';
import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';
import { useProfile } from '@state/profile/useProfile';
import { useProfileActions } from '@state/profile/ProfileStore';

const Setting = () => {
  const queryClient: QueryClient = useQueryClient();
  const { nickname, profileIntro }: omitProfileImageURL = useProfile();
  const { setNickName, setProfileIntro } = useProfileActions();

  const [isFocused, setIsFocused] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [editNickname, setEditNickname] = useState(nickname);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickname(event.target.value);
  };

  const handleChangeProfileIntro = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProfileIntro(event.target.value);
  };

  const updateProfile = useMutation<
    omitProfileImageURL,
    Error,
    omitProfileImageURL
  >({
    mutationFn: profileInfo =>
      API.patch(END_POINT.edit_member_info, profileInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileInfo'] });
      setIsEditingNickname(false);
      setNickName(editNickname);
    },
    onError: error => console.error(CONSOLE_ERROR.member.patch + error),
  });

  return (
    <S.SettingContainer>
      <S.ContentContainer>
        <S.ProfileSection>
          <S.ProfileArticle>
            <S.ProfileContainer>
              <S.ProfileLeftContainer>
                <S.AvatarContainer>
                  <S.AvatarImageBox>
                    <Profile />
                    <S.UserNameText>{nickname}</S.UserNameText>
                  </S.AvatarImageBox>
                  <S.ProfileButtonBox>
                    <S.ImageUploadButton>이미지 업로드</S.ImageUploadButton>
                    <S.ImageDeleteButton>이미지 삭제</S.ImageDeleteButton>
                  </S.ProfileButtonBox>
                </S.AvatarContainer>
              </S.ProfileLeftContainer>
              <S.ProfileRightContainer>
                <S.UserIntroductionContainer>
                  <S.UserIntroductionBox isFocused={isFocused}>
                    <S.UserIntroduction
                      name="profileIntro"
                      value={profileIntro || ''}
                      onChange={handleChangeProfileIntro}
                      placeholder="소개글을 작성해 보세요. 150자까지만 쓸 수 있어요!"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </S.UserIntroductionBox>
                </S.UserIntroductionContainer>
              </S.ProfileRightContainer>
            </S.ProfileContainer>
            <S.IntroductionCountText>0/150자</S.IntroductionCountText>
          </S.ProfileArticle>
        </S.ProfileSection>
        <S.DetailSettingSection>
          <S.DetailSettingArticle>
            <S.SettingBox>
              <S.SettingLeftBox>
                <S.SettingLabel>닉네임</S.SettingLabel>
                {isEditingNickname ? (
                  <S.NicknameInput
                    placeholder={nickname}
                    value={editNickname}
                    onChange={handleChangeNickname}
                    maxLength={8}
                  />
                ) : (
                  <S.SettingText>{nickname}</S.SettingText>
                )}
              </S.SettingLeftBox>
              {isEditingNickname ? (
                <S.SaveButton
                  onClick={() =>
                    updateProfile.mutate({
                      nickname: editNickname,
                      profileIntro,
                    })
                  }
                >
                  저장
                </S.SaveButton>
              ) : (
                <S.AmendButton onClick={() => setIsEditingNickname(true)}>
                  수정
                </S.AmendButton>
              )}
            </S.SettingBox>
            <S.SettingMessage>
              마이페이지의 최상단에 나타나는 닉네임을 8글자 이내로 설정할 수
              있습니다.
            </S.SettingMessage>
            <S.DividerLine />
          </S.DetailSettingArticle>
          <S.DetailSettingArticle>
            <S.SettingBox>
              <S.SettingLeftBox $variant="email">
                <S.SettingLabel>이메일 주소</S.SettingLabel>
                <S.SettingText>username@gmail.com</S.SettingText>
              </S.SettingLeftBox>
            </S.SettingBox>
            <S.SettingMessage>
              회원 인증 및 메일 발송에 사용되는 이메일 주소입니다.
            </S.SettingMessage>
          </S.DetailSettingArticle>
          {/* <S.DividerLine />
          <Temporary /> */}
          <S.DividerLine />
          <S.ThemeContainer>
            <S.ThemeMessageBox>
              <S.SettingLabel>잔디 일기 테마</S.SettingLabel>
              <S.SettingMessage>
                기본 모드와 나이트 모드를 선택할 수 있습니다.
              </S.SettingMessage>
            </S.ThemeMessageBox>
            <S.ThemeSelectBox>
              <S.ThemeImg src="/assets/icons/darkTheme.svg" />
              <S.ThemeImg src="/assets/icons/lightTheme.svg" />
            </S.ThemeSelectBox>
          </S.ThemeContainer>
          <S.DividerLine />
          <S.WithdrawBoxArticle>
            <S.WithdrawBox>
              <S.SettingLabel>회원 탈퇴</S.SettingLabel>
              <S.WithdrawButton>회원 탈퇴</S.WithdrawButton>
            </S.WithdrawBox>
            <S.SettingMessage>
              회원 탈퇴 시 작성한 포스트 및 댓글은 모두 삭제되며 복구되지
              않습니다.
            </S.SettingMessage>
          </S.WithdrawBoxArticle>
          <S.BottomSection>
            <S.ApplyButton
              onClick={() =>
                updateProfile.mutate({
                  nickname: nickname,
                  profileIntro: profileIntro,
                })
              }
            >
              적용하기
            </S.ApplyButton>
            <S.NavigateButton>
              잔디 테마 설정 페이지로 이동하기
              <img src="/assets/icons/button-outlined-chevron-right.svg" />
            </S.NavigateButton>
          </S.BottomSection>
        </S.DetailSettingSection>
      </S.ContentContainer>
    </S.SettingContainer>
  );
};

export default Setting;
