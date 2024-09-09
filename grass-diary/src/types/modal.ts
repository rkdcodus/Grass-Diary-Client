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
type ImageModalProps = {
  img: string;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};
