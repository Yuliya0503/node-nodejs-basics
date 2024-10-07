import { access, constants, open } from 'fs/promises';
import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToWrite = join(__dirname, 'files', 'fileToWrite.txt');

//проверяем существование файла.
const isExistsFile = async(fileName) => {
    try {
        await access(fileName, constants.F_OK);
        console.log('File exists, writing will overwrite it.');
    } catch (error) {
        console.log('File does not exist, creating a new one...');
        await open(fileName, 'w'); // создаем файл, если его нет
    }
}

const write = async () => {
    try {
        await isExistsFile(fileToWrite); 

        const stream = createWriteStream(fileToWrite);
        process.stdin.pipe(stream);
        process.stdin.on('end', () => {
            console.warn('\nFinished writing data to file.');
        });
        stream.on('error', error => console.error('Operation failed: ', error.message));
    } catch (error) {
        console.error('Compression failed:', error.message);
    }
};

await write();