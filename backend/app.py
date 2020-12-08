from flask import Flask
from environment.config import db_URI
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# * Configue the app to connect to postgres
# * Equivelant of mongoose connect.
app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# ---

ma = Marshmallow(app)
bcrypt = Bcrypt(app)

# ---

# ! Uncomment and update
from controllers import controller_users
from controllers import controller_matches
from controllers import controller_message
# ---

# ! Uncomment and update
app.register_blueprint(controller_users.router, url_prefix="/api")
app.register_blueprint(controller_matches.router, url_prefix="/api")
app.register_blueprint(controller_message.router, url_prefix="/api")

# ! Hello world flask app to start you off.
@app.route('/')
def index():
    return "Hello, World!"