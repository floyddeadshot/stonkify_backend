import { authUser } from './auth';
import { youtubeAPI } from './youtubeDataQuery';

let video_id="IUL2pIETvJI";
//Youtube v3 API
const data=new youtubeAPI()
/*
data.getVideoStatistics(video_id).then((response)=>{
    console.log(response)
})*/

//Youtube Analytics API
//ref: https://developers.google.com/youtube/analytics/reference/

const creator=new authUser()
creator.authenticate().then(()=>{
    //Now query data
    //https://developers.google.com/youtube/analytics/content_owner_reports#video-reports
    console.log(creator.getCredentials())
    //data.getVideoAdRevenue(creator.getCredentials(),video_id)
})
