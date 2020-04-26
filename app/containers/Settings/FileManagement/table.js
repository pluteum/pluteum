export function columnDef() {
  return [
    {
      Header: '',
      accessor: 'image',
    },
    {
      Header: 'Filename',
      accessor: 'name',
    },
    {
      Header: 'Book',
      accessor: 'book.title',
    },
    {
      Header: '',
      accessor: 'processed',
    },
    {
      Header: '',
      accessor: 'url',
    },
  ];
}
