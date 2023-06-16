# File used to initilize the Database so we can access it in other files
from flask_mysqldb import MySQL

mysql = MySQL()

def createSteamID(steamid, authToken):
    cursor = mysql.connection.cursor()
    insertStatement = ''' INSERT INTO SteamLogin VALUES(%s, %s)'''
    data = (steamid, authToken)
    cursor.execute(insertStatement, data)
    mysql.connection.commit()
    cursor.close()

def getSteamID(authToken):
    cursor = mysql.connection.cursor()
    authToken = (str(authToken))
    cursor.execute("select steamid from SteamLogin where authToken=%s limit 0, 1", (authToken,))
    SteamID = cursor.fetchone()[0]
    print(SteamID)
    cursor.execute("delete from SteamLogin where steamid = %s", [SteamID])
    mysql.connection.commit()
    cursor.close()
    return(SteamID)