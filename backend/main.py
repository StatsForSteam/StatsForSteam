import OpenIDAuth, json, getData, jwt, datetime
from database import mysql
from flask import Flask, session
from flask_session import Session
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.debug = True

CORS(app)

app.config["SESSION_PERMANENT"] = True
app.config['SECRET_KEY'] = 'your_secret_key'
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database Connection
with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)

app.config['MYSQL_HOST'] = DatabaseCredentialsJson['HOST']
app.config['MYSQL_PORT'] = DatabaseCredentialsJson['PORT']
app.config['MYSQL_USER'] = DatabaseCredentialsJson['USER']
app.config['MYSQL_PASSWORD'] = DatabaseCredentialsJson['PASSWORD']
app.config['MYSQL_DB'] = DatabaseCredentialsJson['DB']
mysql.init_app(app)

@app.route('/api/cookie')
def cookieTester():
    return("Cookie")

from flask import redirect, request, session, make_response
from json import dumps, loads
@app.route('/api/authorize')
@cross_origin(supports_credentials=True, headers=['Content-Type', 'Authorization'], origin='http://localhost:3000')
def authorize():
    Received_Steam_Info_JSON = loads(dumps(request.args))
    SteamID = Received_Steam_Info_JSON['openid.claimed_id'].strip('https://steamcommunity.com/openid/id/')

    SteamJWT = jwt.encode({'user_id' : SteamID}, app.config['SECRET_KEY'], algorithm='HS256')
    
    response = make_response(redirect("http://localhost:3000/authentication"))
    response.set_cookie('SteamID', SteamJWT, samesite='None', httponly = True, secure=True, expires=(datetime.datetime.now() + datetime.timedelta(days=10)))
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response, 200

# API Routes
app.add_url_rule('/api/checkUserStatus', view_func=OpenIDAuth.checkUserStatus)
app.add_url_rule('/api/userAuthentication', view_func=OpenIDAuth.userAuthentication)
app.add_url_rule('/api/login', view_func=OpenIDAuth.login)
app.add_url_rule('/api/logout', view_func=OpenIDAuth.logout)
#app.add_url_rule('/api/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/api/getUserName', view_func=getData.getUserName)
app.add_url_rule('/api/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/api/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/api/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/api/getAchievements', view_func=getData.getAchievements, methods=["POST"])

@app.before_request
def before_request():
    print(f"\n{request.cookies.get('SteamID')}\n")

if __name__ == "__main__":
    app.run(use_reloader=True)