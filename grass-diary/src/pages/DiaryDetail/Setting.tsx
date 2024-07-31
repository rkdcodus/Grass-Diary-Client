import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisIcon, EllipsisBox } from '@components/index';
import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import { useTodayDate } from '@hooks/api/useTodayDate';

type SettingProps = {
  diaryId: Id;
  createdDate: string;
};

const Setting = ({ diaryId, createdDate }: SettingProps) => {
  const navigate = useNavigate();
  const { date } = useTodayDate();
  const [canEdit, setCanEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const showConfirmModal = () => setConfirmModal(true);

  const linkToModify = () => {
    if (!canEdit && !editModal) {
      setEditModal(true);
      return;
    }
    navigate(`/editdiary/${diaryId}`);
  };

  useEffect(() => {
    if (createdDate && date) {
      if (
        // 당일 : 일기 수정 가능
        +createdDate.slice(0, 2) === date.year % 100 &&
        +createdDate.slice(5, 6) === date.month &&
        +createdDate.slice(8, 10) === date.date
      ) {
        setCanEdit(true);
      } else {
        // 그 외 시간 : 수정 불가능
        setCanEdit(false);
      }
    }
  }, []);

  return (
    <>
      <EllipsisIcon width="136" translateValue="115px">
        <EllipsisBox onClick={linkToModify} text="수정" />
        <EllipsisBox onClick={showConfirmModal} text="삭제" />
      </EllipsisIcon>

      {editModal && <UnmodifyModal setter={setEditModal} />}
      {confirmModal && (
        <ConfirmDeleteModal
          diaryId={diaryId!}
          setConfirmModal={setConfirmModal}
        />
      )}
    </>
  );
};

export default Setting;
