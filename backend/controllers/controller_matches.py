from flask import Blueprint, request, g
from models.models_matches import Matches
from serializers.serializers_matches import MatchesSchema
from middleware.secure_route import secure_route

matches_schema = MatchesSchema()

router = Blueprint(__name__, 'matches')

# ? GETing matches data
@router.route('/matches', methods=['GET'])
@secure_route
def get_all_matches():
  matches = Matches.query.all()
  return matches_schema.jsonify(matches, many=True), 200