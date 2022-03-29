import { createAsyncThunk  } from '@reduxjs/toolkit';

import { getPosts as getPostService, likePost as likePostService } from 'services/feed';

export const getPosts = createAsyncThunk(
  'Feed/GetPosts',
  getPostService);

export const likePost = createAsyncThunk<string, string>(
  'Feed/LikePost',
  (postId) => likePostService(postId).then(() => postId));