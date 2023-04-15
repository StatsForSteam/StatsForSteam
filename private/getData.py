
import json
from urllib.request import urlopen

#sample data
steamid = "76561198124232839"
appid = "252950"
key = "5C64A7A9201C80E03A4895782AED6716"

#GETS ACHIEVEMENTS FOR A SPECIFIC USER IN A SPECIFIC GAME
def getAchievments(appid, steamid, key):
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+appid+"&key="+key+"&steamid=" + steamid
    # store the response of URL
    response = urlopen(url)
    # storing the JSON response from URL into data
    data_json = json.loads(response.read())
    achieved = []
    notachieved = []
    for i in data_json['playerstats']['achievements']:
        if(i['achieved'] == 1):
            achieved.append(i['apiname'])
        else:
            notachieved.append(i['apiname'])

    return achieved, notachieved
#achieved, notachieved = getAchievments(appid, steamid, key)



#RETURNS UNLOCKED ACHIEVMENT ICON URL
def getAchievmentIcon(appid, key, achievmentName):
    url = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+key+"&appid="+appid
    response = urlopen(url)
    data_json = json.loads(response.read())
    k = 0
    for i in data_json['game']['availableGameStats']['achievements']:
        if(i['name'] == achievmentName):
            return data_json['game']['availableGameStats']['achievements'][k]['icon']
        k += 1

#iconURL = getAchievmentIcon(appid, key, "TheStreak")
#print(iconURL)


#RETURNS LOCKED/GREYED OUT ACHIEVMENT ICON URL
def getLockedAchievmentIcon(appid, key, achievmentName):
    url = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+key+"&appid="+appid
    response = urlopen(url)
    data_json = json.loads(response.read())
    k = 0
    for i in data_json['game']['availableGameStats']['achievements']:
        if(i['name'] == achievmentName):
            return data_json['game']['availableGameStats']['achievements'][k]['icongray']
        k += 1

greyIconURL = getLockedAchievmentIcon(appid, key, "TheStreak")
print(greyIconURL)








#this stuff below I am having trouble with
#i am trying to get an array with [name of game, playtime]
#right now we have [appid, playtime]




#GETS THE NAME OF A GAME FROM ITS APPID
def getGameName(appid, key):
    url = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+key+"&appid="+appid
    response = urlopen(url)
    data_json = json.loads(response.read())
    return str(data_json['game']['gameName'])
#print(getGameName(appid, key))



#GETS ALL GAMES AND THEIR PLAYTIMES FOR A SPECIFIC USER
def getOwnedGamesTimes(steamid, key):
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid
    response = urlopen(url)
    data_json = json.loads(response.read())
    gameAndTimes = []
    for i in data_json['response']['games']:
        #id = str(i['appid'])
        #print(id)
        #name = getGameName(id, key)
        gameAndTimes.append([str(i['appid']), i['playtime_forever']])
        #gameAndTimes.append([name, i['playtime_forever']])
    return gameAndTimes
#gameAndTimes = getOwnedGamesTimes(steamid, key)








