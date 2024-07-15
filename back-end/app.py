import os
from flask import Flask, render_template, request, send_from_directory
from config import Config
import csv,requests

app = Flask(__name__,static_folder="build/static",template_folder="build")
app.config.from_object(Config)

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'build'),'favicon.ico',mimetype='image/vnd.microsoft.com')

@app.route("/manifest.json")
def manifest():
    return send_from_directory(os.path.join(app.root_path, 'build'),'manifest.json')

@app.route("/apple-touch-icon.png")
def apple_touch_icon():
    return send_from_directory(os.path.join(app.root_path, 'build'),'apple-touch-icon.png')

@app.route("/android-chrome-192x192.png")
def android_chrome_192x192():
    return send_from_directory(os.path.join(app.root_path, 'build'),'android-chrome-192x192.png')

@app.route("/android-chrome-512x512.png")
def android_chrome_512x512():
    return send_from_directory(os.path.join(app.root_path, 'build'),'android-chrome-512x512.png')

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
        if not data['subject']:
            data['subject'] = "no_subject"
        recaptcha_token = data['g-recaptcha-response']
        del data['g-recaptcha-response']
        google_verification_api = "https://www.google.com/recaptcha/api/siteverify"
        recaptcha_request_params = {
                                    "secret"    :   app.config['RECAPTCHA_SECRET_KEY'],
                                    "response"  :   recaptcha_token
                                    }
        recaptcha_api_response = requests.post(google_verification_api, params = recaptcha_request_params)
        if recaptcha_api_response.json()["success"]:
            slack_webhook_url = app.config['SLACK_PORTFOLIO_WEBHOOK']
            slack_message = {
                                "blocks"    :   [
                                                    {
                                                        "type"  :   "header",
                                                        "text"  :   {
                                                                        "type"  :   "plain_text",
                                                                        "text"  :   f"{data['name']}"
                                                                    }
                                                    },
                                                    {
                                                        "type"  :   "section",
                                                        "text"  :   {
                                                                        "type"  :   "mrkdwn",
                                                                        "text"  :   f"*E-mail:* _{data['email']}_"
                                                                    }
                                                    },
                                                    {
                                                        "type"  :   "section",
                                                        "text"  :   {
                                                                        "type"  :   "mrkdwn",
                                                                        "text"  :   f"*Subject:* {data['subject']}"
                                                                    }
                                                    },
                                                    {
                                                        "type"  :   "section",
                                                        "text"  :   {
                                                                        "type"  :   "mrkdwn",
                                                                        "text"  :   f"*Message:*\n>_{data['message']}_"
                                                                    }
                                                    },
                                                    {
                                                        "type"  :   "section",
                                                        "text"  :   {
                                                                        "type"  :   "mrkdwn",
                                                                        "text"  :   f"<mailto:{data['email']}|Send reply>"
                                                                    }
                                                    }
                                                ]
                            }
            slack_resp = requests.post(slack_webhook_url, json = slack_message)

            if slack_resp.text == "ok":
                write_to_file(data)
                return ('',204)
            else:
                return 'Something went wrong. Try again!!'
        else:
            return ('Bots detected.',403)
    else:
        return 'Something went wrong. Try again!!'

@app.route('/update_server', methods=['POST'])
def webhook():
    import git
    import hmac
    import hashlib

    def is_valid_signature(x_hub_signature, data, private_key):
        hash_algorithm, github_signature = x_hub_signature.split('=', 1)
        algorithm = hashlib.__dict__.get(hash_algorithm)
        encoded_key = bytes(private_key, 'latin-1')
        mac = hmac.new(encoded_key, msg=data, digestmod=algorithm)
        return hmac.compare_digest(mac.hexdigest(), github_signature)
    
    if request.method == 'POST' and is_valid_signature(request.headers.get('X-Hub-Signature'), request.data, app.config['GITHUB_WEBHOOK_SECRET']):
        repo = git.Repo('/home/hash21/portfolio')
        origin = repo.remotes.origin
        origin.pull()
        return 'Updated PythonAnywhere successfully', 200
    else:
        return 'Wrong event type', 400