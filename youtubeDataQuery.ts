import { google, youtube_v3 } from "googleapis"
export class youtubeAPI {
    youtube: youtube_v3.Youtube;
    params;
    constructor() {
        this.youtube = google.youtube({
            version: "v3",
            auth: 'AIzaSyAKwCfULBImkjAzWrVTeAztFCRiWQnqP5M'
        })
    }
    async getVideoStatistics() {
        return this.youtube.videos.list({
            "part": [
                "id",
                "contentDetails",
                "statistics"
            ],
            "id": [
                "IUL2pIETvJI"
            ]
        })
    }
}