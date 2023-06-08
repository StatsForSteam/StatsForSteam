import OpenIDAuth, json, getData, forums
from database import mysql
from flask import Flask, session, g, redirect
from flask_session import Session
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
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
app.add_url_rule('/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/getAchievements', view_func=getData.getAchievements, methods=["POST"])
app.add_url_rule('/getDashboard', view_func=getData.getDashboard, methods=["POST"])
app.add_url_rule('/createPost', view_func=forums.createPost, methods=["POST"])
app.add_url_rule('/getPosts', view_func=forums.getPosts, methods=["POST"])
app.add_url_rule('/manageUsers', view_func=forums.manageUsers)
app.add_url_rule('/createReply', view_func=forums.createReply, methods=["POST"])
app.add_url_rule('/createVote', view_func=forums.createVote, methods=["POST"])
app.add_url_rule('/updateVote', view_func=forums.updateVote, methods=["POST"])
app.add_url_rule('/deleteVote', view_func=forums.deleteVote, methods=["POST"])
app.add_url_rule('/deletePost', view_func=forums.deletePost, methods=["POST"])
app.add_url_rule('/deleteReply', view_func=forums.deleteReply, methods=["POST"])

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)

