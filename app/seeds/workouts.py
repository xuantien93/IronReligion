# from app.models import Workout,db,SCHEMA,environment
# from sqlalchemy.sql import text
# from datetime import date
# from faker import Faker


# fake = Faker()


# def seed_workouts():
#     workout1 = Workout(
#         exercise = 'Push', user_id = 1, sets=3, reps=15,weights = 50,notes="Push day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout2 = Workout(
#         exercise = 'Pull', user_id = 1, sets=3, reps=15,weights = 70,notes="Pull day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout3 = Workout(
#         exercise = 'Legs', user_id = 1, sets=3, reps=15,weights = 100,notes="Legs day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout4 = Workout(
#         exercise = 'Arms', user_id = 2, sets=3, reps=15,weights = 20,notes="Arms day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout5 = Workout(
#         exercise = 'Back', user_id = 2, sets=3, reps=15,weights = 50,notes="Back day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout6 = Workout(
#         exercise = 'Chest', user_id = 3, sets=3, reps=15,weights = 70,notes="Chest day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )
#     workout7 = Workout(
#         exercise = 'Shoulder', user_id = 3, sets=3, reps=15,weights = 70,notes="Chest day", created_at=fake.date_between(start_date='-5y', end_date='today')
#     )

#     workouts = [workout1,workout2,workout3,workout4,workout5,workout6,workout7]
#     [db.session.add(workout) for workout in workouts]
#     db.session.commit()

# def undo_workouts():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM workouts"))

#     db.session.commit()
