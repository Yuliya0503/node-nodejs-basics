import { Transform } from 'stream';
import { stdin, stdout } from 'process';

const transform = async () => {
    try {
        const reverse = new Transform({
            transform(chunk, _, callback){
                const resString = chunk.toString('utf-8').split('').reverse().join('');
                callback(null, `${resString}\n`);
            }
        });
        stdin.pipe(reverse).pipe(stdout);
    }
    catch(error) {
        console.error(error);
    }  
};

await transform();