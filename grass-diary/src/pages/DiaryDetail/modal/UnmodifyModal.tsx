import Modal from '@components/modal/Modal';
import CheckButton from '@components/modal/CheckButton';
import { DIARY } from '@constants/message';

const UnmodifyModal = ({ setter }: UnmodifyModalProps) => {
  const closeModal = () => setter(false);

  return (
    <Modal
      setClose={closeModal}
      title={'일기 수정 가능 시간'}
      content={DIARY.EDIT_INFO}
    >
      <CheckButton onClick={closeModal} />
    </Modal>
  );
};

export default UnmodifyModal;
