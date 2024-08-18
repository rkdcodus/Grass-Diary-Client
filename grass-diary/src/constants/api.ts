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
} as const;

export const END_POINT = {
  MEMBER_INFO: '/me',
  MEMBER_PROFILE: (id: Id) => `/member/profile/${id}`,
  EDIT_MEMBER_INFO: '/members/me',
  TODAY_DATE: '/main/today-date',
  TODAY_QUESTION: '/diary/today-question',
  DIARY: (id: Id) => `/diary/${id}`,
  LIKE: (diaryId: Id, memberId: Id) => `/diary/like/${diaryId}/${memberId}`,
  MY_DIARIES: (memberId: Id, currentPage: number) =>
    `/diary/main/${memberId}?page=${currentPage}`,
  SEARCH_DATE: (memberId: Id, selectedDate: string | null) =>
    `/search/date/${memberId}?date=${selectedDate}`,
  SHARE_POPULAR: '/shared/diaries/popular',
  SHARE_LATEST: (cursorId: number) =>
    `/shared/diaries/latest?cursorId=${cursorId}&size=12`,
  TOTAL_REWARD: (memberId: Id) => `/member/totalReward/${memberId}`,
  GRASS: (memberId: Id) => `/main/grass/${memberId}`,
  IMAGE: '/image/diary',
  COMMENT: (id: Id) => `/comment/${id}`,
  COMMENT_DELETE: (id: Id) => `/comment/${id}/delete`,
} as const;
