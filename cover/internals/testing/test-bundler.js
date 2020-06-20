// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import '@babel/polyfill';
import '@testing-library/jest-dom';
import { enableMapSet } from 'immer';

enableMapSet();
