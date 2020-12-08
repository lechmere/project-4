from app import ma
from marshmallow import fields
from serializers.serializers_base import BaseSchema
from models.models_message import Message
from serializers.serializers_user import UserSchema

class MessageSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = Message
    load_instance = True

  from_user = fields.Nested('UserSchema')
  to_user = fields.Nested('UserSchema')

  from_user_id = fields.Integer()
  to_user_id = fields.Integer()
