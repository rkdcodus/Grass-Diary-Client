import { Modal, CheckButton } from '@components/index';
import { DIARY } from '@constants/message';

const UnmodifyModal = ({ setter }: UnmodifyModalProps) => {
  const closeModal = () => setter(false);

  return (
    <Modal
      setClose={closeModal}
      title={'일기 수정 가능 시간'}
      content={DIARY.edit_info}
    >
      <CheckButton onClick={closeModal} />
    </Modal>
  );
};

export default UnmodifyModal;
