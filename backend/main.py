import OpenIDAuth, json, getData
from flask import Flask, session, g

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'random'

app.add_url_rule('/login', view_func=OpenIDAuth.SteamLogin)
app.add_url_rule('/authorize', view_func=OpenIDAuth.AuthorizeData)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)