# File used to initilize the Database so we can access it in other files
from flask_mysqldb import MySQL

mysql = MySQL()

def addUser(session, steamid):
    cursor = mysql.connection.cursor()
    insertStatement = ''' INSERT INTO sessionLogin VALUES(%s, %s)'''
    data = (session, steamid)
    cursor.execute(insertStatement, data)
    mysql.connection.commit()
    cursor.close()

def createJWT(JWT, authToken):
    cursor = mysql.connection.cursor()
    insertStatement = ''' INSERT INTO JWTLogin VALUES(%s, %s)'''
    data = (JWT, authToken)
    cursor.execute(insertStatement, data)
    mysql.connection.commit()
    cursor.close()

def getSteamID(session):
    cursor = mysql.connection.cursor()
    session = (str(session))
    cursor.execute("select steamid from sessionLogin where sessionid=%s limit 0, 1", (session,))
    return(cursor.fetchone())

def getSteamJWT(authToken):
    cursor = mysql.connection.cursor()
    authToken = (str(authToken))
    cursor.execute("select JWT from JWTLogin where authToken=%s limit 0, 1", (authToken,))
    return(cursor.fetchone())