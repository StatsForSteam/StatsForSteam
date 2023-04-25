import OpenIDAuth, json, getData
from flask import Flask, session, g, redirect, request

# Loading the Secret App Key
with open('FlaskSecretKey.json') as FlaskSecretKey:
    FlaskSecretKey = json.load(FlaskSecretKey)

app = Flask(__name__)
app.config["SECRET_KEY"] = FlaskSecretKey["SECRETKEY"]
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.add_url_rule('/login', view_func=OpenIDAuth.SteamLogin)
app.add_url_rule('/authorize', view_func=OpenIDAuth.AuthorizeData)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)

@app.before_request
def check_user_log_in():
    if 'id' in session:
        user = session['id']
    else:
        user = "None"
    g.user = user
    print(f"\n\n{g.user}\n\n")

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)

# @app.before_request
# def make_session_permanent():
#     session.permanent = True
#     g.user = None
#     if 'openid' in session:
#         g.user = session['openid']
#         print(g.user)

# @app.route('/getUserID')
# def getUserID():
#     if 'openid' in session:
#         username = {"username" : session['openid']}
#     else:
#         username = {"username" : "dont have it"}
#     return json.dumps(username)