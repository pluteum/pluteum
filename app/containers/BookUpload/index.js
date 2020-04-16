/**
 *
 * BookUpload
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Modal from 'components/common/Modal/Modal';
import Typography from 'components/common/Type/Typography';
import Input from 'components/common/Input/Input';
import Ratings from 'components/common/Ratings/Ratings';
import BookCover from 'components/BookCover/BookCover';

import makeSelectBookUpload from './selectors';
import reducer from './reducer';
import saga from './saga';

const Layout = styled.div`
  display: flex;
  height: calc(100% - 34px);
  padding: 30px 0;

  > div:first-child {
    flex: 1 0 40%;
  }

  > div:last-child {
    flex: 1 0 60%;
  }
`;

const FormLayout = styled.form`
  margin-left: 45px;

  > div {
    display: flex;
    justify-content: space-between;
  }
`;

export function BookUpload({ onExit }) {
  useInjectReducer({ key: 'bookUpload', reducer });
  useInjectSaga({ key: 'bookUpload', saga });

  return (
    <Modal onExit={onExit}>
      <Typography type="SectionTitle">New Book</Typography>
      <Layout>
        <div>
          <BookCover />
        </div>
        <div>
          <FormLayout>
            <Input label="Title" />
            <div>
              <Input label="Author" />
              <Ratings rating={4} />
            </div>
            <div>
              <Input label="Genre" />
              <Input label="Publisher" />
            </div>
            <div>
              <Input label="Series" />
              <Input label="Publisher" />
            </div>
            <Input type="textarea" label="Description" />
            <Input label="Tags" />
            <Input label="ISBN" />
          </FormLayout>
        </div>
      </Layout>
    </Modal>
  );
}

BookUpload.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onExit: PropTypes.func,
  // files: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bookUpload: makeSelectBookUpload(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookUpload);
