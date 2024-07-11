export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  UNSUPPORTED_MEDIA_TYPE: 415,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  AUTH_SESSION_EXPIRED: 440,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export const END_POINT = {
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
