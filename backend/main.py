import OpenIDAuth
from flask import Flask, session, url_for

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'random'

#Imports for external routes not in this file
app.add_url_rule('/login', view_func=OpenIDAuth.SteamLogin)
app.add_url_rule('/authorize', view_func=OpenIDAuth.AuthorizeData)

@app.before_first_request
def before_first_request():
    session['user'] = 'Log into steam!'
    session['url'] = url_for('steaminfo')

@app.route("/steaminfo")
def steaminfo():
    return {"steaminfo" : ["info1", "info2", "info3"]}

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)