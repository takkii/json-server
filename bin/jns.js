import { execSync } from 'child_process';

async function jns() {
    try {
        const stdout = await execSync('node --expose_gc server.js 1337 d78b4b6e-06e7-4d4b-b354-1f1c27bb3281')
        console.log(`stdout: ${stdout.toString()}`)
    } catch (error) {
        console.error('Error: ', error);
    }
}

jns().then()