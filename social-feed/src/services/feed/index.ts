import { faker } from '@faker-js/faker';

import { Post, PostType } from 'types/feed';

const RESPONSE_TIMEOUT = 1000;

export const getPosts = deferredResponse<Post[]>(() => new Array(10)
  .fill(0)
  .map(createPost))

function deferredResponse<T>(
  responseCreator: () => T
): () => Promise<T> {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(responseCreator());
      }, RESPONSE_TIMEOUT);
    });
  }
}

function createPost(): Post {
  const author = faker.internet.userName();
  const type = faker.random.arrayElement(Object.values(PostType));

  switch(type) {
    case PostType.COMMENT: {
      return {
        id: faker.datatype.uuid(),
        content: createReactionContent(author),
        author,
        posted: faker.date.recent(20, Date.now()).toISOString(),
        type
      };
    }
    case PostType.REACTION: {
      return {
        id: faker.datatype.uuid(),
        content: createReactionContent(author),
        author,
        posted: faker.date.recent(20, Date.now()).toISOString(),
        type
      };
    }
    case PostType.INFORMATION: {
      return {
        id: faker.datatype.uuid(),
        content: createReactionContent(author),
        author,
        posted: faker.date.recent(20, Date.now()).toISOString(),
        type
      };
    }
    default:
      throw new Error(`${type} not implemented`);
  }
}

function createReactionContent(author: string) {
  const resource = faker.random.arrayElement(['post', 'dataset', 'content', 'insight']);

  return `${author} liked ${faker.internet.userName()}'s ${resource}`
}