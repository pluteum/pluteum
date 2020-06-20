import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import ProgressBar from 'components/common/ProgressBar';
import Button from 'components/form/Button';
import { ModalWrapper, ModalFooter } from 'components/common/Modal/Modal';

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
  expanded,
  totalProgress,
  files,
  errors,
  onMinimize,
}) {
  const [hasErrors, setHasErrors] = useState(!!errors.size);
  useEffect(() => {
    setHasErrors(errors.size > 0);
  }, [errors]);

  return (
    <>
      <ModalWrapper>
        <Typography type="SectionTitle">
          Uploading {files.size} files...
        </Typography>
        <TotalProgressBar>
          <UploadText>
            Uploading {files.size} files •{' '}
            <BoldUploadText>
              {Math.min(100, Math.round(totalProgress * 100))}% complete
            </BoldUploadText>{' '}
            {hasErrors && (
              <>
                •{' '}
                <ErrorUploadText>
                  {errors.size} error{errors.size > 1 && 's'}
                </ErrorUploadText>
              </>
            )}
          </UploadText>
          <ProgressBar percent={totalProgress} error={hasErrors} />
        </TotalProgressBar>
      </ModalWrapper>
      <Divider />
      {(expanded || hasErrors) && (
        <IndividualUploads>
          {!expanded &&
            hasErrors &&
            [...errors.keys()].map(fileName => {
              const file = files.get(fileName);
              return (
                <div key={fileName}>
                  <UploadText>
                    An error has occured while uploading {fileName}{' '}
                  </UploadText>
                  <ProgressBar percent={file.progress} error />
                </div>
              );
            })}
          {expanded &&
            [...files.entries()].map(([name, file]) => (
              <div key={name}>
                <UploadText>Uploading {name} </UploadText>
                <ProgressBar
                  percent={file.progress}
                  error={!!errors.has(name)}
                />
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
  files: PropTypes.object,
  errors: PropTypes.object,
  onMinimize: PropTypes.func,
};
