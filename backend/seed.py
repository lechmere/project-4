from app import app, db
from models.models_user import User
from models.models_likes import Likes
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
        image="https://static.wikia.nocookie.net/p__/images/d/dc/Doris_the_ugly_stepsister.jpg/revision/latest?cb=20180823201647&path-prefix=protagonist",
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
        image="https://static.wikia.nocookie.net/p__/images/d/dc/Doris_the_ugly_stepsister.jpg/revision/latest?cb=20180823201647&path-prefix=protagonist",
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
        image="https://static.wikia.nocookie.net/p__/images/d/dc/Doris_the_ugly_stepsister.jpg/revision/latest?cb=20180823201647&path-prefix=protagonist",
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
        image="https://static.wikia.nocookie.net/p__/images/d/dc/Doris_the_ugly_stepsister.jpg/revision/latest?cb=20180823201647&path-prefix=protagonist",
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
