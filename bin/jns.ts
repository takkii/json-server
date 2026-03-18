import { execSync } from 'child_process';

class Env {
    async run() {
        try {
            const stdout = execSync('ts-node server.ts 1337 cdae648a-7d2f-40c8-bcc8-297335e27f67')
            console.log(`stdout: ${stdout.toString()}`)
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

const environ = new Env();
environ.run().then();