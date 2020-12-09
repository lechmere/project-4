from app import app, db
from models.models_user import User
from models.models_likes import Likes
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
        bio="I love walks on the beach"
    )

    clyde = User(
        first_name="Clyde",
        email="clyde@clyde.com",
        password="clyde",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    gatsby = User(
        first_name="Gatsby",
        email="gatsby@gatsby.com",
        password="gatsby",
        age=24,
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        postcode="SW1W 8TH",
        bio="I love walks on the beach"
    )

    daisy = User(
        first_name="Daisy",
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

    print('Users created')

    db.session.commit()

    print('Completed!')
