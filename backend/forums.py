import json
from urllib.request import urlopen
from flask import request, session, jsonify
from flask_mysqldb import MySQL
from datetime import datetime

with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)

key = SteamAPIJson["STEAMAPIKEY"]
mysql = MySQL()

def steamid():
    if 'SteamID' in session:
        return str(session['SteamID'])
    return ('Error')

def getDate():
    current_date = datetime.now()
    formatted_date = current_date.strftime("%B %e, %Y").replace('  ', ' ').strip()
    return formatted_date
    
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

def createPost():
    data = request.get_json()
    title = data['title']
    content = data['content']
    appid = data['appid']
    tagid = data['tagid']
    steamID = steamid()
    date = getDate()
    cursor = mysql.connection.cursor()

    # Insert data into posts table
    insert_statement_posts = "INSERT INTO posts (title, content, date, tagid) VALUES (%s, %s, %s, %s)"
    data_posts = (title, content, date, tagid)
    cursor.execute(insert_statement_posts, data_posts)
    mysql.connection.commit()

    # Get the generated postid from posts table
    postid = cursor.lastrowid

    # Insert data into postrelation table
    insert_statement_postrelation = "INSERT INTO postrelation (postid, steamid, appid) VALUES (%s, %s, %s)"
    data_postrelation = (postid, steamID, appid)
    cursor.execute(insert_statement_postrelation, data_postrelation)
    mysql.connection.commit()

    # Fetch the new post and the information needed to return to the frontend
    select_statement_posts = """
    SELECT
    posts.postid,
    posts.title,
    posts.content,
    posts.date,
    users.name,
    users.pfp,
    tagid
    FROM
    posts
    JOIN postrelation ON posts.postid = postrelation.postid
    JOIN users ON users.steamid = postrelation.steamid
    WHERE
    posts.postid = %s;
    """

    cursor.execute(select_statement_posts, (postid,))
    newest_record = cursor.fetchone()
    newest_record_json = json.dumps(newest_record)

    cursor.close()
    return newest_record_json, 200

def deletePost():
    data = request.get_json()
    post_id = data.get('postid')
    cursor = mysql.connection.cursor()

    # Delete the votes associated with the post
    delete_post_votes_query = "DELETE FROM postvotes WHERE postid = %s"
    cursor.execute(delete_post_votes_query, (post_id,))
    mysql.connection.commit()

    # Delete the votes associated with the replies to the post
    delete_reply_votes_query = """
    DELETE FROM replyvotes
    WHERE replyid IN (
      SELECT replyid
      FROM replyrelation
      WHERE postid = %s
    )
    """
    cursor.execute(delete_reply_votes_query, (post_id,))
    mysql.connection.commit()

    # Delete the reply relations for the post
    delete_reply_relation_query = "DELETE FROM replyrelation WHERE postid = %s"
    cursor.execute(delete_reply_relation_query, (post_id,))
    mysql.connection.commit()

    # Delete the post relations for the post
    delete_post_relation_query = "DELETE FROM postrelation WHERE postid = %s"
    cursor.execute(delete_post_relation_query, (post_id,))
    mysql.connection.commit()

    # Delete the replies associated with the post
    delete_replies_query = """
    DELETE FROM reply
    WHERE replyid IN (
      SELECT replyid
      FROM replyrelation
      WHERE postid = %s
    )
    """
    cursor.execute(delete_replies_query, (post_id,))
    mysql.connection.commit()

    # Delete the post itself
    delete_post_query = "DELETE FROM posts WHERE postid = %s"
    cursor.execute(delete_post_query, (post_id,))
    mysql.connection.commit()

    cursor.close()
    return '', 200

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

    # Fetch the new reply and the information needed to return to the frontend
    select_statement_reply = """
    SELECT
    reply.replyid,
    reply.content,
    reply.date,
    users.name,
    users.pfp
    FROM
    reply
    JOIN replyrelation ON reply.replyid = replyrelation.replyid
    JOIN users ON users.steamid = replyrelation.steamid
    WHERE
    reply.replyid = %s;
    """

    cursor.execute(select_statement_reply, (replyid,))
    newest_record = cursor.fetchone()
    newest_record_json = json.dumps(newest_record)
    cursor.close()

    return newest_record_json, 200

def deleteReply():
    data = request.get_json()
    replyid = data['replyid']
    
    cursor = mysql.connection.cursor()

    # Delete the reply relation from replyrelation table
    delete_statement_replyrelation = "DELETE FROM replyrelation WHERE replyid = %s"
    cursor.execute(delete_statement_replyrelation, (replyid,))
    mysql.connection.commit()

    # Delete the reply votes from replyvotes table
    delete_statement_replyvotes = "DELETE FROM replyvotes WHERE replyid = %s"
    cursor.execute(delete_statement_replyvotes, (replyid,))
    mysql.connection.commit()

    # Delete the reply from reply table
    delete_statement_reply = "DELETE FROM reply WHERE replyid = %s"
    cursor.execute(delete_statement_reply, (replyid,))
    mysql.connection.commit()

    cursor.close()

    return "Reply deleted successfully", 200

