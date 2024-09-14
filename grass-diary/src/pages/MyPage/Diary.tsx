import styles from './style';
import stylex from '@stylexjs/stylex';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useDiary from '@hooks/api/useDiary';
import { NormalLike, MoodProfile } from '@components/index';
import { useUser } from '@state/user/useUser';

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
  const createMarkup: TCreateMarpkup = htmlContent => {
    const content = htmlContent || '';
    return { __html: DOMPurify.sanitize(content) };
  };

  return (
    <Link to={`/diary/${diary.diaryId}`}>
      <div {...stylex.props(styles.diary)}>
        <div {...stylex.props(styles.smallProfileSection)}>
          <MoodProfile diary={diaryList} index={index} />
          <div {...stylex.props(styles.smallDetailes)}>
            <span {...stylex.props(styles.name)}>{diary.createdDate}</span>
            <span {...stylex.props(styles.time)}>{diary.createdAt}</span>
          </div>
        </div>
        <div {...stylex.props(styles.diaryContent)}>
          <div>
            {diary.tags &&
              diary.tags.map(tag => (
                <span {...stylex.props(styles.hashtag)} key={tag.id}>
                  #{`${tag.tag} `}
                </span>
              ))}
          </div>
          <div dangerouslySetInnerHTML={createMarkup(diary.content)}></div>
        </div>
        <NormalLike
          likeCount={diary.likeCount || 0}
          justifyContent="flex-start"
        />
      </div>
    </Link>
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
      <div {...stylex.props(styles.diaryList)}>
        {filteredDiaryList.map((diary, index) => (
          <DiaryItem
            key={diary.diaryId}
            diary={diary}
            diaryList={filteredDiaryList}
            index={index}
          />
        ))}
      </div>
      <Pagination pageSize={pageSize} onPageChange={handlePageChange} />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Diary;
