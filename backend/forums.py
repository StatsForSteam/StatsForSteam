import json
from urllib.request import urlopen
from flask import request, session, g
from flask_mysqldb import MySQL
from flask import jsonify
mysql = MySQL()

def createPost():
    data = request.get_json()
    title = data['title']
    content = data['content']
    appid = data['appid']
    
    cursor = mysql.connection.cursor()

    # Insert data into test1 table
    insert_statement_test1 = "INSERT INTO test1 (title, content) VALUES (%s, %s)"
    data_test1 = (title, content)
    cursor.execute(insert_statement_test1, data_test1)
    mysql.connection.commit()

    # Get the generated postid from test1 table
    print(cursor.lastrowid)
    postid = cursor.lastrowid

    # Insert data into test1p2 table
    insert_statement_test1p2 = "INSERT INTO test1p2 (postid, appid) VALUES (%s, %s)"
    data_test1p2 = (postid, appid)
    cursor.execute(insert_statement_test1p2, data_test1p2)
    mysql.connection.commit()

    cursor.close()
    return '', 204




def getPosts():
    data = request.get_json()
    appid = data['appid']

    cursor = mysql.connection.cursor()
    
    select_statement = """
    SELECT test1.postid, test1.title, test1.content
    FROM test1
    JOIN test1p2 ON test1.postid = test1p2.postid
    WHERE test1p2.appid = %s
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
            'content': row[2]
        }
        posts.append(post)

    return jsonify(posts)


