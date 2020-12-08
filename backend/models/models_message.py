from app import db
from models.models_base import BaseModel
from models.models_user import User

class Message(db.Model, BaseModel):

  __tablename__ = 'messages'

  content = db.Column(db.Text)
  from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  

  from_user = db.relationship('User', backref='messages', foreign_keys=[from_user_id])
  to_user = db.relationship('User', foreign_keys=[to_user_id])

