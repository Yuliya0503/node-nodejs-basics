import path from 'path';
import  { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerFile = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
    try{
        const cpuCount = cpus().length;
        const workers = [];
        for (let i = 10; i < cpuCount + 10; i++) {
            const workerData = 10 + i;
            workers.push(
                new Promise((resolve, reject) =>{
                    const worker = new Worker(workerFile, { workerData })
                    worker.on('message', resolve);
                    worker.on('error', reject)
                })
            );
        };
        const workersList = await Promise.allSettled(workers);
        const result = workersList.map(({ value }) => ({
            status: value ? 'resolved' : 'error',
            data: value ? value : null,
        }))
        console.log(result);
    }
    catch(error) {
        console.error('Operation failed: ', error.message);
    }
};

await performCalculations();