import json
from urllib.request import urlopen
from flask import request, session, g

#Loading the API Key
with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)

def steamid():
    from main import app
    with app.app_context():
        return(session['id'])

#appid = "252950"
#Steamid = "76561198833526844"
#key = "047B197FC03B9D958391FCE24289B157"
appid = "252950"
key = SteamAPIJson["STEAMAPIKEY"]

#GETS THE NAME OF A USER FROM THEIR STEAMID
def getUserName():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    username = {"username" : data_json['response']['players'][0]['personaname']}
    return json.dumps(username)
#print(getUserName())

#GETS THE PROFILE PICTURE OF A USER FROM THEIR STEAMID
def getUserProfilePicture():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    pfp = {"pfp" : data_json['response']['players'][0]['avatarfull']}
    return json.dumps(pfp)
    
#print(getUserProfilePicture())

def getUnlockedIcons(appid):
    url = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+key+"&appid="+appid
    response = urlopen(url)
    data_json = json.loads(response.read())
    k = 0
    icons = []
    for i in data_json['game']['availableGameStats']['achievements']:
        icons.append(data_json['game']['availableGameStats']['achievements'][k]['icon'])
        k += 1
    return icons
#print(getAchievementIcon2("311210")[1])

#RETURNS LOCKED/GREYED OUT ACHIEVMENT ICON URL
def getLockedIcons(appid):
    url = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+key+"&appid="+appid
    response = urlopen(url)
    data_json = json.loads(response.read())
    k = 0
    greyIcons = []
    for i in data_json['game']['availableGameStats']['achievements']:
        greyIcons.append(data_json['game']['availableGameStats']['achievements'][k]['icongray'])
        k += 1
    return greyIcons
#print(getLockedIcons("311210"))

#GETS ACHIEVEMENTS FOR A SPECIFIC USER IN A SPECIFIC GAME
def getAchievements():
    appid = request.get_json()
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
    response = urlopen(url)
    data_json = json.loads(response.read())
    achieved = []
    notachieved = []
    icons = getUnlockedIcons(str(appid))
    greyIcons = getLockedIcons(str(appid))
    j=0
    for i in data_json['playerstats']['achievements']:
        if(i['achieved'] == 1):
            achieved.append([i['name'],i['description'],icons[j]])
        else:
            notachieved.append([i['name'],i['description'],greyIcons[j]])
        j+=1
    return json.dumps({"achieved":achieved, "notachieved":notachieved, "total":j, "achievedlength": len(achieved), "notachievedlength": len(notachieved)}, ensure_ascii=False)

def getAchievementAmounts():
    appid = request.get_json()
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
    response = urlopen(url)
    data_json = json.loads(response.read())
    j=0
    k=0
    for i in data_json['playerstats']['achievements']:
        if(i['achieved'] == 1):
            j+=1
        else:
            k+=1
    return json.dumps({"achieved":j, "notachieved":k}, ensure_ascii=False)

#Gets a list of all the games a user owns and their app id's
def getUserGames():
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()+"&include_played_free_games=true&include_appinfo=true&format=json"
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
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()+"&include_played_free_games=true&include_appinfo=true&format=json"
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
    url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()
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