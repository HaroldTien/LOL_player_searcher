
import React, { PureComponent ,Component} from 'react';
import axios from 'axios'
import Urls from '../urls';
import '../css/matchlist.css'


class MatchesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            puuid:this.props.puuid,
            matchesData_arr:new Array(),
            pagesCounter:0,
        };
    }
    

    getRankedData=async(start)=>{
      let data={
        matchesId_arr:new Array(),
        matchesData_arr:new Array()
      }
        const requestMatchesListUrl=`https://${Urls.getRealmRouter(this.props.region)}/lol/match/v5/matches/by-puuid/${this.props.summonerProfile.puuid}/ids?api_key=${this.props.API_KEY}&count=10&start=${start}`
        console.log(requestMatchesListUrl)
        try{
            const resp=await axios.get(requestMatchesListUrl);
            data.matchesId_arr=await resp.data; 
            for(let i=0;i<data.matchesId_arr.length;i++){
                const requestMatchDataUrl=`https://${Urls.getRealmRouter(this.props.region)}/lol/match/v5/matches/${data.matchesId_arr[i]}?api_key=${this.props.API_KEY}`;
                const resp=await axios.get(requestMatchDataUrl);
                data.matchesData_arr.push(resp.data);
            }
        }catch(e){
            console.log(e)
        }
        data.matchesData_arr=this.state.matchesData_arr.concat(data.matchesData_arr);
        this.setState(prev=>prev.matchesData_arr=data.matchesData_arr);
    }

    componentWillMount () {
        this.getRankedData(0);
    }
    unicodeToChar(text) {
        return text.replace(/\\u[\dA-F]{4}/gi, 
               function (match) {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
               });
    }
    gameContent_component=(match)=>{
        const getSummonerMatchData=()=>{
            const summoners_arr=[...match.info.participants];
            for(let i=0;i<summoners_arr.length;i++){
                 
                if(this.unicodeToChar(summoners_arr[i].summonerName)===this.props.summonerProfile.name){
                    return summoners_arr[i];
                }
            }
        }
        const getDateFromUnixTime=()=>{
            const date=new Date(match.info.gameStartTimestamp);
            let hours=date.getHours().toString();
            let minutes=date.getMinutes().toString();
            let seconds=date.getSeconds().toString();
            return `${date.toLocaleDateString('zh-TW')} ${hours}:${minutes}:${seconds}`;
        }
        return(
            <div className='gamecontent' style={{backgroundColor:getSummonerMatchData().win===true?"blue":"red"}} >
                {match.info.gameMode}
                <img  width={40} height={40} src={Urls.champAvatar(getSummonerMatchData().championName)}></img>
                <p>{Math.floor(match.info.gameDuration/60)} minutes and {match.info.gameDuration%60} seconds</p>
                <p>{getDateFromUnixTime()}</p>
            </div>  
        );
    }
    render() {  
        console.log(this.state.matchesData_arr.length)
        return (
            <div className='container'>
                <div>
                {this.state.matchesData_arr.map((match)=>{
                    return (
                        <ul className='gameslist' key={match.info.gameId}>
                            <li >
                                {this.gameContent_component(match)}
                            </li>
                        </ul>
                    )
                })}
                </div>

                <div>{this.state.matchesData_arr.length!=0?
                    <button onClick={(e)=>{
                        console.log(this.state.pagesCounter);
                        e.currentTarget.disabled=true;
                        this.setState(prev=>prev.pagesCounter=prev.pagesCounter+0.5,
                            ()=>this.getRankedData(this.state.pagesCounter*10));
                        e.currentTarget.disabled=false;    
                        console.log(this.state.pagesCounter);
                    }}>more</button>:null
                }</div>
            </div>
        );
    }
}


 
export default MatchesList;


