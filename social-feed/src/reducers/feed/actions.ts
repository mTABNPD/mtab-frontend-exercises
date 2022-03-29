import { createAsyncThunk  } from '@reduxjs/toolkit';

import { getPosts as getPostService } from 'services/feed';

export const getPosts = createAsyncThunk(
  'Feed/GetPosts',
  getPostService);