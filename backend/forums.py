import json
from urllib.request import urlopen
from flask import request, session, g
from flask_mysqldb import MySQL
from flask import jsonify


# .strftime("%B %e, %Y").lstrip('0').replace('  ', ' ')
from datetime import datetime

def getDate():
    current_date = datetime.now()
    formatted_date = current_date.strftime("%B %e, %Y").replace('  ', ' ').strip()
    return formatted_date

mysql = MySQL()

with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)
key = SteamAPIJson["STEAMAPIKEY"]

def steamid():
    from main import app
    with app.app_context():
        return(session['id'])
    
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
    return json.dumps({'username': username, 'pfp': pfp})


def createPost():
    data = request.get_json()
    title = data['title']
    content = data['content']
    appid = data['appid']
    steamID = steamid()
    date = getDate()
    cursor = mysql.connection.cursor()

    # Insert data into posts table
    insert_statement_posts = "INSERT INTO posts (title, content, date) VALUES (%s, %s, %s)"
    data_posts = (title, content, date)
    cursor.execute(insert_statement_posts, data_posts)
    mysql.connection.commit()

    # Get the generated postid from posts table
    postid = cursor.lastrowid

    # Insert data into postrelation table
    insert_statement_postrelation = "INSERT INTO postrelation (postid, steamid, appid) VALUES (%s, %s, %s)"
    data_postrelation = (postid, steamID, appid)
    cursor.execute(insert_statement_postrelation, data_postrelation)
    mysql.connection.commit()

    cursor.close()
    return '', 204





def getPosts():
    data = request.get_json()
    appid = data['appid']

    cursor = mysql.connection.cursor()
    
    select_statement = """
    SELECT posts.postid, posts.title, posts.content, users.name, users.pfp, posts.date
    FROM posts
    JOIN postrelation ON posts.postid = postrelation.postid
    JOIN users ON postrelation.steamid = users.steamid
    WHERE postrelation.appid = %s
    """
    data_select = (appid,)
    cursor.execute(select_statement, data_select)
    
    rows = cursor.fetchall()
    cursor.close()

    # Convert rows to a list of dictionaries for JSON serialization
    posts = []
    for row in rows:
        post = {
            'postid': row[0],
            'title': row[1],
            'content': row[2],
            'username': row[3],
            'pfp': row[4],
            'date': row[5]
        }
        posts.append(post)

    return jsonify(posts)




