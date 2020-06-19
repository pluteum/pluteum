import produce from 'immer';

export interface UploadingFile {
  path: string;
  progress: number;
  error?: Error;
}

interface UploadState {
  errors: Map<string, Error>;
  total: number;
  files: Map<string, UploadingFile>;
}

export const initialState = {
  errors: new Map(),
  total: 0,
  files: new Map(),
};

function calculateTotal(files: UploadingFile[]) {
  return (
    files.reduce(
      (total: number, file: UploadingFile) => total + file.progress,
      0,
    ) / files.length
  );
}

export function reducer(state: UploadState, action): UploadState {
  console.log(state, action);
  return produce(state, draft => {
    switch (action.type) {
      case 'RESET_UPLOAD':
        return initialState;
      case 'FILES_UPLOAD':
        action.files.forEach(file => {
          draft.files.set(file.path, { progress: 0, ...file });
        });

        draft.total = calculateTotal([...draft.files.values()]);
        return;
      case 'FILE_UPLOAD':
        draft.files.set(action.file.path, action.file);
        draft.total = calculateTotal([...draft.files.values()]);
        return;
      case 'FILE_ERROR':
        draft.errors.set(action.path, action.error);
        return;
      default:
        throw new Error();
    }
  });
}
