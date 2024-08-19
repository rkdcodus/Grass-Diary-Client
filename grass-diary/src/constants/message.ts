const CONSOLE_ERROR = {
  LOGIN: {
    FALSE: '로그인되지 않은 사용자입니다.',
    FAIL: '인증 확인 중 오류가 발생했습니다.',
  },
  LIKE: {
    POST: '사용자의 좋아요 정보를 불러올 수 없습니다.',
    DELETE: '사용자의 좋아요 정보를 삭제할 수 없습니다.',
  },
  DIARY: {
    GET: '사용자의 일기를 불러올 수 없습니다.',
    DELETE: '사용자의 일기를 삭제할 수 없습니다.',
  },
  GRASS: {
    GET: '사용자의 잔디를 불러올 수 없습니다.',
  },
  DATE: {
    GET: '오늘의 날짜를 불러올 수 없습니다.',
  },
  QUESTION: {
    GET: '오늘의 질문을 불러올 수 없습니다.',
  },
  SEARCH_DATE: {
    GET: '선택된 날짜의 일기를 불러올 수 없습니다.',
  },
  MEMBER: {
    GET: '사용자 정보를 불러올 수 없습니다.',
    PATCH: '사용자 정보를 수정할 수 없습니다.',
  },
  PROFILE: {
    GET: '사용자 프로필을 조회할 수 없습니다.',
  },
  REWARD: {
    GET: '리워드 정보를 불러올 수 없습니다.',
  },
} as const;

const ERROR = {
  // 인증, 엑세스 토큰, 세션 만료 에러메시지
  UNAUTHORIZED: '인증이 필요합니다. 로그인 해주세요.',
  AUTHENTICATION_FAILED: '인증을 실패했습니다.',
  AUTH_INVALID_ACCESS_TOKEN: '잘못된 액세스 토큰입니다.',
  AUTH_EXPIRED_ACCESS_TOKEN: '액세스 토큰이 만료되었습니다.',
  AUTH_INVALID_SIGNATURE: '잘못된 시그니처입니다.',
  AUTH_JWT_ERROR: 'JWT 관련 오류가 발생했습니다.',
  AUTH_MISSING_ID_IN_ACCESS_TOKEN: 'JWT 액세스 토큰에 ID가 누락되었습니다.',
  AUTH_TOKEN_EXTRACTION_FAILED: '액세스 토큰 추출에 실패했습니다.',
  AUTH_SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인 해주세요.',
  // 잘못된 요청 에러 메시지
  MEMBER_NOT_FOUND_ERR: '요청하신 사용자를 찾을 수 없습니다.',
  DIARY_ALREADY_EXISTS: '이미 해당 날짜에 작성된 일기가 있습니다.',
  DIARY_NOT_FOUND_ERR: '요청하신 다이어리를 찾을 수 없습니다.',
  DIARY_NOT_WRITE: '일기가 작성되지 않았습니다.',
  DIARY_CANT_EDIT: '⚠ 수정 가능한 시간이 아닙니다',
  INVALID_IMAGE_FORMAT: '허용되지 않는 파일 형식입니다.',
  VALIDATION_ERR: '잘못된 입력입니다. 올바른 값을 입력해주세요.',
  PERMISSION_ERR: '접근 권한이 없습니다. 관리자에게 문의하세요.',
  TIMEOUT_ERR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  ILLEGAL_ACCESS: '잘못된 요청입니다. 올바른 경로로 접근해주세요.',
  BAD_REQUEST_ERR: '요청 형식이 잘못되었습니다. 올바른 형식으로 요청해주세요.',
  UNSUPPORTED_MEDIA_ERR:
    '지원되지 않는 미디어 타입입니다. 올바른 형식으로 요청해주세요.',
  MISSING_PARAM_ERR:
    '필수 파라미터가 누락되었습니다. 모든 필드를 입력해주세요.',
  CONFLICT_ERR: '데이터 충돌이 발생했습니다. 요청을 다시 확인해주세요.',
  RATE_LIMIT_EXCEEDED:
    'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
  ACCOUNT_LOCKED: '사용자 계정이 잠겼습니다. 관리자에게 문의하세요.',
  // 서버 에러메시지
  SERVER_ERR: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  REWARD_HISTORY_SAVE_FAILED: '일기 히스토리 저장에 실패했습니다.',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
} as const;

const NULL = {
  SHARE_POPULAR_FEED: '이번 주는 공개된 일기가 아직 없어요.',
  SHARE_FEED: '공개된 일기가 아직 없어요',
} as const;

const INFO = {
  DIARY_EDIT_INFO: '일기는 당일 00:00부터 24:00전까지 수정 가능합니다.',
} as const;

const MAIN_MESSAGES = {
  TOP_SECTION: {
    WRITE_DIARY: '일기 쓰기',
    MY_DIARY: '내 일기장',
  },
  MIDDLE_SECTION: {
    STATUS_LABEL: '이번 달 잔디 현황',
    PLANTED_GRASS_COUNT: '개의 잔디를 심었어요.',
    GRASS_PROMPT: '일기를 쓰고, 잔디를 더 심어보세요!',
    MONTHLY_GRASS_SUMMARY: `월에는 총 `,
  },

  BOTTOM_SECTION: {
    MY_REWARD: '내 잔디 리워드',
    REWARD_MESSAGE: '잔디를 꾸준히 심고, 리워드를 모아 봐요!',
    THEME_STORE: '테마 상점',
    MONTHLY_DIARY_REVIEW: '한 달 일기 회고',
    REVIEW_DESCRIPTION:
      '지난 한 달 간의 내 시간과 경험들을 돌아보며 회고해봐요.',
    GO_TO_REVIEW: '회고하러 가기',
    SEE_MORE: '더 보러가기',
  },

  BANNER: {
    FUTURE_CONTENT_MESSAGE:
      '잔디 일기에는 앞으로 더 매력적인 콘텐츠들이 추가될 예정이에요!',
  },
} as const;

export { CONSOLE_ERROR, ERROR, NULL, INFO, MAIN_MESSAGES };
