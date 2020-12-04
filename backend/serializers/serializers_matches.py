from app import ma
from serializers.serializers_base import BaseSchema
from marshmallow import fields
from models.models_matches import Matches
from serializers.serializers_user import UserSchema

class MatchesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Matches
    load_instance = True

  match_one = fields.Nested('UserSchema')
  match_two = fields.Nested('UserSchema')
  match_one_id = fields.Integer()
  match_two_id = fields.Integer()