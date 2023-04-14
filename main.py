from flask import Flask, render_template, request, g, session, flash, \
     redirect, url_for, abort
from flask_openid import OpenID
from openid.extensions import pape

app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')
app.config.update(
    SECRET_KEY = 'development key',
    DEBUG = True
)

oid = OpenID(app, safe_roots=[], extension_responses=[pape.Response])

@app.route('/')
def index():
    return render_template('index.html')

@app.post('/')
@oid.loginhandler
def login():
    return oid.try_login("https://steamcommunity.com/openid", extensions=[pape.Request([])])
    
@oid.after_login
def create_or_login(resp):
    # We should be able to get the OpenID in here.
    key = resp.identity_url
    pass

if __name__ == '__main__':
    app.run()