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
        image="https://classiq.me/wp-content/uploads/2011/06/faye-dunaways-style-bonnie-and-clyde-e1346685504275.png",
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
        image="https://fourthandsycamore.files.wordpress.com/2015/03/bonnie-clyde-warren-posing-gun.jpg",
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
        image="https://assets.entrepreneur.com/content/3x2/2000/what-you-can-learn-from-the-great-gatsby-and-9-other-fictional-entrepreneurs.jpg",
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
        image="https://compote.slate.com/images/589ce9de-a6be-4167-b1ef-59be7f707ed6.jpg",
        postcode="SW1W 8TH",
        bio="I love big parties",
        quote="Theres no I in team",
        religion="",
        relationship="Divorced",
        children="None",
        employment="Unemployed"
    )

    romeo = User(
        first_name="Romeo",
        email="romeo@romeo.com",
        password="romeo",
        age=24,
        image="https://s30886.pcdn.co/wp-content/uploads/2019/09/10-17.jpg",
        postcode="SW1W 8TH",
        bio="Let’s talk; it is not day.",
        quote="With love’s light wings did I o’erperch these walls, for stony limits cannot hold love out",
        religion="",
        relationship="Single",
        children="No",
        employment="In the family business"
    )

    juliet = User(
        first_name="juliet",
        email="juliet@juliet.com",
        password="juliet",
        age=24,
        image="https://i.pinimg.com/originals/a7/99/15/a799157961fd2bf7037fce46647dd3c4.jpg",
        postcode="SW1W 8TH",
        bio="Romeo, Romoe",
        quote="I will kiss thy lips, Haply some poison yet doth hang on them To make me die with a restorative.",
        religion="",
        relationship="Single",
        children="No",
        employment="Unemployed"
    )

    anthony = User(
        first_name="Anthony",
        email="anthony@anthony.com",
        password="anthony",
        age=24,
        image="https://emilykazakh.files.wordpress.com/2011/10/annex-brando-marlon-julius-caesar_nrfpt_02.jpg",
        postcode="SW1W 8TH",
        bio="O happy horse, to bear the weight of Antony!",
        quote="Egypt, thou knew'st too well My heart was to thy rudder tied by th'strings And thou shouldst tow me after.",
        religion="",
        relationship="Divorced",
        children="No",
        employment="Unemployed"
    )

    cleopatra = User(
        first_name="Cleopatra",
        email="cleopatra@cleopatra.com",
        password="cleopatra",
        age=24,
        image="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/21/11/cleopatra-1.jpg",
        postcode="SW1W 8TH",
        bio="Eternity was in our lips and in our eyes.",
        quote="The odds is gone And there is nothing left remarkable Beneath the visiting moon.",
        religion="",
        relationship="Divorced",
        children="No",
        employment="Unemployed"
    )


    bonnie.save()
    clyde.save()
    gatsby.save()
    daisy.save()
    juliet.save()
    romeo.save()
    anthony.save()
    cleopatra.save()

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
      liker_id=7,
      liked_id=1  
    )

    like1.save()
    like2.save()
    like3.save()
    like4.save()

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
