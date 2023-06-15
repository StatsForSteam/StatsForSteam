from flask import redirect, request, session, url_for, g
from json import dumps, loads
from urllib.parse import urlencode
import database

def checkUserStatus():
    data = {
        "userLogged" : False,
        "SessionID" : session.sid
    }
    if 'id' in session:
        data["userLogged"] = True
        return dumps(data)
    
    return dumps(data)

def logout():
    if 'id' in session:
        session.pop('id', None)
        return dumps(True)
    
    return dumps(False)

def login():
    OpenID_Parameters = {
        'openid.ns': "http://specs.openid.net/auth/2.0",
        'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.mode': 'checkid_setup',
        'openid.realm': 'http://127.0.0.1:5000'
    }

    OpenID_Parameters['openid.return_to'] = (f"http://127.0.0.1:5000/authorize?session={request.args.get('session')}")
    OpenID_Parameters_URL = urlencode(OpenID_Parameters)
    return redirect('https://steamcommunity.com/openid/login?' + OpenID_Parameters_URL)

def authorize():
    return redirect("http://localhost:3000/authentication")

def userAuthentication():
    return dumps(True)

