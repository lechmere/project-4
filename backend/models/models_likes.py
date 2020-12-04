from app import db
from models.models_base import BaseModel
from models.models_user import User


class Likes(db.Model, BaseModel):

  __tablename__ = 'likes'
  
  liker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  liked_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  liker = db.relationship('User', backref='likes', foreign_keys=[liker_id])
  liked = db.relationship('User', foreign_keys=[liked_id])

