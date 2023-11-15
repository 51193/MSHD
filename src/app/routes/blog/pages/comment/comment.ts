export interface Comment {
  id: number;
  question: string;
  comments: Array<string>;
}

export interface OneComment {
  id: number;
  question: string;
  comment: string;
}

export interface PostComment {
  question: string;
  comment: string;
}

export type OneComments = OneComment[];
