from flask import redirect, request, session, url_for
from json import dumps, loads
from urllib.parse import urlencode

Steam_URL = 'https://steamcommunity.com/openid/login'

def SteamLogin():
    OpenID_Parameters = {
        'openid.ns': "http://specs.openid.net/auth/2.0",
        'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.mode': 'checkid_setup',
        'openid.return_to': 'http://127.0.0.1:5000/authorize',
        'openid.realm': 'http://127.0.0.1:5000'
    }

    OpenID_Parameters_URL = urlencode(OpenID_Parameters)
    return redirect(Steam_URL + "?" + OpenID_Parameters_URL)

def AuthorizeData():
    Received_Steam_Info_JSON = loads(dumps(request.args))
    session['user'] = Received_Steam_Info_JSON['openid.claimed_id']
    return redirect(session['url'])