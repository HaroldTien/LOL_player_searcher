import React,{Component} from "react";
import PlayerRank from "./playerRank";
import "../css/playerProfile.css"


class  PlayerProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            rankInfo:this.props.playerRankInfo,
            playerProfile:this.props.playerProfile
        }
    }
    render() { 
        const profileIconSource='http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/'+this.props.playerProfile.profileIconId+'.png';
        return (
            <div className="containter">
                <h3 >Player name : {this.props.playerProfile.name} </h3>
                <h3>Player level : {this.props.playerProfile.summonerLevel}</h3>
                <img   width='100' height='100' style={{border:'3px solid purple'}} src={profileIconSource}></img>
                { this.props.playerRankInfo.length=== 0 ?
                    <h3> Rank : NO RANK</h3>
                    :
                    <PlayerRank playerRankInfo={this.props.playerRankInfo} />
                }
            </div>
        );
    }
}

 
export default PlayerProfile;
