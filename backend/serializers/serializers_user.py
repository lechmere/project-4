from app import ma
from serializers.serializers_base import BaseSchema
from models.models_user import User
from marshmallow import fields
from marshmallow import validates_schema
from flask import request

class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

  password = fields.String(required=True)
  password_confirmation = fields.String(required=False)

  @validates_schema
  def check_passwords_match(self, data, **kwargs):
    if request.method == 'POST':
      if data['password'] != data['password_confirmation']:
        raise ValidationError(
          'Passwords do not match',
          'password_confirmation'
        )