def getPosts():
    data = request.get_json()
    appid = data['appid']
    steamID = steamid()

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
        reply_users.pfp AS reply_user_pfp,
        posts.votes AS post_votes,
        reply.votes AS reply_votes,
        IFNULL(postvotes.vote_type, 'none') AS post_vote_type,
        IFNULL(replyvotes.vote_type, 'none') AS reply_vote_type,
        postrelation.steamid AS post_creator,
        replyrelation.steamid AS reply_creator,
        CASE
            WHEN postrelation.steamid = %s THEN TRUE
            ELSE FALSE
        END AS is_post_creator,
        CASE
            WHEN replyrelation.steamid = %s THEN TRUE
            ELSE FALSE
        END AS is_reply_creator,
        tagid
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
    LEFT JOIN 
        postvotes ON posts.postid = postvotes.postid
            AND postvotes.steamid = %s
    LEFT JOIN 
        replyvotes ON reply.replyid = replyvotes.replyid
            AND replyvotes.steamid = %s
    WHERE 
        postrelation.appid = %s
    """
    data_select = (steamID, steamID, steamID, steamID, appid)
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
                'votes': row[11],
                'existing_vote_type': row[13],  # Vote type for the post
                'is_creator': bool(row[17]),  # Boolean variable indicating if the steamID calling getPosts is the creator of each post
                'tagid': row[19],
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
                'pfp': row[10],
                'votes': row[12],
                'existing_vote_type': row[14],  # Vote type for the reply
                'is_creator': bool(row[18]),  # Boolean variable indicating if steamID is calling getPosts is the creator of each reply
            }
            posts[postid]['replies'].append(reply)
    return jsonify(list(posts.values()))

def createVote():
    data = request.get_json()
    vote_type = data['vote_type']
    voteon = data['voteon']
    steamID = steamid()
    cursor = mysql.connection.cursor()

    if voteon == 'post':
        # Voting on a post
        postid = data['postid']

        insert_statement = "INSERT INTO postvotes (vote_type, postid, steamid) VALUES (%s, %s, %s)"
        update_statement = "UPDATE posts SET votes = votes + %s WHERE postid = %s"
        data_insert = (vote_type, postid, steamID)
        data_update = (1 if vote_type == 'upvote' else -1, postid)

    else:
        # Voting on a reply
        replyid = data['replyid']

        insert_statement = "INSERT INTO replyvotes (vote_type, replyid, steamid) VALUES (%s, %s, %s)"
        update_statement = "UPDATE reply SET votes = votes + %s WHERE replyid = %s"
        data_insert = (vote_type, replyid, steamID)
        data_update = (1 if vote_type == 'upvote' else -1, replyid)

    cursor.execute(insert_statement, data_insert)
    cursor.execute(update_statement, data_update)
    mysql.connection.commit()
    cursor.close()

    return '', 200

def updateVote():
    data = request.get_json()
    voteon = data['voteon']
    steamID = steamid()

    cursor = mysql.connection.cursor()

    update_reply_statement = None  # Initialize the variable to None

    if voteon == 'post':
        postid = data['postid']
        update_statement = """
            UPDATE postvotes
            SET vote_type = CASE WHEN vote_type = 'upvote' THEN 'downvote' ELSE 'upvote' END
            WHERE postid = %s AND steamid = %s
        """
        update_data = (postid, steamID)
        
        # Update the votes column in the posts table
        vote_diff = 2 if data['vote_type'] == 'upvote' else -2
        update_posts_statement = "UPDATE posts SET votes = votes + %s WHERE postid = %s"
        update_posts_data = (vote_diff, postid)
    else:
        replyid = data['replyid']
        update_statement = """
            UPDATE replyvotes
            SET vote_type = CASE WHEN vote_type = 'upvote' THEN 'downvote' ELSE 'upvote' END
            WHERE replyid = %s AND steamid = %s
        """
        update_data = (replyid, steamID)
        
        # Update the votes column in the reply table
        vote_diff = 2 if data['vote_type'] == 'upvote' else -2
        update_reply_statement = "UPDATE reply SET votes = votes + %s WHERE replyid = %s"
        update_reply_data = (vote_diff, replyid)

    cursor.execute(update_statement, update_data)
    
    if voteon == 'post':
        cursor.execute(update_posts_statement, update_posts_data)  # Execute the posts update query
    
    if voteon == 'reply' and update_reply_statement:
        cursor.execute(update_reply_statement, update_reply_data)  # Execute the reply update query
    
    mysql.connection.commit()
    cursor.close()

    return '', 200

def deleteVote():
    data = request.get_json()
    voteon = data['voteon']
    vote_type = data['vote_type']
    steamID = steamid()

    cursor = mysql.connection.cursor()

    if voteon == 'post':
        postid = data['postid']

        delete_statement = "DELETE FROM postvotes WHERE postid = %s AND steamid = %s"
        data_delete = (postid, steamID)

        if vote_type == 'upvote':
            # If the vote_type is upvote, decrement the vote count by 1
            update_statement = "UPDATE posts SET votes = votes - 1 WHERE postid = %s"
            data_update = (postid,)
        elif vote_type == 'downvote':
            # If the vote_type is downvote, increment the vote count by 1
            update_statement = "UPDATE posts SET votes = votes + 1 WHERE postid = %s"
            data_update = (postid,)
    else:
        replyid = data['replyid']

        delete_statement = "DELETE FROM replyvotes WHERE replyid = %s AND steamid = %s"
        data_delete = (replyid, steamID)

        if vote_type == 'upvote':
            # If the vote_type is upvote, decrement the vote count by 1
            update_statement = "UPDATE reply SET votes = votes - 1 WHERE replyid = %s"
            data_update = (replyid,)
        elif vote_type == 'downvote':
            # If the vote_type is downvote, increment the vote count by 1
            update_statement = "UPDATE reply SET votes = votes + 1 WHERE replyid = %s"
            data_update = (replyid,)

    cursor.execute(delete_statement, data_delete)
    cursor.execute(update_statement, data_update)
    mysql.connection.commit()
    cursor.close()

    return '', 200