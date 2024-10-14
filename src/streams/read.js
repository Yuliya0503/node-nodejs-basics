import { access, constants } from 'fs/promises';
import { createReadStream } from 'fs';
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
        console.error('Operation failed: file does not exist');
        return false;
    }
}

const read = async () => {
    try {
        const existFile = await isExistsFile(fileToRead);
        if (!existFile) return; 

        const stream = createReadStream(fileToRead, {encoding: 'utf-8'});
        stream.pipe(process.stdout);
        stream.on('error', error => console.error('Operation failed: ', error.message));
        stream.on('end', () => {
            console.warn('\nFile reading finished.');
        });
    } catch (error) {
        console.error('Compression failed:', error.message);
    }
};

await read();