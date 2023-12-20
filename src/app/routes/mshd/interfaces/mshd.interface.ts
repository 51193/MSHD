export interface DisasterCodeInfo {
  id: number;
  disasterId: string;
  locationProvince: string;
  locationCity: string;
  locationCounty: string;
  locationTown: string;
  locationVillage: string;
  uploadTime: Date;
  sourceMain: string;
  sourceSub: string;
  carrier: string;
  disasterMain: string;
  disasterSub: string;
  disasterTarget: string;
  username: string;
  description: string;
  haveFile: number;
  fileUrl: string;
  fileUploader: string;
  fileTime: string;
  createTime: Date;
  active: number;
  longitude: number;
  latitude: number;
}

export type DisasterCodeInfos = DisasterCodeInfo[];
