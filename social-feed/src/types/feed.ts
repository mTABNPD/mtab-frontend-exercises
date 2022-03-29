
export enum PostType {
  COMMENT = 'COMMENT',
  REACTION = 'REACTION',
  INFORMATION = 'INFORMATION'
}

export interface Post {
  id: string;
  type: PostType
  title?: string;
  content: PostMessage;
  author: string;
  posted: string;
}

export type SimplePostMessage = string;
export type ComplexPostMessage = {
  message: ComplexPostMessage[];
};
export type PostMessage = SimplePostMessage | ComplexPostMessage;
