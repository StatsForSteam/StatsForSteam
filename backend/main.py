import OpenIDAuth
from flask import Flask, session

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'random'

#Imports for external routes not in this file
app.add_url_rule('/login', view_func=OpenIDAuth.SteamLogin)
app.add_url_rule('/authorize', view_func=OpenIDAuth.AuthorizeData)

@app.route("/")
def root():
    return("Backend")

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)