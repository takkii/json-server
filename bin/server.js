"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var http_1 = require("http");
var node_fs_1 = require("node:fs");
// @ts-ignore
var node_process_1 = require("node:process");
var json_data = '../json/types.json';
var Env = /** @class */ (function () {
    function Env() {
    }
    Env.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, mask, port_1, obj_1, server, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 8, 9]);
                        if (!(0, node_fs_1.existsSync)("".concat(json_data))) return [3 /*break*/, 5];
                        return [4 /*yield*/, JSON.parse((0, node_fs_1.readFileSync)("".concat(json_data), 'utf8'))];
                    case 1:
                        data = _a.sent();
                        if (!(data["password"] === node_process_1.default.argv[3])) return [3 /*break*/, 3];
                        mask = node_process_1.default.argv[2];
                        port_1 = node_process_1.default.env.PORT || mask;
                        obj_1 = {};
                        return [4 /*yield*/, http_1.default.createServer(function (req, res) {
                                var data;
                                // noinspection JSDeprecatedSymbols
                                var remoteAddress = req.connection.remoteAddress;
                                var header = { 'Connection': 'close', 'Content-Length': 0 };
                                var key = req.url;
                                switch (req.method) {
                                    case 'POST':
                                        if (obj_1[key]) {
                                            // @ts-ignore
                                            res.writeHead(403, header);
                                            res.end();
                                        }
                                        else {
                                            data = '';
                                            // @ts-ignore
                                            req.on('data', function (chunk) {
                                                data += chunk;
                                            });
                                            req.on('end', function () {
                                                try {
                                                    obj_1[key] = JSON.parse(data);
                                                    // @ts-ignore
                                                    res.writeHead(200, header);
                                                    console.log('POST', key, obj_1[key], 'from ' + remoteAddress);
                                                }
                                                catch (e) {
                                                    res.writeHead(400, e.message);
                                                }
                                                res.end();
                                            });
                                        }
                                        break;
                                    case 'GET':
                                        if (obj_1[key]) {
                                            var json = JSON.stringify(obj_1[key]);
                                            res.writeHead(200, {
                                                'Content-Length': Buffer.byteLength(json),
                                                'Content-Type': 'application/json',
                                                'Connection': 'close'
                                            });
                                            res.write(json);
                                            console.log('GET', key, 'from ' + remoteAddress);
                                        }
                                        else {
                                            res.writeHead(404, header);
                                        }
                                        res.end();
                                        break;
                                    case 'PUT':
                                        if (obj_1[key]) {
                                            data = '';
                                            // @ts-ignore
                                            req.on('data', function (chunk) {
                                                data += chunk;
                                            });
                                            req.on('end', function () {
                                                try {
                                                    obj_1[key] = JSON.parse(data);
                                                    res.writeHead(200, header);
                                                    console.log('PUT', key, obj_1[key], 'from ' + remoteAddress);
                                                }
                                                catch (e) {
                                                    res.writeHead(400, e.message);
                                                }
                                                res.end();
                                            });
                                        }
                                        else {
                                            res.writeHead(403, header);
                                            res.end();
                                        }
                                        break;
                                    case 'DELETE':
                                        if (obj_1[key]) {
                                            delete obj_1[key];
                                            res.writeHead(200, header);
                                            console.log('DELETE', key, obj_1[key], 'from ' + remoteAddress);
                                        }
                                        else {
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
                                req.on('error', function (err) {
                                    console.log('Error: ' + err.code + ', ' + err.message);
                                });
                            })];
                    case 2:
                        server = _a.sent();
                        server.on('error', function (e) {
                            console.log('Server Error', e.message);
                        });
                        server.on('clientError', function (e) {
                            console.log('Client Error', e.message);
                        });
                        server.listen(port_1, function () {
                            console.log('listening on ' + port_1);
                        });
                        // https://nodejs.org/api/process.html#warning-using-uncaughtexception-correctly
                        node_process_1.default.on('uncaughtExceptionMonitor', function (err, origin) {
                            // @ts-ignore
                            MyMonitoringTool.logSync(err, origin);
                            // @ts-ignore
                            throw new error(err.message);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        console.log('Password is incorrect');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        console.log('File Not Found ' + "".concat(json_data));
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        error_1 = _a.sent();
                        console.error('Error: ', error_1);
                        node_process_1.default.exit(1);
                        return [3 /*break*/, 9];
                    case 8:
                        global.gc();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return Env;
}());
var environ = new Env();
environ.run().then();
