from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import mysql.connector
import util
import reports
import lazy_predict,add_usage
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = '1234'  # Change this to a secure secret key

# MySQL configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Krishna@99',
    'database': 'electricity_consumption'
}

# Function to connect to the MySQL database
def connect_db():
    return mysql.connector.connect(**db_config)

# Route to render the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = connect_db()
        cursor = conn.cursor()

        # Check if user exists in the database
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()

        if user:
            # If the user exists, store their ID in the session
            session['user_id'] = user[0]
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid credentials. Please try again.'
            return render_template('login.html', error=error)

    return render_template('login.html')

# Route to render the registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = connect_db()
        cursor = conn.cursor()

        # Check if the username already exists in the database
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            error = 'Username already exists. Please choose a different one.'
            return render_template('login.html', error=error)

        # Insert the new user into the database
        cursor.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, password))
        conn.commit()

        # Once registered, redirect to the login page
        return redirect(url_for('login'))

    return render_template('login.html')

# Route to render the dashboard page (requires authentication)
@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        return render_template('index.html')
    else:
        return redirect(url_for('login'))

# Route to handle logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/addusage')
def addusage():
    return render_template('addusage.html')

# @app.route('/app')
# def app():
#     return render_template('app.html')

@app.route('/report')
def report():
    return render_template('report.html')

@app.route('/report2')
def report2():
    return render_template('report2.html')





@app.route('/get_State_names',  methods=['GET'])
def get_State_names():
    response = jsonify({
        'States': util.get_State_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_electricity_lazy_predict', methods=['GET', 'POST'])
def predict_electricity_lazy_predict():
    Month = int(request.form['Month'])
    Day = int(request.form['Day'])
    # print(Month)
    State = request.form['State']
    # print(State)
    response = jsonify({
        "estimated_usage": lazy_predict.predict_usage(State, Day, Month)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_state_usage',  methods=['GET', 'POST'])
def get_state_usage():
    result = util.state_usage()
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_monthwise_report',  methods=['GET', 'POST'])
def get_monthwise_report():
    State = request.form['State']
    Year = request.form['Year']
    result = reports.get_monthwise_report(State, Year)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_month_usage_details',  methods=['GET', 'POST'])
def get_month_usage_details():
    State = request.form['State']
    Month = request.form['Month']
    Year = request.form['Year']
    print(Month)
    result = reports.get_month_usage_details(State, Month, Year)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/add_usage',  methods=['GET', 'POST'])
def add_usage_csv():
    State = request.form['State']
    Date = request.form['Date']
    Usage = request.form['Usage']
    print(State,Date,Usage)
    new_record = [State, 'NA', 'NA', 'NA', Date, Usage]
    result = add_usage.add_record_to_csv(new_record)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/data_vizualization',  methods=['GET', 'POST'])
def data_vizualization():
    State = request.form['State']
    Year = request.form['Year']
    result = reports.data_vizualization(State, Year)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    print("starting python flask eletricity consumption..")
    util.load_saved_artifacts()
    app.run()