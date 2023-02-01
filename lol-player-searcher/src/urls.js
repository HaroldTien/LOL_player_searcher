

const Urls={
    getRealmRouter:(region)=>{
        switch(region){
            case "TW2":
                return regions.RegionalRoutingValues['SEA'];
                break;
            case "OC1":
                return regions.RegionalRoutingValues['SEA'];
                break;
        };
    },
    getRegionRouter:(region)=>regions.PlatformRoutingValues[region],
    champAvatar:(champ)=>`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champ}.png`,


}



const regions={
    "RegionalRoutingValues":{
        "AMERICAS":"americas.api.riotgames.com",
        "ASIA":"asia.api.riotgames.com",
        "EUROPE":"europe.api.riotgames.com",
        "SEA":"sea.api.riotgames.com"
    },
    "PlatformRoutingValues":{
        "BR1":"br1.api.riotgames.com",
        "EUN1":"eun1.api.riotgames.com",
        "EUW1":	"euw1.api.riotgames.com",
        "JP1"	:"jp1.api.riotgames.com",
        "KR"	:"kr.api.riotgames.com",
        "LA1"	:"la1.api.riotgames.com",
        "LA2"	:"la2.api.riotgames.com",
        "NA1"	:"na1.api.riotgames.com",
        "OC1"	:"oc1.api.riotgames.com",
        "TR1"	:"tr1.api.riotgames.com",
        "RU"	:"ru.api.riotgames.com",
        "PH2"	:"ph2.api.riotgames.com",
        "SG2"	:"sg2.api.riotgames.com",
        "TH2"	:"th2.api.riotgames.com",
        "TW2"	:"tw2.api.riotgames.com",
        "VN2"	:"vn2.api.riotgames.com"
    }
}


export default Urls;