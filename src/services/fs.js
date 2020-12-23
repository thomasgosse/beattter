import { DocumentDirectoryPath, TemporaryDirectoryPath, copyFile, unlink, exists, readDir } from 'react-native-fs';

export const StoragePath = DocumentDirectoryPath;

export async function deleteFile(path) {
  try {
    const fileExists = await exists(path);
    fileExists && (await unlink(path));
  } catch (e) {
    console.error('An error happened while deleteing file: ', path, e);
  }
}

export async function emptyTemporaryDir() {
  try {
    const items = await readDir(TemporaryDirectoryPath);
    items.forEach((item) => unlink(item.path));
  } catch (e) {
    console.error('An error happened while emptying tmp directory');
  }
}

export async function copy(path, destPath) {
  return copyFile(path, destPath);
}
