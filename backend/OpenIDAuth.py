import requests, uuid, jwt, database, json
from flask import redirect, request, session, make_response, jsonify
from json import dumps, loads, load
from urllib.parse import urlencode

with open('JWTKey.json') as JWTKeyFile:
    JWTKeyJson = load(JWTKeyFile)

def checkUserStatus():
    jwt_token = request.cookies.get('JWT')
    print(f"{jwt_token}\n\n\n")
    return jsonify(jwt_token)

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
        SteamJWT = jwt.encode({'user_id' : SteamID}, "43234", algorithm='HS256')
        authToken = uuid.uuid4()
        database.createJWT(SteamJWT, authToken)
        response = make_response(redirect(f"http://localhost:3000/authentication?authtoken={authToken}"))
        response.set_cookie('jwtToken', SteamJWT, httponly=False)
        return response

    else:
        return "Invalid user"

def userAuthentication():
    # Set the JWT token as a cookie
    authToken = request.args.get('authToken')
    JWT = database.getSteamJWT(authToken)
    response = make_response(jsonify({'message': 'Login successful'}))
    response.set_cookie('JWT', value=str(JWT), httponly=True)
    return response