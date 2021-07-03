import { youtubeAPI } from './youtubeDataQuery';

const data=new youtubeAPI()
console.log("hddi")
data.getVideoStatistics().then((response)=>{
    console.log(response)
})