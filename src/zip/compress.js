import { access, constants, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToCompress = join(__dirname, 'files', 'fileToCompress.txt');
const compressedFile = join(__dirname, 'files', 'archive.gz');

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

const compress = async () => {
    try {
        const existFileToCompress = await isExistsFile(fileToCompress);
        if (!existFileToCompress) return;

        const sourse = createReadStream(fileToCompress);
        const destinatioin = createWriteStream(compressedFile);
        const gzip = createGzip();
        const pipe = promisify(pipeline);
        await pipe(sourse, gzip, destinatioin);
        await unlink(fileToCompress);
        console.log('File compressed successfully!')

    } catch(error) {
        console.error('Compression failed:', error.message);
    }
};

await compress();