import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { semantic } from '@styles/semantic';
import { useTodayDate } from '@hooks/api/useTodayDate';

import more from '@svg/more_horiz.svg';
import editIcon from '@svg/mode_edit.svg';
import deleteIcon from '@svg/delete_forever.svg';
import lockOpen from '@svg/lock_open_black.svg';
import lock from '@svg/lock_black.svg';

import { Menus, Menu } from '@components/index';
import { useModal } from '@state/modal/useModal';
import { MODAL } from '@constants/message';
import { INTERACTION } from '@styles/interaction';
import { useDeleteDiaryDetail } from '@hooks/api/useDeleteDiaryDetail';
import { usePatchDiary } from '@hooks/api/usePatchDiary';
import { useToast } from '@state/toast/useToast';
import { useQueryClient } from '@tanstack/react-query';

type SettingProps = {
  diaryId: Id;
  createdDate: string;
  detail?: IDiaryDetail;
};

const Setting = ({ diaryId, createdDate, detail }: SettingProps) => {
  const navigate = useNavigate();
  const { modal } = useModal();
  const { toast } = useToast();
  const { date } = useTodayDate();
  const [canEdit, setCanEdit] = useState(false);
  const { mutate } = useDeleteDiaryDetail(diaryId);
  // 일기 patch api는 당일 수정만 가능하도록 되어있음. => 수정해야함.
  const { mutate: patchDiary } = usePatchDiary(diaryId);
  const queryClient = useQueryClient();

  const editPrivate = () => {
    if (detail) {
      const hashArr = detail.tags.map(tag => tag.tag);

      const request = {
        content: detail.content,
        isPrivate: detail.isPrivate ? false : true,
        conditionLevel: `LEVEL_${detail.transparency * 10}`,
        hashtags: hashArr,
        imageId: detail.image.length ? detail.image[0].imageId : 0,
      };

      const setting = {
        title: detail.isPrivate ? '일기 공개하기' : '일기 비공개하기',
        content: detail.isPrivate
          ? MODAL.visibility.public
          : MODAL.visibility.private,
      };

      const button1 = {
        active: true,
        text: MODAL.cancel,
      };

      const button2 = {
        active: true,
        text: detail.isPrivate ? '공개하기' : '비공개하기',
        clickHandler: () =>
          patchDiary(request, {
            onSuccess: () => {
              toast(
                detail.isPrivate ? '일기를 공개했어요' : '일기를 비공개했어요 ',
              );
              queryClient.invalidateQueries({
                queryKey: ['get-diaryDetail'],
              });
            },
          }),
        color: semantic.light.accent.solid.alternative,
        interaction: INTERACTION.accent.subtle(),
      };

      modal(setting, button1, button2);
    }
  };

  const editModal = () => {
    const setting = {
      title: MODAL.edit_diary.title,
      content: MODAL.edit_diary.content,
    };

    const button1 = {
      active: true,
      text: MODAL.confirm,
      color: semantic.light.accent.solid.hero,
      interactions: INTERACTION.accent.subtle(),
    };

    if (!canEdit) return modal(setting, button1);
    navigate(`/editdiary/${diaryId}`);
  };

  const deleteModal = () => {
    const setting = {
      title: MODAL.delete_diary.title,
      content: MODAL.delete_diary.content,
    };

    const button1 = {
      active: true,
      text: MODAL.cancel,
    };

    const button2 = {
      active: true,
      text: MODAL.delete_diary.button,
      clickHandler: mutate,
      color: semantic.light.feedback.solid.negative,
    };

    modal(setting, button1, button2);
  };

  useEffect(() => {
    if (createdDate && date) {
      if (
        // 당일 : 일기 수정 가능
        +createdDate.slice(0, 2) === date.year % 100 &&
        +createdDate.slice(4, 6) === date.month &&
        +createdDate.slice(8, 10) === date.date
      ) {
        setCanEdit(true);
      } else {
        // 그 외 시간 : 수정 불가능
        setCanEdit(false);
      }
    }
  }, [createdDate, date]);

  return (
    <Menus icon={more}>
      {detail && (
        <Menu
          onClick={editPrivate}
          text={detail.isPrivate ? '공개하기' : '비공개하기'}
          svg={detail.isPrivate ? lockOpen : lock}
        />
      )}
      <Menu onClick={editModal} text={'일기 수정'} svg={editIcon} />
      <Menu
        onClick={deleteModal}
        text={'일기 삭제'}
        svg={deleteIcon}
        color={semantic.light.feedback.solid.negative}
      />
    </Menus>
  );
};

export default Setting;
