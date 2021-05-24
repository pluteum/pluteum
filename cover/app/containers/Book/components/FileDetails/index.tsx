import React, { useState } from 'react';
import Table from 'components/table';
import styled from 'styled-components';

import { columnDef } from './table';
import Modal from 'components/common/Modal/Modal';
import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import ScansModal from './ScansModal';

const Layout = styled.div`
  padding: 10px;

  max-width: 1040px;
  margin: 40px auto;
`;

export default function FileDetails({ files }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scansModalOpen, setScansModalOpen] = useState(false);

  function showScan(file) {
    setSelectedFile(file);
    setScansModalOpen(true);
  }

  const TableColumns = React.useMemo(() => columnDef(showScan), []);

  const TableData = React.useMemo(() => files, [files]);

  return (
    <Layout>
      <ModalPortal>
        {scansModalOpen && (
          <ScansModal
            file={selectedFile}
            onExit={() => setScansModalOpen(false)}
          />
        )}
      </ModalPortal>
      {files && <Table columns={TableColumns} data={TableData} />}
    </Layout>
  );
}
