import OpenIDAuth, json, getData, forums
from database import mysql
from flask import Flask
from flask_session import Session
from flask_cors import CORS

with open('FlaskSecretKey.json') as FlaskSecretKey:
    FlaskSecretKeyJson = json.load(FlaskSecretKey)
with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)

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

app.add_url_rule('/api/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/api/login', view_func=OpenIDAuth.login)
app.add_url_rule('/api/logout', view_func=OpenIDAuth.logout)
app.add_url_rule('/api/authorize', view_func=OpenIDAuth.authorize)
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

