from flask import Flask, render_template, request, redirect, session, send_from_directory,jsonify
from get_sql_connection import get_connection
from get_login_details_from_db import get_and_verify_pwds


connection=get_connection()

app = Flask(__name__)

@app.route('/')
def home():
        return redirect('/login')
    
@app.route('/login')
def load_login_page():
    return send_from_directory('templates', 'login.html')

@app.route('/get_username_passwords',methods=['POST'])
def access_login_db():
    request_data = request.get_json()
    username=request_data['username']
    password=request_data['password']
    status=get_and_verify_pwds(connection,username,password)
    jsonstatus=jsonify(status)
    return jsonstatus

@app.route('/maps')
def redirect_to_map():
    return render_template('map.html')

@app.route('/ui')
def redirect_to_ui():
    return render_template('ui.html')

if __name__ == '__main__':
    app.run(debug=True)

    
