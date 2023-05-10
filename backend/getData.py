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

key = SteamAPIJson["STEAMAPIKEY"]

#GETS THE NAME OF A USER 
def getUserName():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    username = {"username" : data_json['response']['players'][0]['personaname']}
    return json.dumps(username)


#GETS THE PROFILE PICTURE OF A USER 
def getUserProfilePicture():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    pfp = {"pfp" : data_json['response']['players'][0]['avatarfull']}
    return json.dumps(pfp)

#RETURNS UNLOCKED/GREYED OUT ACHIEVMENT ICON URL
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


#Gets all the info for an achievement card
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

#Gets the amount of achievements a user has achieved and not achieved
def getAchievementAmounts():
    appid = request.get_json()
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
    try:
        response = urlopen(url)
        data_json = json.loads(response.read())
    except:
        return json.dumps({"achieved":0, "notachieved":0})
    try:
        j=0
        k=0
        for i in data_json['playerstats']['achievements']:
            if(i['achieved'] == 1):
                j+=1
            k+=1
        return json.dumps({"achieved":j, "notachieved":k}, ensure_ascii=False)
    except:
        return json.dumps({"achieved":0, "notachieved":0})

#Gets all the info for each gamecard [title,appid,headerurl]
def getUserGames():
    appID = "temp"
    games = []
    headerurl = "https://steamcdn-a.akamaihd.net/steam/apps/"+appID+"/header.jpg"
    data_json = json.loads(urlopen("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()+"&include_played_free_games=true&include_appinfo=true&format=json").read())
    for i in data_json['response']['games']:
            games.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])), round(i['playtime_forever']/60,1)])
            print(i['playtime_forever'])
    return json.dumps({"games" : games})







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