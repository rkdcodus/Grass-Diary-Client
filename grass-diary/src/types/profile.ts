interface IProfile {
  profileImageURL?: string;
  nickName?: string;
  profileIntro?: string;
}

// Setting Page updateProfile Type
interface IUpdateProfile {
  nickName?: string;
  profileIntro?: string;
}
