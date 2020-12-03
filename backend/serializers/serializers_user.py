from app import ma
from serializers.serializers_base import BaseSchema
from models.models_user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

  password = fields.String(required=True)
