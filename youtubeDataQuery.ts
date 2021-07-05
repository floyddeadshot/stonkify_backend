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
        const analyticsAPI=google.youtubeAnalytics({
            version:"v2",
            auth:OAuth2Client
        })
        analyticsAPI.reports.query({
            dimensions:"day",
            filters: `video==${video_id}`,
            metrics:'views ,estimatedRevenue, estimatedAdRevenue, grossRevenue, estimatedRedPartnerRevenue, monetizedPlaybacks, playbackBasedCpm, adImpressions, cpm'
        })
    }
}