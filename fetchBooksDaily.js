import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runFetchBooks() {
    const scriptPath = path.join(__dirname, 'src', 'lib', 'fetchBooks.js');

    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// Run immediately
runFetchBooks();

// Then run every 24 hours
setInterval(runFetchBooks, 24 * 60 * 60 * 1000);
