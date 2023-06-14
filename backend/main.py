import OpenIDAuth, json, getData, jwt, datetime
from database import mysql
from flask import Flask, session, request
from flask_session import Session
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.debug = True

app.config['SECRET_KEY'] = 'your_secret_key'
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
Session(app)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

# Database Connection
with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)

app.config['MYSQL_HOST'] = DatabaseCredentialsJson['HOST']
app.config['MYSQL_PORT'] = DatabaseCredentialsJson['PORT']
app.config['MYSQL_USER'] = DatabaseCredentialsJson['USER']
app.config['MYSQL_PASSWORD'] = DatabaseCredentialsJson['PASSWORD']
app.config['MYSQL_DB'] = DatabaseCredentialsJson['DB']
mysql.init_app(app)

# API Routes
app.add_url_rule('/api/login', view_func=OpenIDAuth.login)
app.add_url_rule('/api/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/api/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/api/getUserName', view_func=getData.getUserName)
app.add_url_rule('/api/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/api/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/api/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/api/getAchievements', view_func=getData.getAchievements, methods=["POST"])

if __name__ == "__main__":
    app.run()