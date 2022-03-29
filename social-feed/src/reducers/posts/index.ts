import { createSlice, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { Post } from 'types/feed';

type PostsState = {
  posts: Post[]
}
const initialState: PostsState = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {}
});

export const selectPosts = createSelector(
  (state: RootState) => state.Posts.posts,
  (posts) => posts.sort((a, b) => new Date(a.posted).getTime() - new Date(b.posted).getTime()));

const { actions, reducer } = postsSlice;

export const { ...allActions } = actions;
export const name = postsSlice.name;

export default reducer;