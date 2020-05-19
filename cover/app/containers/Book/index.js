import React from 'react';
import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';

export default function Book() {
  const pageActions = [
    <Button>Download</Button>,
    <Button primary>Edit Book</Button>,
  ];

  return (
    <section>
      <PageHeader title="Book" actions={pageActions} />
    </section>
  );
}
