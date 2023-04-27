import json
from urllib.request import urlopen

# Loading the API Key
#with open('SteamAPI.json') as SteamAPIFile:
    #SteamAPIJson = json.load(SteamAPIFile)

#sample data using  steamid and rocket leauge
steamid = "76561198833526844"
appid = "252950"
#key = SteamAPIJson["STEAMAPIKEY"]
key = "047B197FC03B9D958391FCE24289B157"

#GETS THE NAME OF A USER FROM THEIR STEAMID
def getUserName():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid
    response = urlopen(url)
    data_json = json.loads(response.read())
    username = {"username" : data_json['response']['players'][0]['personaname']}
    return json.dumps(username)
#print(getUserName())

#GETS THE PROFILE PICTURE OF A USER FROM THEIR STEAMID
def getUserProfilePicture():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid
    response = urlopen(url)
    data_json = json.loads(response.read())
    pfp = {"pfp" : data_json['response']['players'][0]['avatarfull']}
    return json.dumps(pfp)
    
#print(getUserProfilePicture())

#GETS ACHIEVEMENTS FOR A SPECIFIC USER IN A SPECIFIC GAME
def getAchievments(appid, steamid, key):
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+appid+"&key="+key+"&steamid=" + steamid
    response = urlopen(url)
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
#print(achieved, notachieved)


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
#greyIconURL = getLockedAchievmentIcon(appid, key2, "Trifecta")
#print(greyIconURL)


#Gets a list of all the games a user owns and their app id's
def getUserGames():
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid+"&include_played_free_games=true&include_appinfo=true&format=json"
    response = urlopen(url)
    data_json = json.loads(response.read())
    games = []
    for i in data_json['response']['games']:
        games.append([i['name'], i['appid']])
    games = json.dumps({"games" : games})
    return games
#print(getUserGames())

#Gets a list off all urls for the header images of the games a user owns. These match index of above function
def getUserGamesHeaders():
    appID = "temp"
    url = "https://steamcdn-a.akamaihd.net/steam/apps/"+appID+"/header.jpg"
    gameIDs = getUserGames()
    gameIDs = json.loads(gameIDs)
    gameIDs = gameIDs['games']
    gameURLs = []
    for i in gameIDs:
        gameURLs.append(url.replace(appID, str(i[1])))
    gameURLs = json.dumps({"gameHeaders":gameURLs})
    return gameURLs
#print(getUserGamesHeaders())


def getNumberOfGames():
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid+"&include_played_free_games=true&include_appinfo=true&format=json"
    response = urlopen(url)
    data_json = json.loads(response.read())
    GamesOwned = {"GamesOwned" : data_json['response']['game_count'] }
    return json.dumps(GamesOwned)

#print(getNumberOfGames())


















#this stuff below I am having trouble with
#i am trying to get an array with [name of game, playtime]
#right now we have [appid, playtime]

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








