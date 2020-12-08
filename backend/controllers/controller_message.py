from flask import Blueprint, request, g
from models.models_message import Message
from models.models_user import User
from serializers.serializers_message import MessageSchema
from serializers.serializers_user import UserSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError

message_schema = MessageSchema()
user_schema = UserSchema()

router = Blueprint(__name__, 'matches')

# ? POSTing a message
@router.route('/message', methods=['POST'])
@secure_route 
def create_message():
  data = request.get_json()
  data['from_user_id'] = g.current_user.id
  print(data)

  try:
    message = message_schema.load(data)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  message.save()
  return message_schema.jsonify(message), 200

@router.route('/message', methods=['GET'])
@secure_route
def get_all_messages():
  messages = Message.query.all()
  return message_schema.jsonify(messages, many=True), 200