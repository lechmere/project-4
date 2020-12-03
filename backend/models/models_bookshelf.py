from app import db
from models.models_base import BaseModel
from models.models_user import User

# ! A simple note model, for our tasting notes.
class Bookshelf(db.Model, BaseModel):

  __tablename__ = 'bookshelf'

  name = db.Column(db.Text, unique=True, nullable=False)
  author = db.Column(db.Text, unique=True, nullable=True)
  blurb = db.Column(db.Text, unique=True, nullable=True)


  # * Creates the actual column in the database:
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  # * Assosciate the 2 models together
  user = db.relationship('User', backref='bookshelf')