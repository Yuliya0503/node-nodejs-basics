import { access, constants, mkdir, readdir, copyFile, lstat } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourceDir = join(__dirname, 'files');
const copyDir = join(__dirname, 'files_copy');

//проверяем существование директории.
const isExistsDir = async(dir) => {
    try{
        await access(dir, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

const copyDirectory = async (source, target) => {
    await mkdir(target, { recursive: true });
    const items = await readdir(source);

    await Promise.all(items.map(async (item) => {
        const currentSource = join(source, item);
        const currentTarget = join(target, item);

        //является ли элемент папкой
        const stat = await lstat(currentSource);
        if(stat.isDirectory()) {
            await copyDirectory(currentSource, currentTarget);
        } else {
            await copyFile(currentSource, currentTarget);
        }
    }));
}

const copy = async () => {
    const sourceExists = await isExistsDir(sourceDir);
    const copyExists = await isExistsDir(copyDir);
    
    if(!sourceExists) {
        console.error('FS operation failed: source directory does not exist');
        return;
    } 
    if(copyExists) {
        console.error('FS operation failed: files_copy already exists');
        return;
    }
    
    await copyDirectory(sourceDir, copyDir)
    console.log('Directory copied successfully!');
};

await copy();
