import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookUpload state domain
 */

const selectBookUploadDomain = state => state.bookUpload || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookUpload
 */

const makeSelectBookUpload = () =>
  createSelector(
    selectBookUploadDomain,
    substate => substate,
  );

export default makeSelectBookUpload;
export { selectBookUploadDomain };
