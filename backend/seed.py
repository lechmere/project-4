from app import app, db
from models.models_user import User
from models.models_likes import Likes
from models.models_matches import Matches
from models.models_message import Message

with app.app_context():

    db.drop_all()
    db.create_all()

    bonnie = User(
        username="bonnie",
        first_name="Bonnie",
        last_name="Smith",
        email="bonnie@bonnie.com",
        password="bonnie",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    clyde = User(
        username="clyde",
        first_name="Clyde",
        last_name="Smith",
        email="clyde@clyde.com",
        password="clyde",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    gatsby = User(
        username="gatsby",
        first_name="Gatsby",
        last_name="Smith",
        email="gatsby@gatsby.com",
        password="gatsby",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    daisy = User(
        username="daisy",
        first_name="Daisy",
        last_name="Smith",
        email="daisy@daisy.com",
        password="daisy",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    bonnie.save()
    clyde.save()
    gatsby.save()
    daisy.save()

    like1 = Likes(
      liker_id=2,
      liked_id=1  
    )

    like2 = Likes(
      liker_id=3,
      liked_id=1  
    )

    like3 = Likes(
      liker_id=4,
      liked_id=1  
    )

    like4 = Likes(
      liker_id=3,
      liked_id=4  
    )

    like5 = Likes(
      liker_id=4,
      liked_id=3  
    )

    like1.save()
    like2.save()
    like3.save()
    like4.save()
    like5.save()

    match1 = Matches(
        match_one_id=3,
        match_two_id=4,
    )

    match1.save()
    
    print('Users created')

    db.session.commit()

    print('Completed!')
