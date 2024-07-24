export interface Grass {
  createdAt: string;
  transparency: number;
}

export interface GrassInfo {
  grassList: Grass[];
  colorRGB: string;
}

export interface GrassApiResponse {
  totalCount: number;
  thisMonthCount: number;
  grassInfoDTO: GrassInfo;
}

export interface RewardPointResponse {
  rewardPoint: number;
}
