import OpenIDAuth, json, getData
import flask_praetorian
from database import mysql
from flask import Flask
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
app.debug = True

Session(app)
CORS(app)

# JWT
guard = flask_praetorian.Praetorian()
guard.init_app(app)
app.config["SECRET_KEY"] = "top secret"
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}

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
app.add_url_rule('/api/checkUserStatus', view_func=OpenIDAuth.checkUserStatus)
app.add_url_rule('/api/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/api/login', view_func=OpenIDAuth.login)
app.add_url_rule('/api/logout', view_func=OpenIDAuth.logout)
app.add_url_rule('/api/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/api/getUserName', view_func=getData.getUserName)
app.add_url_rule('/api/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/api/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/api/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/api/getAchievements', view_func=getData.getAchievements, methods=["POST"])

if __name__ == "__main__":
    app.run(use_reloader=True)