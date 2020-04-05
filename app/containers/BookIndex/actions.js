/*
 *
 * Bookindex actions
 *
 */

import {
  BOOK_LISTING_REQUEST,
  BOOK_LISTING_REQUEST_SUCCESS,
  BOOK_LISTING_REQUEST_FAILURE,
} from './constants';

export function getBooks() {
  return {
    type: BOOK_LISTING_REQUEST,
  };
}

export function getBooksSuccess(books) {
  return {
    type: BOOK_LISTING_REQUEST_SUCCESS,
    books,
  };
}

export function getBooksFailure(error) {
  return {
    type: BOOK_LISTING_REQUEST_FAILURE,
    error,
  };
}
