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

def getSteamID(session):
    cursor = mysql.connection.cursor()
    session = (str(session))
    cursor.execute("select steamid from sessionLogin where sessionid=%s limit 0, 1", (session,))
    return(cursor.fetchone())
    

