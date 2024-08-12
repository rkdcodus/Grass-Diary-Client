import { semantic } from '@styles/semantic';
import CustomButton from '@components/modal/CustomButton';
import Modal from '@components/modal/Modal';

import CompleteDeleteModal from './CompleteDeleteModal';
import { useDeleteDiaryDetail } from '@hooks/api/useDeleteDiaryDetail';

const ConfirmDeleteModal = ({
  diaryId,
  setConfirmModal,
}: ConfirmDeleteModalProps) => {
  const { mutate, isSuccess } = useDeleteDiaryDetail(diaryId);

  const closeModal = () => setConfirmModal(false);

  const handleDelete = () => mutate();

  if (isSuccess) return <CompleteDeleteModal />;

  return (
    <>
      <Modal
        setClose={closeModal}
        title="일기 삭제 안내"
        content={'일기를 삭제하시겠어요?\n삭제된 일기는 다시 되돌릴 수 없어요.'}
      >
        <CustomButton onClick={closeModal} text={'취소'} />
        <CustomButton
          onClick={handleDelete}
          text={'삭제하기'}
          color={semantic.light.feedback.solid.negative}
        />
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
