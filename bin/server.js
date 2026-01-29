import http from 'http';
import {existsSync, readFileSync} from 'node:fs';
import process from 'node:process';

const json_data = '../json/types.json'

async function typeserver() {
    try {
        if (existsSync(`${json_data}`)) {
            const data = await JSON.parse(readFileSync(`${json_data}`, 'utf8'));
            if (data["password"] === process.argv[3]) {
                const mask = process.argv[2];
                const port = process.env.PORT || mask;
                let obj = {};
                const server = await http.createServer(function (req, res) {
                    let data;
                    // noinspection JSDeprecatedSymbols
                    const remoteAddress = req.connection.remoteAddress;
                    const header = {'Connection': 'close', 'Content-Length': 0};
                    const key = req.url;
                    switch (req.method) {
                        case 'POST':
                            if (obj[key]) {
                                res.writeHead(403, header);
                                res.end();
                            } else {
                                data = '';
                                req.on('data', function (chunk) {
                                    data += chunk;
                                })
                                req.on('end', function () {
                                    try {
                                        obj[key] = JSON.parse(data);
                                        res.writeHead(200, header);
                                        console.log('POST', key, obj[key], 'from ' + remoteAddress);
                                    } catch (e) {
                                        res.writeHead(400, e.message, header);
                                    }
                                    res.end();
                                });
                            }
                            break;
                        case 'GET':
                            if (obj[key]) {
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
                            if (obj[key]) {
                                data = '';
                                req.on('data', function (chunk) {
                                    data += chunk;
                                });
                                req.on('end', function () {
                                    try {
                                        obj[key] = JSON.parse(data);
                                        res.writeHead(200, header)
                                        console.log('PUT', key, obj[key], 'from ' + remoteAddress);
                                    } catch (e) {
                                        res.writeHead(400, e.message, header);
                                    }
                                    res.end();
                                });
                            } else {
                                res.writeHead(403, header);
                                res.end();
                            }
                            break;
                        case 'DELETE':
                            if (obj[key]) {
                                delete obj[key];
                                res.writeHead(200, header);
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
                        req.abort()
                    });

                    req.on('error', function (err) {
                        console.log('Error: ' + err.code + ', ' + err.message);
                    });
                });

                server.on('error', function (e) {
                    console.log('Server Error', e.message);
                });

                server.on('clientError', function (e) {
                    console.log('Client Error', e.message);
                })

                server.listen(port, function () {
                    console.log('listening on ' + port);
                });

                // https://nodejs.org/api/process.html#warning-using-uncaughtexception-correctly
                process.on('uncaughtExceptionMonitor', (err, origin) => {
                    MyMonitoringTool.logSync(err, origin);
                });

            } else {
                console.log('Password is incorrect');
            }
        } else {
            console.log('File Not Found ' + `${json_data}`);
        }
    } catch (error) {
        console.error('Error: ', error);
    } finally {
        global.gc();
    }
}

typeserver().then()
