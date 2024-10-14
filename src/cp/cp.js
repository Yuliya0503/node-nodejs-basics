import { spawn } from 'child_process';
import { stdin, stdout } from 'process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [file, ...args]);

    stdin.pipe(child.stdin);
    child.stdout.pipe(stdout);

    child.stderr.on('data', (data) => {
        console.error('Error from child process: ', data.toString());
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    })
};

spawnChildProcess( ['someArgument1', 'someArgument2', 'someArgument2', 'someArgument2', 'someArgument25555', 'dffdfd'] );
