import { faker } from '@faker-js/faker';

import { Post, PostAuthor, PostType } from 'types/feed';

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
  const type = faker.random.arrayElement(Object.values(PostType));
  const author = {
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
  };

  switch(type) {
    case PostType.COMMENT: {
      return {
        id: faker.datatype.uuid(),
        content: {
          message: [
            { message: `${faker.internet.userName()} commented` },
            { message: `Great insight! we should look into this further.` },
            { message: `on Customer Experience ${faker.address.country()} ${faker.date.past(10).getUTCFullYear()}` }
          ]
        },
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

function createReactionContent(author: PostAuthor) {
  const resource = faker.random.arrayElement(['post', 'dataset', 'content', 'insight']);

  return `${author.displayName} liked ${faker.internet.userName()}'s ${resource}`
}