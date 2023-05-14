import OpenIDAuth, json, getData
from flask import Flask, session, g, redirect
from flask_session import Session
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)

with open('DatabaseCredentials.json') as DatabaseCredentials:
    DatabaseCredentialsJson = json.load(DatabaseCredentials)

app.config['MYSQL_HOST'] = DatabaseCredentialsJson['HOST']
app.config['MYSQL_PORT'] = DatabaseCredentialsJson['PORT']
app.config['MYSQL_USER'] = DatabaseCredentialsJson['USER']
app.config['MYSQL_PASSWORD'] = DatabaseCredentialsJson['PASSWORD']
app.config['MYSQL_DB'] = DatabaseCredentialsJson['DB']

mysql = MySQL(app)

app.add_url_rule('/checkUserStatus', view_func=OpenIDAuth.checkUserStatus)
app.add_url_rule('/login', view_func=OpenIDAuth.login)
app.add_url_rule('/authorize', view_func=OpenIDAuth.authorize)
app.add_url_rule('/getUserName', view_func=getData.getUserName)
app.add_url_rule('/getSessionSID', view_func=getData.getSessionSID)
app.add_url_rule('/getUserProfilePicture', view_func=getData.getUserProfilePicture)
app.add_url_rule('/getUserGames', view_func=getData.getUserGames)
app.add_url_rule('/getAchievements', view_func=getData.getAchievements, methods=["POST"])

@app.before_first_request
def check_user_log_in():
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO sessionLogin VALUES(7183)''') #Dummy Value
    mysql.connection.commit()
    cursor.close()

    # if 'id' in session:
    #     print(f"{session['id']} is here!")
    #     g.user = session['id']
    # else:
    #     g.user = 'none'    

if __name__ == "__main__":
    app.run(debug = True, use_reloader=True)
