import styles from './styles';
import stylex from '@stylexjs/stylex';
import { Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import API from '@services/index';
import useProfile from '@recoil/profile/useProfile';
import { profileAtom } from '@recoil/profile/profileState';
import { Container, Header, Profile, Button } from '@components/index';
import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';

interface ISettingSection {
  children: React.ReactNode;
  label: string;
}

const SettingSection = ({ children, label }: ISettingSection) => {
  return (
    <form {...stylex.props(styles.settingSection)}>
      <span>{label}</span>
      {children}
    </form>
  );
};

const Setting = () => {
  const queryClient: QueryClient = useQueryClient();
  const { nickName, profileIntro }: omitProfileImageURL = useProfile();
  const [profile, setProfile] = useRecoilState(profileAtom);

  useEffect(() => {
    setProfile({ ...profile, nickName, profileIntro });
  }, [nickName, profileIntro]);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, nickName: event.target.value });
  };

  const handleChangeProfileIntro = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProfile({ ...profile, profileIntro: event.target.value });
  };

  const updateProfile = useMutation<
    omitProfileImageURL,
    Error,
    omitProfileImageURL
  >({
    mutationFn: profileInfo =>
      API.patch(END_POINT.EDIT_MEMBER_INFO, profileInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileInfo'] });
    },
    onError: error => console.error(CONSOLE_ERROR.MEMBER.PATCH + error),
  });

  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.contentWrap)}>
        <div {...stylex.props(styles.titleSection)}>
          <span {...stylex.props(styles.title)}>설정</span>
        </div>
        <div {...stylex.props(styles.profileSection)}>
          <div {...stylex.props(styles.profileLeft)}>
            <Suspense>
              <Profile width="12.5rem" height="12.5rem" />
            </Suspense>
            <Button
              text="프로필 사진 변경"
              width="9.4rem"
              defaultColor="#2d2d2d"
              hoverColor="#FFF"
              defaultBgColor="#FFFFFF"
              hoverBgColor="#111111"
              border="1px solid #929292"
              marginTop="25px"
            />
          </div>
          <div {...stylex.props(styles.profileRight)}>
            <SettingSection label="닉네임">
              <input
                {...stylex.props(styles.textInput('0 0 0 1.25rem', '3.2rem'))}
                name="nickName"
                value={profile.nickName || ''}
                onChange={handleChangeNickname}
              ></input>
            </SettingSection>
            <SettingSection label="소개글">
              <textarea
                {...stylex.props(styles.textInput('1rem 1.25rem', '6.25rem'))}
                name="profileIntro"
                value={profile.profileIntro || ''}
                onChange={handleChangeProfileIntro}
              ></textarea>
            </SettingSection>
            <SettingSection label="잔디색">
              <div {...stylex.props(styles.saveSection)}>
                <div {...stylex.props(styles.colorWrapper)}>
                  <div {...stylex.props(styles.grassColor)}></div>
                </div>
                <Button
                  text="저장"
                  width="70px"
                  defaultColor="#2d2d2d"
                  hoverColor="#FFF"
                  defaultBgColor="#FFFFFF"
                  hoverBgColor="#111111"
                  border="1px solid #929292"
                  onClick={() =>
                    updateProfile.mutate({
                      nickName: profile.nickName,
                      profileIntro: profile.profileIntro,
                    })
                  }
                />
              </div>
            </SettingSection>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Setting;
