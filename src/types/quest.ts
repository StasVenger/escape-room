import { QuestInfo } from './quest-info';

export type Quest = {
  description: string;
  coverImg: string;
  coverImgWebp: string;
} & QuestInfo
