from app import app, db
from models.models_user import User
from models.models_likes import Likes

with app.app_context():

  db.drop_all()
  db.create_all()

  bonnie = User(
      username="bonnie",
      email="bonnie@bonnie.com",
      password="bonnie",
      age=24,
      image="hahaha",
      postcode="SW1W 8TH"
  )

  clyde = User(
      username="clyde",
      email="clyde@clyde.com",
      password="clyde",
      age=24,
      image="hahaha",
      postcode="SW1W 8TH"
  )

  bonnie.save()
  clyde.save()

  print('Users created')

  db.session.commit()

  print('Completed!')
