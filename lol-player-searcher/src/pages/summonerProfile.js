import React from "react";
import PlayerProfile from "../components/playerProfile";
import MatchesList from '../components/MatchesList.jsx'
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
function SummonerProfile(props) {
    const location=useLocation();
    return (
        <React.Fragment>
        <NavBar />
        <div>
            <PlayerProfile 
                playerProfile={location.state.summonerProfile}
                playerRankInfo={location.state.summonerRankInfo}
                playerRegion={location.state.region}
                API_KEY={location.state.API_KEY}
            />
        </div>
        <div style={{display:'flex',justifyContent:'center'}} >
            <MatchesList 
                region={location.state.region} 
                summonerProfile={location.state.summonerProfile}
                encryptedSummonerId={location.state.summonerProfile.id}
                API_KEY={location.state.API_KEY} 
            />
        </div>
        </React.Fragment> 

     );
}


export default SummonerProfile;
 


