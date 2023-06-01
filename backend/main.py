import OpenIDAuth, json, getData, os
from database import mysql
from flask import Flask, session, g, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
from flask_mysqldb import MySQL
from redis import Redis

app = Flask(__name__)

redis = Redis(host='localhost', port=6379)  # Update with your Redis configuration

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = Redis(host='localhost', port=6379)
app.config['SESSION_PERMANENT'] = True

redis = Redis()
Session(app)
CORS(app)

with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)

app.config['MYSQL_HOST'] = DatabaseCredentialsJson['HOST']
app.config['MYSQL_PORT'] = DatabaseCredentialsJson['PORT']
app.config['MYSQL_USER'] = DatabaseCredentialsJson['USER']
app.config['MYSQL_PASSWORD'] = DatabaseCredentialsJson['PASSWORD']
app.config['MYSQL_DB'] = DatabaseCredentialsJson['DB']
mysql.init_app(app)

app.add_url_rule('/checkUserStatus', view_func=OpenIDAuth.checkUserStatus)
app.add_url_rule('/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/login', view_func=OpenIDAuth.login)
app.add_url_rule('/logout', view_func=OpenIDAuth.logout)
app.add_url_rule('/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/getAchievements', view_func=getData.getAchievements, methods=["POST"])

@app.before_request
def check():
    print(session.sid)
    value_bytes = redis.get('test_key')
    value_string = value_bytes.decode('utf-8')  # Decode bytes to string
    print(value_string)

@app.route('/test-redis')
def test_redis():
    test = session.sid
    redis.set('test_key', test)
    value_bytes = redis.get('test_key')
    value_string = value_bytes.decode('utf-8')  # Decode bytes to string
    return jsonify({'value': value_string})

if __name__ == "__main__":
    app.secret_key = 'your_secret_key'
    app.run(debug = True, use_reloader=True)