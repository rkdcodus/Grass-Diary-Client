export const CONSOLE_ERROR = {
  login: {
    false: '로그인되지 않은 사용자입니다.',
    fail: '인증 확인 중 오류가 발생했습니다.',
  },
  like: {
    post: '사용자의 좋아요 정보를 불러올 수 없습니다.',
    delete: '사용자의 좋아요 정보를 삭제할 수 없습니다.',
  },
  diary: {
    get: '사용자의 일기를 불러올 수 없습니다.',
    delete: '사용자의 일기를 삭제할 수 없습니다.',
  },
  grass: {
    get: '사용자의 잔디를 불러올 수 없습니다.',
  },
  date: {
    get: '오늘의 날짜를 불러올 수 없습니다.',
  },
  question: {
    get: '오늘의 질문을 불러올 수 없습니다.',
  },
  search_date: {
    get: '선택된 날짜의 일기를 불러올 수 없습니다.',
  },
  member: {
    get: '사용자 정보를 불러올 수 없습니다.',
    patch: '사용자 정보를 수정할 수 없습니다.',
  },
  profile: {
    get: '사용자 프로필을 조회할 수 없습니다.',
  },
  reward: {
    get: '리워드 정보를 불러올 수 없습니다.',
  },
} as const;

export const ERROR = {
  // 인증, 엑세스 토큰, 세션 만료 에러메시지
  unauthorized: '인증이 필요합니다. 로그인 해주세요.',
  authentication_failed: '인증을 실패했습니다.',
  auth_invalid_access_token: '잘못된 액세스 토큰입니다.',
  auth_expired_access_token: '액세스 토큰이 만료되었습니다.',
  auth_invalid_signature: '잘못된 시그니처입니다.',
  auth_jwt_error: 'JWT 관련 오류가 발생했습니다.',
  auth_missing_id_in_access_token: 'JWT 액세스 토큰에 ID가 누락되었습니다.',
  auth_token_extraction_failed: '액세스 토큰 추출에 실패했습니다.',
  auth_session_expired: '세션이 만료되었습니다. 다시 로그인 해주세요.',
  // 잘못된 요청 에러 메시지
  member_not_found_err: '요청하신 사용자를 찾을 수 없습니다.',
  diary_already_exists: '이미 해당 날짜에 작성된 일기가 있습니다.',
  diary_not_found_err: '요청하신 다이어리를 찾을 수 없습니다.',
  diary_not_write: '일기가 작성되지 않았습니다.',
  diary_cant_edit: '⚠ 수정 가능한 시간이 아닙니다',
  invalid_image_format: '허용되지 않는 파일 형식입니다.',
  validation_err: '잘못된 입력입니다. 올바른 값을 입력해주세요.',
  permission_err: '접근 권한이 없습니다. 관리자에게 문의하세요.',
  timeout_err: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  illegal_access: '잘못된 요청입니다. 올바른 경로로 접근해주세요.',
  bad_request_err: '요청 형식이 잘못되었습니다. 올바른 형식으로 요청해주세요.',
  unsupported_media_err:
    '지원되지 않는 미디어 타입입니다. 올바른 형식으로 요청해주세요.',
  missing_param_err:
    '필수 파라미터가 누락되었습니다. 모든 필드를 입력해주세요.',
  conflict_err: '데이터 충돌이 발생했습니다. 요청을 다시 확인해주세요.',
  rate_limit_exceeded:
    'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
  account_locked: '사용자 계정이 잠겼습니다. 관리자에게 문의하세요.',
  // 서버 에러메시지
  server_err: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  reward_history_save_failed: '일기 히스토리 저장에 실패했습니다.',
  image_upload_failed: '이미지 업로드에 실패했습니다.',
} as const;

export const NULL = {
  share_popular_feed: '이번 주는 공개된 일기가 아직 없어요.',
  share_feed: '공개된 일기가 아직 없어요',
} as const;

export const DIARY = {
  edit_info: '일기는 당일 00:00부터 24:00전까지 수정 가능합니다.',
  delete_confirm:
    '일기를 삭제하시겠어요?\n삭제된 일기는 다시 되돌릴 수 없어요.',
} as const;

export const COMMENT = {
  deleted: '삭제된 댓글입니다',
  placeholder: '댓글을 입력해주세요',
} as const;

export const FOOTER = {
  copyright: 'Copyright © 2024 Jandi Diary. All rights reserved.',
} as const;

export const MAIN_MESSAGES = {
  top_section: {
    write_diary: '일기 쓰기',
    my_diary: '내 일기장',
  },
  middle_section: {
    status_label: '이번 달 잔디 현황',
    planted_grass_count: '개의 잔디를 심었어요.',
    grass_prompt: '일기를 쓰고, 잔디를 더 심어보세요!',
    monthly_grass_summary: '월에는 총 ',
  },
  bottom_section: {
    my_reward: '내 잔디 리워드',
    reward_message: '잔디를 꾸준히 심고, 리워드를 모아 봐요!',
    theme_store: '테마 상점',
    monthly_diary_review: '한 달 일기 회고',
    review_description:
      '지난 한 달 간의 내 시간과 경험들을 돌아보며 회고해봐요.',
    go_to_review: '회고하러 가기',
    see_more: '더 보러가기',
  },
  banner: {
    future_content_message:
      '잔디 일기에는 앞으로 더 매력적인 콘텐츠들이 추가될 예정이에요!',
  },
} as const;

export const SETTING_MESSAGES = {
  button: {
    image: (type: string) => `이미지 ${type}`,
    save: '저장',
    amend: '수정',
    withdraw: '회원 탈퇴',
    apply: '적용하기',
    navigate: '잔디 테마 설정 페이지로 이동하기',
  },
  placeholder: {
    introduction: '소개글을 작성해 보세요. 150자까지만 쓸 수 있어요!',
  },
  label: {
    nickname: '닉네임',
    email: '이메일 주소',
    theme: '테마',
    withdraw: '회원 탈퇴',
  },
  message: {
    nickname:
      '마이페이지의 최상단에 나타나는 닉네임을 8글자 이내로 설정할 수 있습니다.',
    email: '회원 인증 및 메일 발송에 사용되는 이메일 주소입니다.',
    theme: '기본 모드와 나이트 모드를 선택할 수 있습니다.',
    withdraw:
      '회원 탈퇴 시 작성한 포스트 및 댓글은 모두 삭제되며 복구되지 않습니다.',
  },
};
