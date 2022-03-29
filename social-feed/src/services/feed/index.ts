import { faker } from '@faker-js/faker';

import { Post, PostAuthor, PostType } from 'types/feed';

const RESPONSE_TIMEOUT = 1000;

export const getPosts = deferredResponse<() => Post[]>(() => new Array(10)
  .fill(0)
  .map(createPost));

export const likePost = deferredResponse<(postId: string) => string>((postId) => postId, 50);
export const followAuthor = deferredResponse<(authorId: string) => string>((authorId) => authorId, 50);

function deferredResponse<T extends (...args: any) => any>(
  responseCreator: T,
  timeout = RESPONSE_TIMEOUT
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(responseCreator(...args));
      }, timeout);
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
        content: createInformationContent(author),
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

function createInformationContent(author: PostAuthor) {
  const resource = `Dataset ${faker.commerce.productName()} Study ${faker.date.future(5).getUTCFullYear()}`;

  return {
    message: [
      { message: `${author.displayName} has made`},
      { message: `${resource} available to you` }
    ]
  }
}