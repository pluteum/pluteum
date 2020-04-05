/*
 *
 * BookIndex reducer
 *
 */
import produce from 'immer';

import {
  BOOK_LISTING_REQUEST,
  BOOK_LISTING_REQUEST_SUCCESS,
  BOOK_LISTING_REQUEST_FAILURE,
} from './constants';

export const initialState = {
  loading: false,
  books: [],
};

/* eslint-disable default-case, no-param-reassign */
const bookIndexReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOOK_LISTING_REQUEST:
        draft.loading = true;
        break;
      case BOOK_LISTING_REQUEST_SUCCESS:
        draft.loading = false;
        draft.books = action.books;
        break;
      case BOOK_LISTING_REQUEST_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default bookIndexReducer;
