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
    cursor = mysql.connection.cursor()
    insert_statement = "INSERT INTO test (title, content) VALUES (%s, %s)"
    data = (title, content)
    cursor.execute(insert_statement, data)
    mysql.connection.commit()
    cursor.close()
    return '', 204


def getPosts():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM test")
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
