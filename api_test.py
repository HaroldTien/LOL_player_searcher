import cassiopeia as cass
import requests 
import json

# kalturi = cass.Summoner(name="Kalturi",region="NA")
# good_with = kalturi.champion_masteries.filter(lambda cm: cm.level >= 6)
# print([cm.champion.name for cm in good_with])


    


class Data:
    
    def __init__(self,summonerName) -> None:
        self.summonerName=summonerName
        self.API_key='RGAPI-51ffad23-f7f3-4bfa-afcc-13f08fdd6fe6'

    def getSummonerData(self):
        api_url='https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+self.summonerName+'?api_key='+self.API_key
        response=requests.get(api_url)
        resp_dict=response.json()
        return resp_dict


    def getMatches(self):
        api_url='https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/'+self.getSummonerData()['puuid']+'/ids'+'?api_key='+self.API_key
        print('apiUrl : '+api_url)
        response=requests.get(api_url)
        resp_dict=response.json()
        return resp_dict
    
    def getMatchData(self,match_num):
        api_url='https://sea.api.riotgames.com/lol/match/v5/matches/'+self.getMatches()[match_num]+'?api_key='+self.API_key
        # print(self.getMatches()[match_num])
        print('apiUrl : '+api_url)
        resp=requests.get(api_url)
        resp_dict=resp.json()
        
        resp_json=json.dumps(resp_dict,indent=4)
        with open ('metch.json','w') as f:
            f.write(resp_json)
        return resp_dict

    def getMatchTimeline(self,match_num):
        api_url='https://sea.api.riotgames.com/lol/match/v5/matches/'+self.getMatches()[match_num]+'/timeline?api_key='+self.API_key
        print(api_url)
        resp=requests.get(api_url)
        resp_dict=resp.json()
        resp_json=json.dumps(resp_dict,indent=4)
        with open ('metchTimeline.json','w') as f:
            f.write(resp_json)
    def getRank(self):
        api_url='https://tw2.api.riotgames.com/lol/league/v4/entries/by-summoner/'+self.getSummonerData()['id']+'?api_key='+self.API_key
        resp=requests.get(api_url)
        print(api_url)
        resp_dict=resp.json()
        # print(resp_dict)
        return resp_dict
    # def getChamp(self):
        # api_url=


data=Data('台服送頭交給我')

# print(data.getSummonerData())
# data.getMatchData(0)        
print(data.getMatchData(1))
# data.getMatchTimeline(0)
# print(data.getSummonerData())

# print(data.getRank())
