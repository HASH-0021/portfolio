from flask import Flask, render_template, request, redirect
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/works')
def works():
    return render_template('index.html')

@app.route('/achievements')
def achievements():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('index.html')

def write_to_file(data):
    with open('database.csv', newline = '', mode = 'a') as database:
        csv_writer = csv.writer(database, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)
        csv_writer.writerow(list(data.values()))

@app.route("/submit_form", methods=['POST', 'GET'])
def submit_form():
    if request.method == 'POST':
        data = request.form.to_dict()
        write_to_file(data)
        return ('',204)
    else:
        return 'Something went wrong. Try again!!'