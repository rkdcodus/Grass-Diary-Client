interface IDiaryDetail extends IDiary {
  id: Id;
  memberId: Id;
  hasImage: null;
  hasTag: null;
  imageURL: string;
  likedByLogInMember: boolean;
}

interface IConfirmDeleteModalProps {
  diaryId: Id;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IImageModalProps {
  img: string;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUnmodifyModal {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISettingProps {
  diaryId: Id;
  createdDate: string;
}
