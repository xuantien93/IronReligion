from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo123', email='demo@aa.io',first_name='Demo',last_name='Lition',gender='M',phone='469-999-8888',birthday="1993-02-14",status='Active', enrolled_with_coach=True, password='password',created_at=fake.date_between(start_date='-5y', end_date='today'),trainer_id = 2 )
    marnie = User(
        username='Marnie', email='marnie@aa.io',first_name='Marnie',last_name='Doe',gender='F',phone='469-999-8888',birthday="1993-02-14",status='Active', enrolled_with_coach=True, password='password',created_at=fake.date_between(start_date='-5y', end_date='today'),trainer_id = 3)
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io',first_name='Bobbie',last_name='Doe',gender='M',phone='469-999-8888',birthday="1993-02-14",status='Active', enrolled_with_coach=True, password='password',created_at=fake.date_between(start_date='-5y', end_date='today'),trainer_id = 1)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
