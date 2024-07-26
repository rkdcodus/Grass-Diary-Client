interface IProfile {
  profileImageURL: string;
  nickName: string;
  profileIntro: string;
}

// Setting Page updateProfile Type
type UpdateProfile = Omit<IProfile, 'profileImageURL'>;

// Mood Profile Type
interface IMoodProfile {
  diary: IDiary[];
  index: number;
}
