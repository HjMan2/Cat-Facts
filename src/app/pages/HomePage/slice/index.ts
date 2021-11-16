import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  catFact: '',
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    loadCatFact(state, action: PayloadAction) {
      state.loading = true;
    },
    loadCatFactSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.catFact = action.payload;
      state.error = null;
    },
    loadCatFactFailed(state, action: PayloadAction<string | null | unknown>) {
      state.loading = false;
      state.error = action.payload;
      state.catFact = '';
    },
  },
});

export const { actions: Actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
