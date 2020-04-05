/*
 *
 * BookIndex
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getBooks } from './actions';

import { makeSelectBooks } from './selector';
import BookCard from '../../components/BookCard/BookCard';
import Typography from '../../components/common/Type/Typography';

const key = 'bookindex';

export function BookIndex(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.fetchBooks();
  }, []);

  return (
    <React.Fragment>
      <Typography type="SectionTitle">Your Library</Typography>
      <ul>
        {props.books &&
          props.books.map(book => <BookCard key={book.id} book={book} />)}
      </ul>
    </React.Fragment>
  );
}

BookIndex.propTypes = {
  books: PropTypes.array,
  fetchBooks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  books: makeSelectBooks(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchBooks: () => dispatch(getBooks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BookIndex);
