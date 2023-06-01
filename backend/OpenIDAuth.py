from flask import redirect, request, session, url_for, g
from json import dumps, loads
from urllib.parse import urlencode
import database
from redis import Redis

redis = Redis()

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
    Received_Steam_Info_JSON = loads(dumps(request.args))
    print(session.sid)
    SteamID = Received_Steam_Info_JSON['openid.claimed_id'].strip('https://steamcommunity.com/openid/id/')
    database.addUser(session.sid, int(SteamID))
    return redirect("http://localhost:3000/authentication")

def userAuthentication():
    value_bytes = redis.get('test_key')
    value_string = value_bytes.decode('utf-8')
    print(value_string)
    steamid = database.getSteamID(session.sid)[0]

    if (len(str(steamid)) == 17):
        session['id'] = str(steamid)
        return dumps(True)

    return dumps(False)