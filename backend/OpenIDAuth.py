from flask import redirect, request, session, url_for, g
from json import dumps, loads
from urllib.parse import urlencode

def SteamLogin():
    session['id'] = "useridishere"
    OpenID = {"OpenIDUrl" : "test"}
    return dumps(OpenID)
    # OpenID_Parameters = {
    #     'openid.ns': "http://specs.openid.net/auth/2.0",
    #     'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
    #     'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
    #     'openid.mode': 'checkid_setup',
    #     'openid.return_to': 'http://127.0.0.1:5000/authorize',
    #     'openid.realm': 'http://127.0.0.1:5000'
    # }

    # OpenID_Parameters_URL = urlencode(OpenID_Parameters)
    # OpenID_URL = ('https://steamcommunity.com/openid/login' + "?" + OpenID_Parameters_URL)
    # OpenID = {"OpenIDUrl" : OpenID_URL}
    # return dumps(OpenID)

def AuthorizeData():
    Received_Steam_Info_JSON = loads(dumps(request.args))
    userID = Received_Steam_Info_JSON['openid.claimed_id']
    session['id'] = 2
    print(f"\n\n OpenID: {session['id']}\n\n")
    return redirect("localhost:3000/profile")