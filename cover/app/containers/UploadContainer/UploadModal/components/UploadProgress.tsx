import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import ProgressBar from 'components/common/ProgressBar';
import Button from 'components/form/Button';

const ModalWrapper = styled.div`
  padding: 35px 50px;
`;

const IndividualUploads = styled(ModalWrapper)`
  max-height: 200px;
  overflow-y: auto;

  > div:first-child {
    margin-top: 0;
  }

  > div {
    margin-top: 30px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 32px;
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

export default function UploadProgress({
  expanded = false,
  totalProgress,
  uploadingFiles,
  onMinimize,
}) {
  return (
    <>
      <ModalWrapper>
        <Typography type="SectionTitle">Uploading Files</Typography>
        <TotalProgressBar>
          <UploadText>
            Uploading {uploadingFiles.length} files •{' '}
            <BoldUploadText>
              {Math.min(100, Math.round(totalProgress * 100))}% complete
            </BoldUploadText>{' '}
            •{' '}
            <ErrorUploadText>
              {uploadingFiles.reduce(
                (errors, file) => (errors = errors + !!file.error ? 1 : 0),
                0,
              )}{' '}
              error
            </ErrorUploadText>
          </UploadText>
          <ProgressBar percent={totalProgress} />
        </TotalProgressBar>
      </ModalWrapper>
      <Divider />
      {expanded && (
        <IndividualUploads>
          {uploadingFiles.map(file => (
            <div>
              <UploadText>Uploading {file.name} </UploadText>
              <ProgressBar percent={file.progress} error={!!file.error} />
            </div>
          ))}
        </IndividualUploads>
      )}
      <ModalFooter>
        <Button onClick={onMinimize} primary>
          Minimize this dialog
        </Button>
      </ModalFooter>
    </>
  );
}

UploadProgress.propTypes = {
  expanded: PropTypes.bool,
  totalProgress: PropTypes.number,
  uploadingFiles: PropTypes.array,
  onMinimize: PropTypes.func,
};
