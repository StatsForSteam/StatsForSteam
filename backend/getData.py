import json, datetime
from urllib.request import urlopen
from flask import request, session
from flask_mysqldb import MySQL

mysql = MySQL()

#Loading the API Key
with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)

key = SteamAPIJson["STEAMAPIKEY"]

def steamid():
    if 'SteamID' in session:
        return str(session['SteamID'])
    return ('Error')

def getUserData():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + key + "&steamids=" + steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    username = data_json['response']['players'][0]['personaname']
    pfp = data_json['response']['players'][0]['avatarfull'] 
    return username, pfp   

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
    
def getAchievements():
    data = request.get_json()
    appid = data['appid']
    hasAchievements = data['hasAchievements']
    #URL2 is for player count
    url2 = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=" + key + "&appid=" + str(appid)

    if not hasAchievements:
        # Return only the player count when hasAchievements is False
        data_json2 = json.loads(urlopen(url2).read())
        return json.dumps({"playerCount": data_json2['response']['player_count']})

    #URL is for achievements
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
    #URL3 is for achievement percentages
    url3 = "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?access_token="+key+"&gameid=+"+str(appid)
    data_json = json.loads(urlopen(url).read())
    data_json2 = json.loads(urlopen(url2).read())
    data_json3 = json.loads(urlopen(url3).read())
    achieved = []
    notachieved = []
    icons = getUnlockedIcons(str(appid))
    greyIcons = getLockedIcons(str(appid))
    j=0
    for i in data_json['playerstats']['achievements']:
        for k in data_json3['achievementpercentages']['achievements']:
            if(i['apiname'] == k['name']):
                if(i['achieved'] == 1):
                    achieved.append([i['name'],i['description'],icons[j],round(k['percent'],1),True])
                else:
                    notachieved.append([i['name'],i['description'],greyIcons[j],round(k['percent'],1),False])
        j+=1
    return json.dumps({"achieved":achieved, "notachieved":notachieved, "total":j, "achievedlength": len(achieved), "notachievedlength": len(notachieved),"achievementPercentage":  int((len(achieved)/j*100)), "playerCount": data_json2['response']['player_count']}, ensure_ascii=False)

def getDashboard():
    data = request.get_json()
    appid = data['appid']
    hasAchievements = data['hasAchievements']
    #URL2 is for player count
    url2 = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=" + key + "&appid=" + str(appid)
    if not hasAchievements:
        # Return only the player count when hasAchievements is False
        data_json2 = json.loads(urlopen(url2).read())
        return json.dumps({"playerCount": data_json2['response']['player_count']})
    #URL is for achievements
    url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
    data_json = json.loads(urlopen(url).read())
    data_json2 = json.loads(urlopen(url2).read())
    j=0
    k=0

    for i in data_json['playerstats']['achievements']:
        if(i['achieved'] == 1):
            j+=1
        else:
            k+=1
    return json.dumps({"achievedlength": j, "notachievedlength": k,"achievementPercentage":  int((j/(j+k)*100)), "playerCount": data_json2['response']['player_count']}, ensure_ascii=False)

#Gets all the info for each gamecard [title,appid,headerurl]
def getUserGames():
    appID = "temp"
    recentGames = []
    playedGames = []
    notPlayedGames = []
    headerurl = "https://steamcdn-a.akamaihd.net/steam/apps/"+appID+"/header.jpg"
    data_json = json.loads(urlopen("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()+"&include_played_free_games=true&include_appinfo=true&format=json").read())
    for i in data_json['response']['games']:
            #if the game has not been pla)yed
            if(i['playtime_forever'] == 0):
                notPlayedGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])),0,0,hasAchievements(i)])
            #if the game has been played but not in the last 2 weeks
            elif('playtime_2weeks' not in i):
                playedGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])), round(i['playtime_forever']/60,1),0,get_date_from_unix_timestamp(i["rtime_last_played"]),hasAchievements(i)])
            #if the game has been played in the last 2 weeks
            else:
                recentGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])), round(i['playtime_forever']/60,1),round(i['playtime_2weeks']/60,1),get_date_from_unix_timestamp(i["rtime_last_played"]),hasAchievements(i)])
    playedGames.sort(key=lambda x: x[3], reverse=True)
    recentGames.sort(key=lambda x: x[3], reverse=True)
    return json.dumps({"notPlayedGames" : notPlayedGames, "playedGames" : playedGames, "recentGames" : recentGames}, ensure_ascii=False)

def get_date_from_unix_timestamp(seconds):
    result_date = datetime.datetime(1970, 1, 1) + datetime.timedelta(seconds=seconds)
    day_formatted = result_date.strftime("%B %e, %Y").replace('  ', ' ').strip()
    return day_formatted

def hasAchievements(json):
    if("has_community_visible_stats" in json):
        return True
    return False