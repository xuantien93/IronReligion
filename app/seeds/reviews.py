from app.models import Review,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_reviews():
    review1 = Review(
        stars = 5, content = "very nice shirt", product_id = 1 , user_id = 1
    )
    review2 = Review(
        stars = 4, content = "Dope shirt", product_id = 1 , user_id = 1
    )
    review3 = Review(
        stars = 5, content = "very nice short", product_id = 2,user_id = 2
    )
    review4 = Review(
        stars = 3, content = "fits perfectly", product_id = 2,user_id = 2
    )
    review5 = Review(
        stars = 4, content = "Feeling the gains", product_id = 3,user_id = 3
    )
    review6 = Review(
        stars = 5, content = "Good flavor", product_id = 3,user_id = 3
    )
    review7 = Review(
        stars = 4, content = "Worth the money", product_id = 4,user_id = 3
    )
    review8 = Review(
        stars = 3, content = "Very snug", product_id = 4,user_id = 3
    )
    review9 = Review(
        stars = 4, content = "No jittery", product_id = 5,user_id = 3
    )
    review10 = Review(
        stars = 5, content = "Feeling pump", product_id = 6,user_id = 3
    )


    reviews = [review1,review2,review3,review4,review5,review6,review7,review8,review9,review10]
    [db.session.add(review) for review in reviews]
    db.session.commit()



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
