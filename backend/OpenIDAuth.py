from flask import redirect, request, session, make_response, jsonify
from json import dumps, loads
from urllib.parse import urlencode
import database

def checkUserStatus():
    print(f"\n{request.cookies.get('SteamID')} IN THE CHECKUSERSTATS\n")
    data = {
        "userLogged" : False,
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
        'openid.realm': 'http://127.0.0.1:8000'
    }

    OpenID_Parameters['openid.return_to'] = (f"http://127.0.0.1:8000/api/authorize")
    OpenID_Parameters_URL = urlencode(OpenID_Parameters)
    return redirect('https://steamcommunity.com/openid/login?' + OpenID_Parameters_URL)

def userAuthentication():

    return dumps(False)