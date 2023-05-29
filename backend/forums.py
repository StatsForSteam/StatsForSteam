import json
from urllib.request import urlopen
from flask import request, session, g


def createPost():
    data = request.get_json()
    title = data['title']
    content = data['content']
    print(title)
    print(content)
    return '', 204