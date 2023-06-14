from app.models import Routine,Workout,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()

def seed_routines():
    routine1 = Routine(
       user_id = 1, notes = "Push day routine",created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    workout1 = Workout(
        exercise = 'Exercise 1', user_id = 1, sets=3, reps=15,weights = 50,notes="Push day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout2 = Workout(
        exercise = 'Exercise 2s', user_id = 1, sets=3, reps=15,weights = 70,notes="Pull day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout3 = Workout(
        exercise = 'Exercise 3', user_id = 1, sets=3, reps=15,weights = 100,notes="Legs day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    routine1.workouts.extend([workout1,workout2,workout3])

    routine2 = Routine(
        user_id = 2, notes = "Pull day routine",created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    workout4 = Workout(
        exercise = 'Arms', user_id = 2, sets=3, reps=15,weights = 20,notes="Arms day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout5 = Workout(
        exercise = 'Back', user_id = 2, sets=3, reps=15,weights = 50,notes="Back day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout6 = Workout(
        exercise = 'Chest', user_id = 2, sets=3, reps=15,weights = 70,notes="Chest day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    routine2.workouts.extend([workout4,workout5,workout6])

    routine3 = Routine(
        user_id = 3, notes = "Legs day routine",created_at=fake.date_between(start_date='-5y', end_date='today')
    )


    workout7 = Workout(
        exercise = 'Shoulder', user_id = 3, sets=3, reps=15,weights = 70,notes="Chest day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout8 = Workout(
        exercise = 'Ham', user_id = 3, sets=3, reps=15,weights = 100,notes="Ham day", created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    routine3.workouts.extend([workout7,workout8])

    routines = [routine1, routine2, routine3]

    [db.session.add(routine) for routine in routines]
    db.session.commit()


def undo_routines():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.routines RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routines"))

    db.session.commit()
