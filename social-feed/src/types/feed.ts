
export enum PostType {
  COMMENT = 'COMMENT',
  REACTION = 'REACTION',
  INFORMATION = 'INFORMATION'
}

export interface PostAuthor {
  displayName: string;
  email: string;
  avatar: string;
}

export interface Post {
  id: string;
  type: PostType
  title?: string;
  content: PostMessage;
  author: PostAuthor;
  posted: string;
  isLiked?: boolean;
}

export type SimplePostMessage = string;
export type ComplexPostMessage = {
  message: (PostMessage | ComplexPostMessage[]);
};
export type PostMessage = SimplePostMessage | ComplexPostMessage;
