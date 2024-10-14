import { access, constants, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    try {
        await access(filePath, constants.F_OK);
        console.error('FS operation failed');
    } catch (error) {
        try {
            await writeFile(filePath, 'I am fresh and young');
            console.log('File created successfully!');
        } catch (writeError) {
            console.error('FS operation failed:', writeError);
        }
    }
};

await create();