
import React,{Component, useEffect, useMemo, useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Urls from '../urls'
import NavBar from "../components/NavBar";
import '../css/home.css'
const API_KEY='RGAPI-51ffad23-f7f3-4bfa-afcc-13f08fdd6fe6';



const Home =() =>{
  
  const [summonerName,setsummonerName]=useState(null);
  const [region,setRegion]=useState('TW2');
  const navigator=useNavigate();
  const searchForPlayer= async (player)=>{
    var playerData={
      playerProfile:null,
      playerRankInfo:null,
    }
    console.log(player+' has been searched');
    const summonerApiCallString=`https://${Urls.getRegionRouter(region)}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`;
    try{
      const resp=await axios.get(summonerApiCallString);
      playerData.playerProfile= await resp.data;
    }catch(e){
      console.log("Error URL : "+summonerApiCallString);
      console.log(e);
      navigator("/ErrorPage");
      return 0;
    }
    try{
      const summonerRankCallString='https://'+Urls.getRegionRouter(region)+'/lol/league/v4/entries/by-summoner/'+playerData.playerProfile.id+'?api_key='+API_KEY
      const resp=await axios.get(summonerRankCallString);
      playerData.playerRankInfo=resp.data;
    }catch(e){
      console.log(e);
    }
    console.log(playerData.playerRankInfo)
    navigator('/summonerProfile',{state:{
      summonerProfile:playerData.playerProfile,
      summonerRankInfo:playerData.playerRankInfo,
      region:region,
      API_KEY:API_KEY,
    }});
  
  }
  return (  
    <React.Fragment>
      <NavBar />
      <div  className="searcher-container">
        <h1 >League of lagends player searcher</h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          searchForPlayer(summonerName)}}>
          <select  name="regions" id="regions-selector" defaultValue={region} 
          onChange={(e)=>{
            setRegion(prev=>prev=e.target.value);
          }} >
            <option value='OC1'>OCE</option>
            <option value='TW2'>TW</option>
          </select>
          <input id="searchInput" type={'text'} onChange={(e)=>setsummonerName((prev)=>prev=e.target.value)} ></input>
          <button id="searchButton" type="summit" >Search</button>
        </form>
      </div>      
    </React.Fragment>
  );
}
export default Home;
 

