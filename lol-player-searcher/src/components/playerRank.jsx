import React,{Component} from "react";

// player who played flex rank doraemon
function PlayerRank(props) { 
    return ( 
        <div className="rank" >
            <div className='solo-rank'></div>
            <h2> Rank </h2>
            <h3>{props.playerRankInfo[0].tier} {props.playerRankInfo[0].rank} (solo)</h3>
            <h4 > {props.playerRankInfo[0].leaguePoints} LP {props.playerRankInfo[0].inactive===true?'(inactive)':null}</h4>
            <img width='100' height='100'  src={props.playerRankInfo.length!==0 ? 
                require(`../img/ranked-emblems/Emblem_${props.playerRankInfo[0].tier[0]}${props.playerRankInfo[0].tier.
                replace(props.playerRankInfo[0].tier[0],'').
                toLowerCase()}.png`) : null} ></img>
            {props.playerRankInfo[1]!==undefined?
                <div className="flex-rank">
                    <h3>{props.playerRankInfo[1].tier} {props.playerRankInfo[1].rank} (flex)</h3>
                    <h4 > {props.playerRankInfo[1].leaguePoints} LP {props.playerRankInfo[1].inactive===true?'(inactive)':null} </h4>
                    <img width='100' height='100' src={props.playerRankInfo.length!==0 ? 
                        require(`../img/ranked-emblems/Emblem_${props.playerRankInfo[1].tier[0]}${props.playerRankInfo[1].tier.
                        replace(props.playerRankInfo[1].tier[0],'').
                        toLowerCase()}.png`) : null} ></img>
                </div>

                :null
            }
        </div>  
        );
}

export default PlayerRank;