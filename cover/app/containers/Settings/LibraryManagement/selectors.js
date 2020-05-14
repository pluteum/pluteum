import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LibraryManagement state domain
 */

const selectLibraryManagementDomain = state =>
  state.settingsLibraryManagement || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LibraryManagement
 */

const makeSelectLibraryManagement = () =>
  createSelector(
    selectLibraryManagementDomain,
    substate => substate,
  );

export default makeSelectLibraryManagement;
export { selectLibraryManagementDomain };
