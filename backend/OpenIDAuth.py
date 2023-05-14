from flask import redirect, request, session, url_for, g
from json import dumps, loads
from urllib.parse import urlencode
from pysteamsignin.steamsignin import SteamSignIn

def checkUserStatus():
    if 'id' in session:
        return dumps(True)
    return dumps(False)

def login():
    if 'id' in session:
        return redirect("http://localhost:3000/profile")
    shouldLogin = request.args.get('login')
    if shouldLogin is not None:
        steamLogin = SteamSignIn()
        return steamLogin.RedirectUser(steamLogin.ConstructURL('http://127.0.0.1:5000/authorize'))

def authorize():
    returnData = request.values
    steamLogin = SteamSignIn()
    steamID = steamLogin.ValidateResults(returnData)
    session['id'] = steamID
    return redirect("http://localhost:3000/profile")