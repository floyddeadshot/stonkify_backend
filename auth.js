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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authUser = void 0;
var googleapis_1 = require("googleapis");
var server_destroy_1 = __importDefault(require("server-destroy"));
var url_1 = __importDefault(require("url"));
var http_1 = __importDefault(require("http"));
var open_1 = __importDefault(require("open"));
//Useful links:
//activate youtube analytics for project https://console.cloud.google.com/home/dashboard?project=stonkify-318719&folder=&organizationId=
//add oauth2 client -> give clientID etc. https://github.com/googleapis/google-api-nodejs-client#oauth2-client
// API ref:
//https://developers.google.com/youtube/analytics/reference/
//https://developers.google.com/youtube/reporting/guides/authorization
//Code ref: https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/oauth2.js
//and https://developers.google.com/youtube/v3/quickstart/nodejs
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'stonkify.json';
var SCOPES = [
    'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',
    'https://www.googleapis.com/auth/yt-analytics.readonly',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtubepartner'
];
var authUser = /** @class */ (function () {
    function authUser() {
        this.applicationOAuth2Client = new googleapis_1.google.auth.OAuth2("96120255423-74jjno4j6fvbejbbefcit5eutt42qt7h.apps.googleusercontent.com", "PV4FuA4btsXg1YntT8chFMgq", "http://localhost:3000/oauth2callback");
    }
    authUser.prototype.getCredentials = function () {
        return this.applicationOAuth2Client;
    };
    //stores token on the disc
    authUser.prototype.storeToken = function () {
        /*try {
          fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
          if (err.code != 'EEXIST') {
            throw err;
          }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(this.applicationOAuth2Client.credentials), (err) => {
          if (err) throw err;
          console.log('Token stored to ' + TOKEN_PATH);
        });
      */
    };
    authUser.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateNewToken()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    authUser.prototype.generateNewToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // grab the url that will be used for authorization
                        var authorizeUrl = _this.applicationOAuth2Client.generateAuthUrl({
                            access_type: 'offline',
                            scope: SCOPES.join(' ')
                        });
                        var server = http_1["default"].createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                            var qs, tokens, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        if (!(req.url.indexOf('/oauth2callback') > -1)) return [3 /*break*/, 2];
                                        qs = new url_1["default"].URL(req.url, 'http://localhost:3000')
                                            .searchParams;
                                        res.end('Authentication successful! Please return to the console.');
                                        server.close();
                                        return [4 /*yield*/, this.applicationOAuth2Client.getToken(qs.get('code'))];
                                    case 1:
                                        tokens = (_a.sent()).tokens;
                                        this.applicationOAuth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
                                        this.storeToken();
                                        resolve(this.applicationOAuth2Client);
                                        _a.label = 2;
                                    case 2: return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        reject(e_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })
                            .listen(3000, function () {
                            // open the browser to the authorize url to start the workflow
                            open_1["default"](authorizeUrl, { wait: false }).then(function (cp) { return cp.unref(); });
                        });
                        server_destroy_1["default"](server);
                    })];
            });
        });
    };
    return authUser;
}());
exports.authUser = authUser;
