from app import db, bcrypt
from models.models_base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt
from environment.config import secret

class User(db.Model, BaseModel):

  __tablename__ = 'users'

  first_name = db.Column(db.String(15), nullable=False, unique=False)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=True)
  age = db.Column(db.Integer, nullable=False)
  image = db.Column(db.Text)
  postcode = db.Column(db.Text, nullable=False)
  bio = db.Column(db.String(180), nullable=False)
  quote = db.Column(db.String(350))
  religion = db.Column(db.Text)
  relationship = db.Column(db.Text)
  children = db.Column(db.Text)
  employment = db.Column(db.Text)

  # * --- PASSWORD STUFF
  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  # ? password_plaintext is the password the user tries to login with
  def validate_password(self, password_plaintext):
    # ? Use bcrypt to check the pw
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)

# * --- TOKEN
  def generate_token(self):

    # ? This goes inside the token.
    payload = {
      # * Expire 24 hours from now!
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }

    # ? Create the token
    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token