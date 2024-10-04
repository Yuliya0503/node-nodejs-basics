import { access, constants, unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filesDir = join(__dirname, 'files');
const fileToRemove = join(filesDir, 'fileToRemove.txt');

//проверяем существование файла.
const isExistsFile = async(fileName) => {
    try{
        await access(fileName, constants.F_OK);
        return true;
    } catch (error) {
        console.error('FS operation failed: fileToRemove.txt does not exist');
        return false;
    }
}

const remove = async () => {
    const exists = await isExistsFile(fileToRemove);
    if (!exists) return;

    try {
        await unlink(fileToRemove);
        console.log('File deleted successfully!');
    } catch (error) {
        console.error('FS operation failed: ', error.message);
    }
};

await remove();