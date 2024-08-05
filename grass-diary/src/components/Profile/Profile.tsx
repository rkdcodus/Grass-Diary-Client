import { useProfile } from '@state/profile/useProfile';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  profileImage: (width: string, height: string) => ({
    objectFit: 'cover',
    borderRadius: '100%',

    width,
    height,
  }),
});

interface IProfileProps {
  width: string;
  height: string;
}

const Profile = ({ width, height }: IProfileProps) => {
  const { profileImageURL }: pickProfileImageURL = useProfile();

  return profileImageURL ? (
    <img
      {...stylex.props(styles.profileImage(width, height))}
      src={profileImageURL}
      alt="사용자 프로필 사진"
    />
  ) : null;
};

export default Profile;
