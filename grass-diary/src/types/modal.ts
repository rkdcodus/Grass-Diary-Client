interface IModalReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

// Login Modal Type
interface ILoginModalProps {
  top: string;
  isOpen: () => void;
  isClose: () => void;
}

type TGoogleLogin = () => void;

// DiaryDetail Modal Type
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
