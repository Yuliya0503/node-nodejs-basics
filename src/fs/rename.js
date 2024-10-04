import { access, constants, rename as fsRename } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filesDir = join(__dirname, 'files');

const oldFileName = join(filesDir, 'wrongFilename.txt');
const newFileName = join(filesDir, 'properFilename.md');

//проверяем существование файла.
const isExistsFile = async(fileName) => {
    try{
        await access(fileName, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

const rename = async () => {
    try {
        const oldFileNameExists = await isExistsFile(oldFileName);
        const newFileNameExists = await isExistsFile(newFileName);

        if(!oldFileNameExists) {
            console.error('FS operation failed: wrongFilename.txt does not exist');
            return;
        } 
        if(newFileNameExists) {
            console.error('FS operation failed: properFilename.md already exists');
            return;
        }

        await fsRename(oldFileName, newFileName);
        console.warn('File renamed successfully!');
    } catch (error) {
        console.error('FS operation failed: ', error.message)
    }
    
};

await rename();