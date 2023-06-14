import json, jwt
from urllib.request import urlopen
from flask import request, session, g, jsonify
from json import load
import datetime

from flask_mysqldb import MySQL

mysql = MySQL()

#Loading the API Key
with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)

def steamid():
    if 'SteamID' in session:
        return str(session['SteamID'])
    return ('Error')

key = SteamAPIJson["STEAMAPIKEY"]

def getUserData():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + key + "&steamids=" + steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    username = data_json['response']['players'][0]['personaname']
    pfp = data_json['response']['players'][0]['avatarfull'] 
    return username, pfp   

def manageUsers():
    username, pfp = getUserData()
    steamID = steamid()  
    cursor = mysql.connection.cursor()

    # Check if steamID already exists in the database
    query = "SELECT name, pfp FROM users WHERE steamid = %s"
    cursor.execute(query, (steamID,))
    result = cursor.fetchone()

    if result:
        # SteamID already exists, compare name and pfp
        db_name, db_pfp = result

        if db_name != username or db_pfp != pfp:
            # Name or pfp differs, update the database
            update_query = "UPDATE users SET name = %s, pfp = %s WHERE steamid = %s"
            cursor.execute(update_query, (username, pfp, steamID))
            mysql.connection.commit()
            print("Updated user data in the database")

    else:
        # SteamID doesn't exist, insert new record
        insert_query = "INSERT INTO users (steamid, name, pfp) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (steamID, username, pfp))
        mysql.connection.commit()

    cursor.close()
    return json.dumps({'steamid' : steamID, 'username': username, 'pfp': pfp})

#GETS THE NAME OF A USER 
def getUserName():
    url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamid()
    response = urlopen(url)
    data_json = json.loads(response.read())
    response = jsonify({"username" : data_json['response']['players'][0]['personaname']})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def getSessionSID():
    data = {"sessionSID" : session.sid}
    return json.dumps(data)

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

    
def getAchievements():
    try:
        appid = request.get_json()
        #URL is for achievements
        url = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+str(appid)+"&key="+key+"&steamid=" + steamid()+"&l=en"
        #URL2 is for player count 
        url2 = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+key+"&appid=+"+str(appid)
        #URL3 is for achievement percentages
        url3 = "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?access_token="+key+"&gameid=+"+str(appid)
        response = urlopen(url)
        response2 = urlopen(url2)
        response3 = urlopen(url3)
        data_json = json.loads(response.read())
        data_json2 = json.loads(response2.read())
        data_json3 = json.loads(response3.read())
    except:
        response2 = urlopen(url2)
        data_json2 = json.loads(response2.read())
        return json.dumps({"hasAchievements":False,"playerCount": data_json2['response']['player_count']}) 
    try:
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
        return json.dumps({"achieved":achieved, "notachieved":notachieved, "total":j, "achievedlength": len(achieved), "notachievedlength": len(notachieved),"achievementPercentage":  int((len(achieved)/j*100)), "playerCount": data_json2['response']['player_count'], "hasAchievements":True}, ensure_ascii=False)
    except:
        return json.dumps({"hasAchievements":False})
  
#Gets all the info for each gamecard [title,appid,headerurl]
def getUserGames():
    appID = "temp"
    recentGames = []
    playedGames = []
    notPlayedGames = []
    headerurl = "https://steamcdn-a.akamaihd.net/steam/apps/"+appID+"/header.jpg"
    data_json = json.loads(urlopen("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+key+"&steamid="+steamid()+"&include_played_free_games=true&include_appinfo=true&format=json").read())
    for i in data_json['response']['games']:
            #if the game has not been played
            if(i['playtime_forever'] == 0):
                notPlayedGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])),0,0])
            #if the game has been played but not in the last 2 weeks
            elif('playtime_2weeks' not in i):
                playedGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])), round(i['playtime_forever']/60,1),0,get_date_from_unix_timestamp(i["rtime_last_played"])])
            #if the game has been played in the last 2 weeks
            else:
                recentGames.append([i['name'], i['appid'], headerurl.replace(appID, str(i['appid'])), round(i['playtime_forever']/60,1),round(i['playtime_2weeks']/60,1),get_date_from_unix_timestamp(i["rtime_last_played"])])
    playedGames.sort(key=lambda x: x[3], reverse=True)
    recentGames.sort(key=lambda x: x[3], reverse=True)
    return json.dumps({"notPlayedGames" : notPlayedGames, "playedGames" : playedGames, "recentGames" : recentGames}, ensure_ascii=False)

def get_date_from_unix_timestamp(seconds):
    result_date = datetime.datetime(1970, 1, 1) + datetime.timedelta(seconds=seconds)
    day_formatted = result_date.strftime("%B %e, %Y").replace('  ', ' ').strip()
    return day_formatted