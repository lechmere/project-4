from flask import g
from flask import Blueprint, request
from models.models_user import User
from serializers.serializers_user import UserSchema
from serializers.serializers_likes import LikesSchema
from middleware.secure_route import secure_route
from models.models_likes import Likes
from marshmallow import ValidationError

user_schema = UserSchema()
likes_schema = LikesSchema()

router = Blueprint(__name__, 'users')

@router.route('/signup', methods=['POST'])
def signup():
  request_body = request.get_json()
  user = user_schema.load(request_body)
  user.save()
  return user_schema.jsonify(user), 200


@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'No user found with this email.' }, 200

  if not user.validate_password(data['password']):
    return { 'message': 'Unauthorized' }, 402

  token = user.generate_token()

  return { 'token': token, 'message': 'Welcome back' }


@router.route('/likes', methods=['POST'])
@secure_route 
def like():
  data = request.get_json()

  instance = Likes(
    liker_id = g.current_user.id,
    # liked_id = data['liked_id']
  )

  instance.save()

  try:
    like = likes_schema.load(instance)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }


  like.save()

  return likes_schema.jsonify(like), 200