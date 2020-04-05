import { takeLatest, call, put } from 'redux-saga/effects';
import { BOOK_LISTING_REQUEST } from './constants';
import { getBooksFailure, getBooksSuccess } from './actions';

export function* getBooks() {
  try {
    // Call our request helper (see 'utils/request')
    const books = yield call(fetch, '/api/books');
    const array = yield books.json();

    yield put(getBooksSuccess(array));
  } catch (err) {
    yield put(getBooksFailure(err));
  }
}

export default function* bookIndexSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield takeLatest(BOOK_LISTING_REQUEST, getBooks);
}
