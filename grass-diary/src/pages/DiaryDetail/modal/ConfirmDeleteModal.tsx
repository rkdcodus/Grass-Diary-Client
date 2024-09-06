import { semantic } from '@styles/semantic';
import { Modal, CustomButton } from '@components/index';
import { useDeleteDiaryDetail } from '@hooks/api/useDeleteDiaryDetail';
import { DIARY } from '@constants/message';

const ConfirmDeleteModal = ({
  diaryId,
  setConfirmModal,
}: ConfirmDeleteModalProps) => {
  const { mutate } = useDeleteDiaryDetail(diaryId);

  const closeModal = () => setConfirmModal(false);

  const handleDelete = () => mutate();

  return (
    <>
      <Modal
        setClose={closeModal}
        title="일기 삭제 안내"
        content={DIARY.delete_confirm}
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
