from flask import Flask, redirect, request, render_template, session, url_for
from json import dumps, loads
from urllib.parse import urlencode

app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')
app.debug = True
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'random'
steam_openid_url = 'https://steamcommunity.com/openid/login'

@app.before_first_request
def before_first_request():
    session['user'] = 'Log into steam!'

@app.route("/")
def root():
    return render_template('index.html', user=session['user'])

@app.route("/auth")
def auth_with_steam():

    params = {
        'openid.ns': "http://specs.openid.net/auth/2.0",
        'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.mode': 'checkid_setup',
        'openid.return_to': 'http://127.0.0.1:5000/authorize',
        'openid.realm': 'http://127.0.0.1:5000'
    }

    query_string = urlencode(params)
    auth_url = steam_openid_url + "?" + query_string
    return redirect(auth_url)

@app.route("/authorize")
def authorize():
    jsonData = dumps(request.args)
    data = loads(jsonData)
    session['user'] = data['openid.claimed_id']
    return redirect(url_for('root'))

if __name__ == "__main__":
    app.run()