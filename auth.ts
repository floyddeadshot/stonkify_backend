import { google } from 'googleapis';
import destroyer from 'server-destroy'
import url from 'url';
import http from 'http'
import open from 'open'
import {promises as fs} from 'fs'
//Useful links:
//activate youtube analytics for project https://console.cloud.google.com/home/dashboard?project=stonkify-318719&folder=&organizationId=
//add oauth2 client -> give clientID etc. https://github.com/googleapis/google-api-nodejs-client#oauth2-client

// API ref:
//https://developers.google.com/youtube/analytics/reference/
//https://developers.google.com/youtube/reporting/guides/authorization

//Code ref: https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/oauth2.js
//and https://developers.google.com/youtube/v3/quickstart/nodejs
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'stonkify.json';
const SCOPES = [
  'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtubepartner'

];
export class authUser{
  applicationOAuth2Client:any//cant find type OAuth2Client
  constructor(){
    this.applicationOAuth2Client=new google.auth.OAuth2(
      "96120255423-74jjno4j6fvbejbbefcit5eutt42qt7h.apps.googleusercontent.com",
      "PV4FuA4btsXg1YntT8chFMgq",
      "http://localhost:3000/oauth2callback"
    )
  }
  getCredentials(){
    return this.applicationOAuth2Client;
  }
  //stores token on the disc
  storeToken(){
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
  }
  async authenticate() {
    await this.generateNewToken();
    // Check if we have previously stored a token.
    /*await readFile(TOKEN_PATH, "utf8",(err, token)=> {
      if (err) {
        this.generateNewToken();
      } else {
        this.applicationOAuth2Client.credentials = JSON.parse(token);
      }
    });*/
  }

  async generateNewToken(){
    return new Promise((resolve, reject) => {
      // grab the url that will be used for authorization
      const authorizeUrl = this.applicationOAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES.join(' '),
      });
      const server = http.createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              const qs = new url.URL(req.url, 'http://localhost:3000')
                .searchParams;
              res.end('Authentication successful! Please return to the console.');
              server.close();
              const {tokens} = await this.applicationOAuth2Client.getToken(qs.get('code'));
              this.applicationOAuth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
              this.storeToken()
              resolve(this.applicationOAuth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(3000, () => {
          // open the browser to the authorize url to start the workflow
          open(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
      destroyer(server);
    });
  }
}