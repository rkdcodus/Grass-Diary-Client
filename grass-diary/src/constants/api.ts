const END_POINT = {
  MEMBER_INFO: '/me',
  MEMBER_PROFILE: (id: number) => `/member/profile/${id}`,
  EDIT_MEMBER_INFO: '/members/me',
  TODAY_DATE: '/main/today-date',
  TODAY_QUESTION: '/diary/today-question',
  DIARY: (id: number | null) => `/diary/${id}`,
  LIKE: (diaryId: string, memberId: number) =>
    `/diary/like/${diaryId}/${memberId}`,
  MY_DIARIES: (memberId: number, currentPage: number) =>
    `/diary/main/${memberId}?page=${currentPage}`,
  SEARCH_DATE: (memberId: number | null, selectedDate: string | null) =>
    `/search/date/${memberId}?date=${selectedDate}`,
  SHARE_POPULAR: '/shared/diaries/popular',
  SHARE_LATEST: (cursorId: number) =>
    `/shared/diaries/latest?cursorId=${cursorId}&size=12`,
  TOTAL_REWARD: (memberId: number | null) => `/member/totalReward/${memberId}`,
  GRASS: (memberId: number | null) => `/main/grass/${memberId}`,
};

export default END_POINT;
