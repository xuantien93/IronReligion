from app.models import Comment,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()


def seed_comments():
    comment1 = Comment(
        content="Great work out", user_id = 3, routine_id = 1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment2 = Comment(
        content="Awesome work out, Love it", user_id = 2, routine_id = 1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment3 = Comment(
        content="Tried it again a week after, amazing workout", user_id = 3, routine_id = 1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment4 = Comment(
        content="Love it", user_id = 1, routine_id = 2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment5 = Comment(
        content="Killing it", user_id = 3, routine_id = 2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment6 = Comment(
        content="Let's go", user_id = 1, routine_id = 2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment7 = Comment(
        content="My legs were so sore the next day", user_id = 2, routine_id = 3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    comment8 = Comment(
        content="Awesome legs workout", user_id = 3, routine_id = 3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    comments = [comment1,comment2,comment3,comment4,comment5,comment6,comment7,comment8]
    [db.session.add(comment) for comment in comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
