import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import ProgressBar from 'components/common/ProgressBar';

const ModalWrapper = styled.div`
  padding: 35px 50px;
`;

const UploadText = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-size: 16px;
  line-height: 21px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 10px 0;
`;

const BoldUploadText = styled.span`
  font-weight: bold;
`;

const ErrorUploadText = styled.span`
  color: ${props => props.theme.colors.red};
`;

const TotalProgressBar = styled.div`
  margin: 35px 0;
`;

const Divider = styled.hr`
  margin: 0;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

export default function UploadProgress({ totalProgress, uploadingFiles }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ModalWrapper>
        <Typography type="SectionTitle">Uploading Files</Typography>
        <TotalProgressBar>
          <UploadText>
            Uploading 7 files • <BoldUploadText>78% complete</BoldUploadText> •
            <ErrorUploadText> 1 error</ErrorUploadText>
          </UploadText>
          <ProgressBar percent={totalProgress} />
        </TotalProgressBar>
      </ModalWrapper>
      <Divider />
    </>
  );
}

UploadProgress.propTypes = {
  totalProgress: PropTypes.number,
  uploadingFiles: PropTypes.array,
};
