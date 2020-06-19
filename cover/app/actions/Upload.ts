import { UploadingFile } from 'reducers/Upload';

export const resetUpload = () => ({
  type: 'RESET_UPLOAD',
});

export const uploadFile = (file: UploadingFile) => ({
  type: 'FILE_UPLOAD',
  file,
});

export const uploadFiles = (files: File[]) => ({
  type: 'FILES_UPLOAD',
  files,
});

export const fileError = (path: string, error: Error) => ({
  type: 'FILE_ERROR',
  path,
  error,
});
