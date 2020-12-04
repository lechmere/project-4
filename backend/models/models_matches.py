from app import db
from models.models_base import BaseModel
from models.models_user import User


class Matches(db.Model, BaseModel):

  __tablename__ = 'matches'
  
  match_one_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  match_two_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  match_one = db.relationship('User', backref='matches', foreign_keys=[match_one_id])
  match_two = db.relationship('User', foreign_keys=[match_two_id])