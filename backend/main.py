import OpenIDAuth, json, getData
from flask import Flask, session, g, redirect
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)
app.add_url_rule('/login', view_func=OpenIDAuth.login)
app.add_url_rule('/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/getAchievements', view_func=getData.getAchievements, methods=["POST"])
app.add_url_rule('/getAchievementAmounts', view_func=getData.getAchievementAmounts, methods=["POST"])

@app.before_request
def check_user_log_in():
    if 'id' in session:
        print(f"{session['id']} is here!")
        g.user = session['id']
    else:
        g.user = 'none'    

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)
