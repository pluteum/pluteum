import { reducer as UploadReducer, reducer, initialState } from './Upload';

describe('UploadReducer', () => {
  it('RESET_UPLOAD should reset the state', () => {
    const sampleState = {
      total: 1,
      errors: new Map(),
      files: new Map(),
    };

    const state = reducer(sampleState, { type: 'RESET_UPLOAD' });

    expect(state).not.toBe(sampleState);
    expect(state).toBe(initialState);
  });

  it('FILES_UPLOAD should add an array of files to the state', () => {
    const action = { type: 'FILES_UPLOAD', files: [{ path: 'test.pdf' }] };
    const state = reducer(initialState, action);

    expect(state.files.has('test.pdf')).toBeTruthy();
  });

  it('FILE_UPLOAD should add or update a single file to the state', () => {
    const action = {
      type: 'FILE_UPLOAD',
      file: { path: 'test.pdf', progress: 0 },
    };
    const state = reducer(initialState, action);

    expect(state.files.has('test.pdf')).toBeTruthy();
  });

  it('FILE_ERROR should add a file name to the errors map in the state', () => {
    const action = {
      type: 'FILE_ERROR',
      path: 'test.pdf',
      error: new Error(),
    };
    const state = reducer(initialState, action);

    expect(state.errors.has('test.pdf')).toBeTruthy();
  });

  it('FILE_UPLOAD should update the total progress in the state', () => {
    const action = {
      type: 'FILE_UPLOAD',
      file: { path: 'test.pdf', progress: 0.5 },
    };
    const state = reducer(initialState, action);

    expect(state.files.has('test.pdf')).toBeTruthy();
    expect(state.total).toBe(0.5);
  });
});
