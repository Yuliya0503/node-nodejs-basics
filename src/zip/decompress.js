import { access, constants, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
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

const decompress = async () => {
    try {
        const existCompressedFile = await isExistsFile(compressedFile);
        if (!existCompressedFile) return;

        const sourse = createReadStream(compressedFile);
        const destinatioin = createWriteStream(fileToCompress);
        const gunzip = createGunzip();
        const pipe = promisify(pipeline);
        await pipe(sourse, gunzip, destinatioin);
        await unlink(compressedFile);
        console.log('File decompressed successfully!')

    } catch(error) {
        console.error('Decompression failed:', error.message);
    }
};

await decompress();