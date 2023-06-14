import requests, uuid, jwt, database, json, getData
from flask import redirect, request, session, make_response, jsonify
from json import dumps, loads, load
from urllib.parse import urlencode

with open('JWTKey.json') as JWTKeyFile:
    JWTKeyJson = load(JWTKeyFile)

def login():
    nonce = uuid.uuid4()
    session['nonce'] = nonce

    OpenID_Parameters = {
        'openid.ns': "http://specs.openid.net/auth/2.0",
        'openid.identity': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.claimed_id': "http://specs.openid.net/auth/2.0/identifier_select",
        'openid.mode': 'checkid_setup',
        'openid.realm': 'http://127.0.0.1:8000'
    }

    OpenID_Parameters['openid.return_to'] = (f"http://127.0.0.1:8000/api/authorize?nonce={nonce}")
    OpenID_Parameters_URL = urlencode(OpenID_Parameters)
    return redirect('https://steamcommunity.com/openid/login?' + OpenID_Parameters_URL)

def authorize():
    received_nonce = request.args.get('nonce')
    stored_nonce = session.get('nonce')

    if received_nonce != str(stored_nonce):
        return "Invalid user"

    openid_params = {
        'openid.ns': request.args.get('openid.ns'),
        'openid.mode': "check_authentication"
    }   

    for param in request.args:
        if param.startswith('openid.') and param != 'openid.mode':
            openid_params[param] = request.args.get(param)

    response = requests.post('https://steamcommunity.com/openid/login', data=openid_params)

    if response.text.startswith('ns:http://specs.openid.net/auth/2.0\nis_valid:true'):
        Received_Steam_Info_JSON = loads(dumps(request.args))
        SteamID = Received_Steam_Info_JSON['openid.claimed_id'].strip('https://steamcommunity.com/openid/id/')
        authToken = uuid.uuid4()
        database.createSteamID(SteamID, authToken)
        response = make_response(redirect(f"http://localhost:3000/authentication?authtoken={authToken}"))
        return response

    else:
        return "Invalid user"

def userAuthentication():
    authToken = request.args.get('authToken')
    SteamID = database.getSteamID(authToken)
    response = make_response(jsonify({'message': 'Login successful'}))
    session['SteamID'] = SteamID
    return getData.manageUsers()