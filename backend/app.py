import OpenIDAuth, json, getData, forums, pytz, datetime
from database import mysql, getUserCount
from flask import Flask
from flask_session import Session
from flask_cors import CORS

with open('FlaskSecretKey.json') as FlaskSecretKey:
    FlaskSecretKeyJson = json.load(FlaskSecretKey)
with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)
with open('SteamAPI.json') as SteamAPIFile:
    SteamAPIJson = json.load(SteamAPIFile)

pst = pytz.timezone('America/Los_Angeles')
current_datetime_pst = datetime.datetime.now(pst)
serverLaunchTime = current_datetime_pst.strftime("%d-%m-%Y, %H:%M:%S")

app = Flask(__name__)
app.config['SECRET_KEY'] = FlaskSecretKeyJson['SECRETKEY']
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = True
Session(app)
CORS(app, supports_credentials=True)

app.config['MYSQL_HOST'] = DatabaseCredentialsJson['HOST']
app.config['MYSQL_PORT'] = DatabaseCredentialsJson['PORT']
app.config['MYSQL_USER'] = DatabaseCredentialsJson['USER']
app.config['MYSQL_PASSWORD'] = DatabaseCredentialsJson['PASSWORD']
app.config['MYSQL_DB'] = DatabaseCredentialsJson['DB']
mysql.init_app(app)

@app.route('/')
def versionCheck():
    userCount = getUserCount()
    current_datetime_pst = datetime.datetime.now(pst)
    connectionLaunchTime = current_datetime_pst.strftime("%d-%m-%Y, %H:%M:%S")
    return(f'<h1>Stats For Steam Backend (v1.0.5)</h1>Server Connected: {connectionLaunchTime}<br>Server Initialized: &nbsp;{serverLaunchTime}<br>Server API Key: &nbsp;&nbsp;&nbsp;&nbsp;{SteamAPIJson["STEAMAPIKEY"][:2]}<br>Unique Logins: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userCount}')

app.add_url_rule('/api/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/api/login', view_func=OpenIDAuth.login)
app.add_url_rule('/api/logout', view_func=OpenIDAuth.logout)
app.add_url_rule('/api/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/api/checkSession', view_func=OpenIDAuth.checkSession)
app.add_url_rule('/api/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/api/getAchievements', view_func=getData.getAchievements, methods=["POST"])
app.add_url_rule('/api/getDashboard', view_func=getData.getDashboard, methods=["POST"])
app.add_url_rule('/api/createPost', view_func=forums.createPost, methods=["POST"])
app.add_url_rule('/api/getPosts', view_func=forums.getPosts, methods=["POST"])
app.add_url_rule('/api/manageUsers', view_func=forums.manageUsers)
app.add_url_rule('/api/createReply', view_func=forums.createReply, methods=["POST"])
app.add_url_rule('/api/createVote', view_func=forums.createVote, methods=["POST"])
app.add_url_rule('/api/updateVote', view_func=forums.updateVote, methods=["POST"])
app.add_url_rule('/api/deleteVote', view_func=forums.deleteVote, methods=["POST"])
app.add_url_rule('/api/deletePost', view_func=forums.deletePost, methods=["POST"])
app.add_url_rule('/api/deleteReply', view_func=forums.deleteReply, methods=["POST"])


if __name__ == "__main__":
    app.run(debug=True)

