import { access, constants, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToRead = join(__dirname, 'files', 'fileToRead.txt');

//проверяем существование файла.
const isExistsFile = async(fileName) => {
    try{
        await access(fileName, constants.F_OK);
        return true;
    } catch (error) {
        console.error('FS operation failed: file does not exist');
        return false;
    }
}

const read = async () => {
    const existFile = await isExistsFile(fileToRead);
    if (!existFile) return;
    try {
        const fileInfo = await readFile(fileToRead, { encoding: 'utf8' });
        console.log(fileInfo)
    } catch (error) {
        console.error('FS operation failed: ', error.message);
    }
};

await read();