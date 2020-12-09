from flask import g
from flask import Blueprint, request
from models.models_user import User
from models.models_matches import Matches
from serializers.serializers_user import UserSchema
from serializers.serializers_likes import LikesSchema
from serializers.serializers_matches import MatchesSchema
from middleware.secure_route import secure_route
from models.models_likes import Likes
from marshmallow import ValidationError

user_schema = UserSchema()
likes_schema = LikesSchema()
matches_schema = MatchesSchema()

router = Blueprint(__name__, 'users')

# ? Registering a User
@router.route('/signup', methods=['POST'])
def signup():
  request_body = request.get_json()
  user = user_schema.load(request_body)
  user.save()
  return user_schema.jsonify(user), 200


# ? Logging in a user
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

# ? POSTing to likes table if current user likes the profile, and POSTing to the match
# ? table if both users have liked each other. 
@router.route('/likes', methods=['POST'])
@secure_route 
def like():
  data = request.get_json()
  data['liker_id'] = g.current_user.id

  try:
    like = likes_schema.load(data)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  like.save()
  
  # Filtering the column of liked_id by the current user
  reverse_check = Likes.query.filter_by(liked_id=g.current_user.id, liker_id=data['liked_id']).first()

  if not reverse_check:
    print('No Match Found!')
    return likes_schema.jsonify(like), 200

  else: 
    print('Match Found!')
    match = Matches(
      match_one_id=g.current_user.id,
      match_two_id=data['liked_id']
    )

    match.save()
    return matches_schema.jsonify(match), 200

  # ? GETing data for a single user
@router.route('/users/<int:id>', methods=['GET'])
@secure_route
def get_single_user(id):
  single_user = User.query.get(id)

  print(single_user)
  if not single_user: 
    return { 'message': 'No user found' }, 404

  return user_schema.jsonify(single_user), 200

# ? GETing all user data
@router.route('/users', methods=['GET'])
@secure_route
def get_all_users():
  users = User.query.all()
  return user_schema.jsonify(users, many=True), 200

# ? PUTing user data
@router.route('/users/<int:id>', methods=['PUT'])
@secure_route
def update_user(id):
  current_user = User.query.get(id)

  try:
    user = user_schema.load(
      request.get_json(),
      instance=current_user,
      partial=True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.'}
  user.save()
  return user_schema.jsonify(user), 200