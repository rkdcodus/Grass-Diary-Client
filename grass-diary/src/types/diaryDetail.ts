interface IDiaryDetail extends IDiary {
  id: Id;
  memberId: Id;
  hasImage: null;
  hasTag: null;
  imageURL: string;
  likedByLogInMember: boolean;
}

type ConfirmDeleteModalProps = {
  diaryId: Id;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ImageModalProps = {
  img: string;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type UnmodifyModalProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

type SettingProps = {
  diaryId: Id;
  createdDate: string;
};
