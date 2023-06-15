from ..models.models import db, enrollments , environment, SCHEMA

from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text


def seed_enrollments():

        enrollment_seeds = [
        {'trainer_id': 1, 'user_id': 3},
        {'trainer_id': 2, 'user_id': 1},
        {'trainer_id': 3, 'user_id': 2}
        # Add more enrollment seeds as needed
    ]

        enrollment_seeds = insert(enrollments).values(enrollment_seeds)


        try:
            db.session.execute(enrollment_seeds)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()

def undo_enrollments():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.enrollments RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM enrollments"))

  db.session.commit()
