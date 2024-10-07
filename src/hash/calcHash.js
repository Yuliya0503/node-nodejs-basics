import { access, constants } from 'fs/promises';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToHash = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

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

const calculateHash = async () => {
    try {
        const existFile = await isExistsFile(fileToHash);
        if (!existFile) return;

        const hash = createHash('sha256');

        const stream = createReadStream(fileToHash);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => {
            const res = hash.digest('hex');
            console.warn(`SHA256 hash (hex): ${res}`)
        });
        stream.on('error', (error) => console.error(`Error: ${error}`));
        
    } catch (error) {
        console.error('Operation failed: ', error.massage);
    }
};

await calculateHash();