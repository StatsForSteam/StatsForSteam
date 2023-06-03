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


def createReply():
    data = request.get_json()
    content = data['content']
    postid = data['postid']
    steamID = steamid()
    date = getDate()
    
    cursor = mysql.connection.cursor()

    # Insert data into reply table
    insert_statement_reply = "INSERT INTO reply (content, date) VALUES (%s, %s)"
    data_reply = (content, date)
    cursor.execute(insert_statement_reply, data_reply)
    mysql.connection.commit()

    # Get the generated replyid from reply table
    replyid = cursor.lastrowid

    # Insert data into replyrelation table
    insert_statement_replyrelation = "INSERT INTO replyrelation (replyid, steamid, postid) VALUES (%s, %s, %s)"
    data_replyrelation = (replyid, steamID, postid)
    cursor.execute(insert_statement_replyrelation, data_replyrelation)
    mysql.connection.commit()

    cursor.close()

    return '', 200

def getReplies():
    data = request.get_json()
    postid = data['postid']

    cursor = mysql.connection.cursor()
    
    select_statement = """
    SELECT reply.replyid, reply.content, users.name, users.pfp, reply.date
    FROM reply
    JOIN replyrelation ON reply.replyid = replyrelation.replyid
    JOIN users ON replyrelation.steamid = users.steamid
    WHERE replyrelation.postid = %s
    """
    data_select = (postid,)
    cursor.execute(select_statement, data_select)
    
    rows = cursor.fetchall()
    cursor.close()

    # Convert rows to a list of dictionaries for JSON serialization
    replies = []
    for row in rows:
        reply = {
            'replyid': row[0],
            'content': row[1],
            'username': row[2],
            'pfp': row[3],
            'date': row[4]
        }
        replies.append(reply)

    return jsonify(replies)

    
   



def getPosts():
    data = request.get_json()
    appid = data['appid']

    cursor = mysql.connection.cursor()

    select_statement = """
    SELECT 
        posts.postid, 
        posts.title, 
        posts.content, 
        users.name, 
        users.pfp, 
        posts.date,
        reply.replyid,
        reply.content AS reply_content,
        reply.date AS reply_date,
        reply_users.name AS reply_username,
        reply_users.pfp AS reply_user_pfp
    FROM 
        posts
    JOIN 
        postrelation ON posts.postid = postrelation.postid
    JOIN 
        users ON postrelation.steamid = users.steamid
    LEFT JOIN 
        replyrelation ON posts.postid = replyrelation.postid
    LEFT JOIN 
        reply ON replyrelation.replyid = reply.replyid
    LEFT JOIN 
        users AS reply_users ON replyrelation.steamid = reply_users.steamid
    WHERE 
        postrelation.appid = %s
    """
    data_select = (appid,)
    cursor.execute(select_statement, data_select)

    rows = cursor.fetchall()
    cursor.close()

    # Convert rows to a list of dictionaries for JSON serialization
    posts = {}
    for row in rows:
        postid = row[0]
        if postid not in posts:
            post = {
                'postid': postid,
                'title': row[1],
                'content': row[2],
                'username': row[3],
                'pfp': row[4],
                'date': row[5],
                'replies': []
            }
            posts[postid] = post

        replyid = row[6]
        if replyid is not None:
            reply = {
                'replyid': replyid,
                'content': row[7],
                'date': row[8],
                'username': row[9],
                'pfp': row[10]
            }
            posts[postid]['replies'].append(reply)

    return jsonify(list(posts.values()))






