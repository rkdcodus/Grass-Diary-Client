import * as S from './style';

import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useDiary from '@hooks/api/useDiary';
import { MoodProfile, Profile, Divider } from '@components/index';
import { useUser } from '@state/user/useUser';
import { ReactComponent as FavoriteIcon } from '@svg/favorite.svg';
import { ReactComponent as CommentIcon } from '@svg/comment.svg';
import { semantic } from '@styles/semantic';
import Setting from '@pages/DiaryDetail/Setting';

interface IPagination {
  pageSize: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

const Pagination = ({ pageSize, currentPage, onPageChange }: IPagination) => {
  const handleFirstPage = () => onPageChange(0);

  const handlePreviousPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pageSize - 1) onPageChange(currentPage + 1);
  };

  const handleLastPage = () => {
    onPageChange(pageSize - 1);
  };

  return (
    <S.PaginationContainer>
      <S.PaginationIconButton onClick={handleFirstPage}>
        <S.PaginationImg $imageURL="/assets/icons/icon-btn-first-page.svg" />
      </S.PaginationIconButton>
      <S.PaginationIconButton onClick={handlePreviousPage}>
        <S.PaginationImg $imageURL="/assets/icons/icon-btn-chevron-left.svg" />
      </S.PaginationIconButton>
      {Array.from({ length: pageSize }, (_, index) => (
        <S.PaginationIconButton key={index} onClick={() => onPageChange(index)}>
          {index + 1}
        </S.PaginationIconButton>
      ))}
      <S.PaginationIconButton onClick={handleNextPage}>
        <S.PaginationImg $imageURL="/assets/icons/icon-btn-chevron-right.svg" />
      </S.PaginationIconButton>
      <S.PaginationIconButton onClick={handleLastPage}>
        <S.PaginationImg $imageURL="/assets/icons/icon-btn-last-page.svg" />
      </S.PaginationIconButton>
    </S.PaginationContainer>
  );
};

const DiaryItem = ({ diary, diaryList, index }: IDiaryItem) => {
  const navigate = useNavigate();
  const createMarkup: TCreateMarpkup = htmlContent => {
    const content = htmlContent || '';
    return { __html: DOMPurify.sanitize(content) };
  };

  const handleClickDiaryCard = () => {
    navigate(`/diary/${diary.diaryId}`);
  };

  return (
    <S.DiaryCardArticle onClick={handleClickDiaryCard}>
      <S.DiaryCardHeaderBox>
        <Profile width="2.5rem" height="2.5rem" />
        <S.DiaryCardDateBox>
          <S.DiaryCardDateText>{diary.createdDate}</S.DiaryCardDateText>
          <S.DiaryCardTimeText>{diary.createdAt}</S.DiaryCardTimeText>
        </S.DiaryCardDateBox>
        <MoodProfile diary={diaryList} index={index} />
        <Setting diaryId={diary.diaryId} createdDate={diary.createdDate} />
      </S.DiaryCardHeaderBox>
      {diary.image.length ? (
        <S.DiaryCardImgBox $imageURL={diary.image[0].imageURL} />
      ) : (
        ''
      )}
      <S.DiaryCardText dangerouslySetInnerHTML={createMarkup(diary.content)} />
      <Divider width="40.5rem" />
      <S.DiaryCardBottomBox>
        <S.DiaryCardHashtagBox>
          {diary.tags &&
            diary.tags.map(tag => (
              <S.HashtagBox key={tag.id}>
                <S.HashtagImg src="/assets/icons/tag-tag.svg" />
                <S.HashtagText>{tag.tag}</S.HashtagText>
              </S.HashtagBox>
            ))}
        </S.DiaryCardHashtagBox>
        <S.CommentFavoriteBox>
          <S.DiaryCardItemBox>
            <CommentIcon />
            <S.DiaryCardItemText>{diary.commentCount}</S.DiaryCardItemText>
          </S.DiaryCardItemBox>
          <S.DiaryCardItemBox>
            <FavoriteIcon
              width={22}
              height={22}
              fill={semantic.light.object.transparent.assistive}
            />
            <S.DiaryCardItemText>{diary.likeCount}</S.DiaryCardItemText>
          </S.DiaryCardItemBox>
        </S.CommentFavoriteBox>
      </S.DiaryCardBottomBox>
    </S.DiaryCardArticle>
  );
};

interface IDiaryProps {
  searchTerm: string;
  sortOrder: string;
  selectedDiary?: IDiary;
}

const Diary = ({ searchTerm, sortOrder, selectedDiary }: IDiaryProps) => {
  const memberId = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const { diaryList, pageSize } = useDiary({
    memberId,
    currentPage,
    sortOrder,
  });

  const filteredDiaryList =
    selectedDiary && selectedDiary.diaryId
      ? [selectedDiary]
      : diaryList.filter(diary => diary.content.includes(searchTerm));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <S.DiaryListContainer>
        {filteredDiaryList.map((diary, index) => (
          <DiaryItem
            key={diary.diaryId}
            diary={diary}
            diaryList={filteredDiaryList}
            index={index}
          />
        ))}
      </S.DiaryListContainer>
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Diary;
