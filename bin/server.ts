// @ts-ignore
import http from 'http';
import {existsSync, readFileSync} from 'node:fs';
// @ts-ignore
import process from 'node:process';

const json_data = '../json/types.json'

class Env {
    async run() {
        try {
            if (existsSync(`${json_data}`)) {
                const data = await JSON.parse(readFileSync(`${json_data}`, 'utf8'));
                if (data["password"] === process.argv[3]) {
                    const mask = process.argv[2];
                    const port = process.env.PORT || mask;
                    let obj = {};
                    // @ts-ignore
                    const server = http.createServer(function (req: {
                        connection: { remoteAddress: any; };
                        url: any;
                        method: any;
                        on: (arg0: string, arg1: {
                            (chunk: any): void;
                            (): void;
                            (chunk: any): void;
                            (): void;
                            (): void;
                            (err: any): void;
                        }) => void;
                        setTimeout: (arg0: number) => void;
                        abort: () => void;
                    }, res: {
                        writeHead: (arg0: number, arg1: {
                            Connection: string;
                            "Content-Length": number;
                            "Content-Type"?: string;
                        }) => void; end: () => void; write: (arg0: string) => void;
                    }) {
                        let data: string;
                        // noinspection JSDeprecatedSymbols
                        const remoteAddress = req.connection.remoteAddress;
                        const header = {'Connection': 'close', 'Content-Length': 0};
                        const key = req.url;
                        switch (req.method) {
                            case 'POST':
                                // @ts-ignore
                                if (obj[key]) {
                                    // @ts-ignore
                                    res.writeHead(403, header);
                                    res.end();
                                } else {
                                    data = '';
                                    // @ts-ignore
                                    req.on('data', function (chunk: string) {
                                        data += chunk;
                                    });
                                    req.on('end', function () {
                                        try {
                                            // @ts-ignore
                                            obj[key] = JSON.parse(data);
                                            // @ts-ignore
                                            res.writeHead(200, header);
                                            // @ts-ignore
                                            console.log('POST', key, obj[key], 'from ' + remoteAddress);
                                        } catch (e) {
                                            // @ts-ignore
                                            res.writeHead(400, e.message);
                                        }
                                        res.end();
                                    });
                                }
                                break;
                            case 'GET':
                                // @ts-ignore
                                if (obj[key]) {
                                    // @ts-ignore
                                    const json = JSON.stringify(obj[key]);
                                    res.writeHead(200, {
                                        'Content-Length': Buffer.byteLength(json),
                                        'Content-Type': 'application/json',
                                        'Connection': 'close'
                                    });
                                    res.write(json);
                                    console.log('GET', key, 'from ' + remoteAddress);
                                } else {
                                    res.writeHead(404, header);
                                }
                                res.end();
                                break;
                            case 'PUT':
                                // @ts-ignore
                                if (obj[key]) {
                                    data = '';
                                    // @ts-ignore
                                    req.on('data', function (chunk: any) {
                                        data += chunk;
                                    });
                                    req.on('end', function () {
                                        try {
                                            // @ts-ignore
                                            obj[key] = JSON.parse(data);
                                            res.writeHead(200, header);
                                            // @ts-ignore
                                            console.log('PUT', key, obj[key], 'from ' + remoteAddress);
                                        } catch (e) {
                                            // @ts-ignore
                                            res.writeHead(400, e.message);
                                        }
                                        res.end();
                                    });
                                } else {
                                    res.writeHead(403, header);
                                    res.end();
                                }
                                break;
                            case 'DELETE':
                                // @ts-ignore
                                if (obj[key]) {
                                    // @ts-ignore
                                    delete obj[key];
                                    res.writeHead(200, header);
                                    // @ts-ignore
                                    console.log('DELETE', key, obj[key], 'from ' + remoteAddress);
                                } else {
                                    res.writeHead(404, header);
                                }
                                res.end();
                                break;
                        }
                        req.setTimeout(5000);

                        req.on('timeout', function () {
                            console.log('request timed out');
                            req.abort();
                        });

                        // @ts-ignore
                        req.on('error', function (err: { code: string; message: string; }) {
                            console.log('Error: ' + err.code + ', ' + err.message);
                        });
                    });

                    server.on('error', function (e: { message: any; }) {
                        console.log('Server Error', e.message);
                    });

                    server.on('clientError', function (e: { message: any; }) {
                        console.log('Client Error', e.message);
                    })

                    server.listen(port, function () {
                        console.log('listening on ' + port);
                    });

                    // https://nodejs.org/api/process.html#warning-using-uncaughtexception-correctly
                    process.on('uncaughtExceptionMonitor', (err: { message: any; }, origin: any) => {
                        // @ts-ignore
                        MyMonitoringTool.logSync(err, origin);
                        // @ts-ignore
                        throw new error(err.message);
                    });

                } else {
                    console.log('Password is incorrect');
                }
            } else {
                console.log('File Not Found ' + `${json_data}`);
            }
        } catch (error) {
            console.error('Error: ', error);
            process.exit(1);
        }
    }
}

const environ = new Env();
environ.run().then();
