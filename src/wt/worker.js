import { parentPort, workerData } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    try{
        parentPort.postMessage(nthFibonacci(workerData));
    }
    catch(error) {
        console.error('Operation failed: ', error.message);
    }  
};

sendResult();