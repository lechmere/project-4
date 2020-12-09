from app import app, db
from models.models_user import User
from models.models_likes import Likes
from models.models_matches import Matches
from models.models_message import Message

with app.app_context():

    db.drop_all()
    db.create_all()

    bonnie = User(
        first_name="Bonnie",
        email="bonnie@bonnie.com",
        password="bonnie",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach",
        quote="I am the best!",
        religion="Christian",
        relationship="Married",
        children="No",
        employment="Trade"
    )

    clyde = User(
        first_name="Clyde",
        email="clyde@clyde.com",
        password="clyde",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="Money is the way to my heart",
        quote="",
        religion="Jewish",
        relationship="Married",
        children="No",
        employment="Armed Forces"
    )

    gatsby = User(
        first_name="Gatsby",
        email="gatsby@gatsby.com",
        password="gatsby",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I prefer blondes",
        quote="A little party never killed nobody...",
        religion="Athiest",
        relationship="Single",
        children="No",
        employment="Veteran"
    )

    daisy = User(
        first_name="Daisy",
        email="daisy@daisy.com",
        password="daisy",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love big parties",
        quote="Theres no I in team",
        religion="",
        relationship="Divorced",
        children="No",
        employment="Unemployed"
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

    like6 = Likes(
      liker_id=3,
      liked_id=2  
    )

    like7 = Likes(
      liker_id=2,
      liked_id=3  
    )

    like1.save()
    like2.save()
    like3.save()
    like4.save()
    like5.save()
    like6.save()
    like7.save()

    match1 = Matches(
        match_one_id=3,
        match_two_id=4,
    )

    match2 = Matches(
        match_one_id=3,
        match_two_id=2,
    )

    match1.save()
    match2.save()
    
    print('Users created')

    db.session.commit()

    print('Completed!')
