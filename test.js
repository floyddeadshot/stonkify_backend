"use strict";
exports.__esModule = true;
var auth_1 = require("./auth");
var youtubeDataQuery_1 = require("./youtubeDataQuery");
var video_id = "IUL2pIETvJI";
//Youtube v3 API
var data = new youtubeDataQuery_1.youtubeAPI();
/*
data.getVideoStatistics(video_id).then((response)=>{
    console.log(response)
})*/
//Youtube Analytics API
//ref: https://developers.google.com/youtube/analytics/reference/
var creator = new auth_1.authUser();
creator.authenticate().then(function () {
    //Now query data
    //https://developers.google.com/youtube/analytics/content_owner_reports#video-reports
    console.log(creator.getCredentials());
    //data.getVideoAdRevenue(creator.getCredentials(),video_id)
});
