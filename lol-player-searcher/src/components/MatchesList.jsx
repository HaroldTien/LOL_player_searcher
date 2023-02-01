
import React, { PureComponent ,Component} from 'react';
import axios from 'axios'
import Urls from '../urls';
import '../css/matchlist.css'


class MatchesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            puuid:this.props.puuid,
            matchesId_arr:null,
            matchesData_arr:new Array(),
        };
    }
    getRankedData=async()=>{
      let data={
        matchesId_arr:new Array(10),
        matchesData_arr:new Array(10)
      }
        const requestMatchesListUrl=`https://${Urls.getRealmRouter(this.props.region)}/lol/match/v5/matches/by-puuid/${this.props.summonerProfile.puuid}/ids?api_key=${this.props.API_KEY}&count=10`
        console.log(requestMatchesListUrl)
        try{
            const resp=await axios.get(requestMatchesListUrl);
            data.matchesId_arr=await resp.data; 
        }catch(e){
            console.log(e)
        }
        try{
            for(let i=0;i<data.matchesId_arr.length;i++){
                const requestMatchDataUrl=`https://${Urls.getRealmRouter(this.props.region)}/lol/match/v5/matches/${data.matchesId_arr[i]}?api_key=${this.props.API_KEY}`;
                const resp=await axios.get(requestMatchDataUrl);
                data.matchesData_arr.push(resp.data);
            }
        }catch(e){
            console.log(e)
        }
        this.setState(prev=>prev.matchesData_arr=data.matchesData_arr);
        this.setState(prev=>prev.matchesId_arr=data.matchesId_arr)
    }

    componentWillMount () {
        this.getRankedData();
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
        return(
            <div className='gamecontent' style={{backgroundColor:getSummonerMatchData().win===true?"blue":"red"}} >
                {match.info.gameMode}
                <img  width={20} height={20} src={Urls.champAvatar(getSummonerMatchData().championName)}></img>
            </div>  
        );
    }
    
    render() {  

        return (
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
        );
    }
}


 
export default MatchesList;


