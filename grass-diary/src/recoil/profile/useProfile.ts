import { useRecoilValue } from 'recoil';
import { profileSelector } from './profileSelector';
import { profileAtom } from './profileState';

const useProfile = () => {
  const profile = useRecoilValue<IProfile | undefined>(profileSelector);
  const profileFromAtom = useRecoilValue(profileAtom);

  const { profileImageURL, nickName, profileIntro } =
    profile || profileFromAtom;

  return { profileImageURL, nickName, profileIntro };
};

export default useProfile;
