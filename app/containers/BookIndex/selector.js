/**
 * BookIndex selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBookIndex = state => state.bookindex || initialState;

const makeSelectBooks = () =>
  createSelector(
    selectBookIndex,
    bookIndex => bookIndex.books,
  );

export { selectBookIndex, makeSelectBooks };
