import { createSlice, createSelector, PayloadAction, Draft } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { Post } from 'types/feed';

import { getPosts, likePost } from './actions';

type PostsState = {
  posts: Post[],
  sort: {
    dimension: keyof Pick<Post, 'posted' | 'author'>;
    order: 'asc' | 'desc';
  }
}
const initialState: PostsState = {
  posts: [],
  sort: {
    dimension: 'posted',
    order: 'desc'
  }
}

export const feedSlice = createSlice({
  name: 'Feed',
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<PostsState['sort']>) => {
      return {
        ...state,
        sort: payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPosts.fulfilled,
      updatePosts);

    builder.addCase(
      likePost.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        const posts = state.posts.map((p) => {
          if (p.id === payload) {
            return {
              ...p,
              isLiked: true
            }
          }
          return p;
        });
        return {
          ...state,
          posts
        };
    })
  }
});

export const selectPosts = createSelector(
  (state: RootState) => state.Feed.posts,
  (state: RootState) => state.Feed.sort,
  (posts, { dimension, order }) => posts
    .slice(0)
    .sort((a, b) => {
      const offset = order === 'asc' ? 1 : -1;

      if (dimension === 'posted') {
        return (new Date(a.posted).getTime() - new Date(b.posted).getTime()) * offset;
      }

      return 0;
    }));

const { actions, reducer } = feedSlice;

export const { ...allActions } = actions;
export const name = feedSlice.name;

export default reducer;

function updatePosts(state: Draft<PostsState>, { payload }: PayloadAction<Post[]>) {
  return {
    ...state,
    posts: [
      ...state.posts,
      ...payload
    ]
  };
}