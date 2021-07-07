import { google, youtube_v3 } from "googleapis"
export class youtubeAPI {
    //should be refactored. class structure doesnt make sense atm
    youtube: youtube_v3.Youtube;
    params;
    constructor() {
        this.youtube = google.youtube({
            version: "v3",
            auth: 'AIzaSyAKwCfULBImkjAzWrVTeAztFCRiWQnqP5M'
        })
    }
    async getVideoStatistics(video_id) {
        return this.youtube.videos.list({
            "part": [
                "id",
                "contentDetails",
                "statistics"
            ],
            "id": [
               video_id 
            ]
        })
    }
    async getVideoAdRevenue(OAuth2Client,video_id){
        //more info:https://developers.google.com/youtube/analytics/reference/reports/query?apix_params=%7B%22endDate%22%3A%22nn%22%7D
        //console.log(OAuth2Client)
        google.options({auth:OAuth2Client})
        const analyticsAPI=google.youtubeAnalytics({
            version:"v2",
            auth:OAuth2Client
        })
        analyticsAPI.reports.query({
            auth:OAuth2Client,
            endDate:'2021-07-10',
            startDate:'2021-01-01',
            dimensions:"day",
            ids:'channel==MINE',
            //filters: `video==${video_id}`,
            metrics:'views,averageViewDuration'//These lead to forbidden: estimatedRevenue,estimatedAdRevenue,grossRevenue,estimatedRedPartnerRevenue,monetizedPlaybacks,playbackBasedCpm,adImpressions,cpm'
            //probably as we are not registred to show ads?
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.error(err)
        })
    }
}