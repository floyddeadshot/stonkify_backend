"use strict";
exports.__esModule = true;
var youtubeDataQuery_1 = require("./youtubeDataQuery");
var data = new youtubeDataQuery_1.youtubeAPI();
console.log("hddi");
data.getVideoStatistics().then(function (response) {
    console.log(response);
});
