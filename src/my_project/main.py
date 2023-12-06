from flask import Flask
import mysql.connector
from flask import render_template, request

app = Flask(__name__, template_folder='templates')
#config Database
connection = mysql.connector.connect(
        user = 'root',
        password = '',
        host='127.0.0.1',
        port = 3306,
        database = 'todo'
)
todo = {}


@app.route("/")
def hello():
    return render_template("index.html")


@app.route('/', methods='GET')
def index():
    global todo
    if request.method == 'GET':
        todo = []
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM todos")
        data = cursor.fetchall()
        for result in data:
            item = {
                "id": result[0],
                "task": result[1],
                "status": result[2]
            }
            todo.append(item)
        cursor.close()
        connection.close()


    return render_template('index.html', data=todo)


app.run(debug=True)
