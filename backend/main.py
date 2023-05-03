import OpenIDAuth, json, getData
from flask import Flask, session, g, redirect, send_from_directory
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/public/index.html')
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)
app.add_url_rule('/login', view_func=OpenIDAuth.login)
app.add_url_rule('/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getAchievementTest', view_func=getData.getAchievementTest, methods=["POST"])
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/getNumberOfGames', view_func=getData.getNumberOfGames)
app.add_url_rule('/getUserGamesHeaders', view_func=getData.getUserGamesHeaders)
app.add_url_rule('/getAchievements', view_func=getData.getAchievements, methods=["POST"])

@app.before_request
def check_user_log_in():
    if 'id' in session:
        print(f"{session['id']} is here!")
        g.user = session['id']
    else:
        g.user = 'none'    

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(ssl_context=('cert.pem', 'key.pem'), host = 'localhost', port = 8080, debug = True, use_reloader=True)
