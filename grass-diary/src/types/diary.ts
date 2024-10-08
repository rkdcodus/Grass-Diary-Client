interface ITages {
  id: number;
  tag: string;
  tagUsageCount: number;
}

interface IDiary {
  commentCount: number;
  image: DiaryImage[];
  content: string;
  createdAt: string;
  createdDate: string;
  diaryId: Id;
  isPrivate: boolean;
  likeCount: number;
  tags: ITages[];
  transparency: number;
}

// DiaryItem Component Type
interface IDiaryItem {
  diary: IDiary;
  diaryList: IDiary[];
  index: number;
}

type TCreateMarpkup = (htmlContent: string | Node | undefined) => {
  __html: string;
};

// Diary Response Type
interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IPageble {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ISort;
  unpaged: boolean;
}

interface IDiaryResponse {
  content: IDiary[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageble;
  size: number;
  sort: ISort;
  totalElements: number;
  totalPages: number;
}
// CreateDiary Type
interface IDiaryInfo {
  hashArr: string[];
  moodValue: number;
  year: number | null;
  month: number | null;
  date: number | null;
  day: string | null;
  quillContent: string;
  isPrivate: boolean;
}

interface DiaryImage {
  imageId: number;
  imageURL: string;
  imageName: string;
  imageSize: number;
}

interface ImageInfo extends DiaryImage {
  imageType: string;
}

// DiaryDetail Type
interface IDiaryDetail extends IDiary {
  memberId: Id;
  isLikedByLogInMember: boolean;
  commentCount: number;
  image: DiaryImage[];
}

// Create/Edit page api request Type
type DiaryRequest = {
  content: string;
  isPrivate: boolean;
  conditionLevel: string;
  hashtags: string[];
  imageId: number;
};
