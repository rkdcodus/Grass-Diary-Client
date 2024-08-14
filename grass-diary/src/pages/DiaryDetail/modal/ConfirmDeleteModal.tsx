import { semantic } from '@styles/semantic';
import CustomButton from '@components/modal/CustomButton';
import Modal from '@components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useDeleteDiaryDetail } from '@hooks/api/useDeleteDiaryDetail';
import { useToast } from '@state/toast/useToast';

const ConfirmDeleteModal = ({
  diaryId,
  setConfirmModal,
}: ConfirmDeleteModalProps) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteDiaryDetail(diaryId);
  const { toast } = useToast();
  const closeModal = () => setConfirmModal(false);

  const handleDelete = () => {
    mutate();
    navigate(-1);
    toast('일기가 삭제되었습니다');
  };

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
