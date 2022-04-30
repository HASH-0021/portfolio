from flask import Flask, render_template, request, redirect
import csv

app = Flask(__name__)

@app.route("/")
def my_home():
    return render_template('index.html')

@app.route("/<string:page_name>")
def html_page(page_name):
    return render_template(f'{page_name}.html')

def write_to_file(data):
    with open('database.csv', newline = '', mode = 'a') as database:
        csv_writer = csv.writer(database, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)
        csv_writer.writerow(list(data.values()))

@app.route("/submit_form", methods=['POST', 'GET'])
def submit_form():
    if request.method == 'POST':
        data = request.form.to_dict()
        write_to_file(data)
        return redirect('/thank_you')
    else:
        return 'Something went wrong. Try again!!'