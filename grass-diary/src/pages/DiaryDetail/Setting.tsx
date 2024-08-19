import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { semantic } from '@styles/semantic';
import { useTodayDate } from '@hooks/api/useTodayDate';
import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';

import more from '@svg/more_horiz.svg';
import editIcon from '@svg/mode_edit.svg';
import deleteIcon from '@svg/delete_forever.svg';
import Menus from '@components/Button/Menus';
import Menu from '@components/Button/Menu';

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
      <Menus icon={more}>
        <Menu
          onClick={linkToModify}
          text={'일기 수정'}
          svg={editIcon}
          topRadius={1}
        />
        <Menu
          onClick={showConfirmModal}
          text={'일기 삭제'}
          svg={deleteIcon}
          bottomRadius={1}
          color={semantic.light.feedback.solid.negative}
        />
      </Menus>

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
