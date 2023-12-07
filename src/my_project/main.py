from flask import Flask , g, url_for, redirect
import mysql.connector
from flask import render_template, request, jsonify

app = Flask(__name__)


def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="todo"
        )
    return g.db

@app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
        
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def todos():
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM todos")
        tasks = cursor.fetchall()
        return jsonify(tasks), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



@app.route('/update/<int:id>', methods=['POST'])
def update_todo(id):
    try:
        db = get_db()
        cursor = db.cursor()
        task = request.form['task']
        status = request.form['status']
        cursor.execute("UPDATE todos SET task = %s, status = %s WHERE id = %s", (task, status, id))
        db.commit()
        return jsonify({'task': task, 'status': status}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



@app.route('/add', methods=['POST'])
def add_todo():
    if request.method == 'POST':
        try:
            db = get_db()
            cursor = db.cursor()
            task = request.form['task']
            status = '1' if request.form.get('status') else '0'
            cursor.execute("INSERT INTO todos (task, status) VALUES (%s, %s)", (task, status))
            db.commit()
            return jsonify({'task': task, 'status': status}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400


@app.route('/delete/<int:id>', methods=['POST'])
def delete_todo(id):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM todos WHERE id = %s", (id,))
        db.commit()
        return jsonify({'success': 'Task deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



app.run(debug=True)
