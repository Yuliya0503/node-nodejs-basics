import { access, constants, readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filesDir = join(__dirname, 'files');

//проверяем существование директории.
const isExistsDir = async(dir) => {
    try{
        await access(dir, constants.F_OK);
        return true;
    } catch (error) {
        console.error('FS operation failed: failes folder does not exist');
        return false;
    }
}

const list = async () => {
    const existDir = await isExistsDir(filesDir);
    if (!existDir) return;

    try {
        const files = await readdir(filesDir);
        console.log('Files: ', files)
    } catch (error) {
        console.error('FS operation failed: ', error.message);
    }
};

await list();