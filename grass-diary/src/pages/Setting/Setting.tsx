import styles from './styles';
import stylex from '@stylexjs/stylex';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import API from '@services/index';
import { Container, Profile, Button } from '@components/index';
import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';
import { useProfile } from '@state/profile/useProfile';
import { useProfileActions } from '@state/profile/ProfileStore';

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
  const { nickname, profileIntro }: omitProfileImageURL = useProfile();
  const { setNickName, setProfileIntro } = useProfileActions();

  // useEffect(() => {
  //   setProfile({ ...profile, nickname, profileIntro });
  // }, [nickname, profileIntro]);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
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
    },
    onError: error => console.error(CONSOLE_ERROR.member.patch + error),
  });

  return (
    <Container>
      <div {...stylex.props(styles.contentWrap)}>
        <div {...stylex.props(styles.titleSection)}>
          <span {...stylex.props(styles.title)}>설정</span>
        </div>
        <div {...stylex.props(styles.profileSection)}>
          <div {...stylex.props(styles.profileLeft)}>
            <Profile width="12.5rem" height="12.5rem" />
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
                value={nickname || ''}
                onChange={handleChangeNickname}
              ></input>
            </SettingSection>
            <SettingSection label="소개글">
              <textarea
                {...stylex.props(styles.textInput('1rem 1.25rem', '6.25rem'))}
                name="profileIntro"
                value={profileIntro || ''}
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
                      nickname: nickname,
                      profileIntro: profileIntro,
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
