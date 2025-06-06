export interface GeneratePortraitRequest {
  yearWar: string;
  side: string;
  rank: string;
  branch: string;
  extraDetails?: string;
  artStyle: 'oil' | 'watercolor';
}

export interface GeneratePortraitResponse {
  success: boolean;
  portraitId: number;
  imageUrl: string;
}

export interface Portrait {
  id: number;
  originalImageUrl: string;
  generatedImageUrl: string;
  yearWar: string;
  side: string;
  rank: string;
  branch: string;
  extraDetails?: string;
  artStyle: string;
  createdAt: string;
}
