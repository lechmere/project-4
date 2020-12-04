from app import ma
from serializers.serializers_base import BaseSchema
from marshmallow import fields
from models.models_likes import Likes
from serializers.serializers_user import UserSchema

class LikesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Likes
    load_instance = True

  liker = fields.Nested('UserSchema')
  liker_id = fields.Integer()
  liked_id = fields.Integer()
  