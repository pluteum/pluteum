import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ScanPayload({ payload }) {
  return (
    <SyntaxHighlighter language="json" style={monoBlue} wrapLines>
      {JSON.stringify(JSON.parse(payload), null, '\t')}
    </SyntaxHighlighter>
  );
}
