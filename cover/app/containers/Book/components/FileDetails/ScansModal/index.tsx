import React, { useState } from 'react';
import styled from 'styled-components';

import Modal, { ModalWrapper } from 'components/common/Modal/Modal';
import Typography from 'components/common/Type/Typography';
import {
  Loader,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'react-feather';
import ScanPayload from 'components/ScanPayload';

const ScanWrapper = styled.div`
  margin: 32px 0;
  padding: 16px;

  background: ${props => props.theme.colors.lightBlue};

  border-radius: 16px;
`;

const ScanRow = styled.div`
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p svg {
      margin-right: 10px;
    }

    span {
      font-size: 12px;
    }
  }
`;

const ScanDetails = styled.div``;

function Scan({ scan }) {
  const [open, setOpen] = useState(false);

  let status = <Loader />;

  if (scan.finishedAt && !scan.error) {
    status = <CheckCircle color="#494B4F" />;
  } else if (scan => scan.error) {
    status = <AlertCircle color="#D52020" />;
  }

  const start = new Date(scan.queuedAt || Date.now());
  const end = new Date(scan.finishedAt || Date.now());

  return (
    <ScanWrapper>
      <ScanRow onClick={() => setOpen(!open)}>
        <div>
          <Typography>
            {status} Scan {scan.uuid.slice(0, 8)}
          </Typography>
          <span>
            Started: {start.toDateString()} <br />
            Finished: {end.toDateString()}
          </span>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </ScanRow>
      {open && (
        <ScanDetails>
          {scan.error && (
            <div>
              <p>
                <strong>Error:</strong>
              </p>
              <code>{scan.error}</code>
            </div>
          )}
          {scan.source && (
            <div>
              <p>
                <strong>Data Source:</strong> {scan.source}
              </p>
            </div>
          )}
          {scan.payload && (
            <div>
              <p>
                <strong>Payload</strong>
              </p>
              <ScanPayload payload={scan.payload} />
            </div>
          )}
        </ScanDetails>
      )}
    </ScanWrapper>
  );
}

export default function ScansModal({ file, onExit }) {
  const scans = file.scans.map(scan => <Scan scan={scan} />);

  return (
    <Modal onExit={onExit}>
      <ModalWrapper>
        <Typography type="SectionTitle">Scans for {file.name}</Typography>
        {scans}
      </ModalWrapper>
    </Modal>
  );
}
