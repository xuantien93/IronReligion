from app.models import Routine,Workout,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()

def seed_routines():
    routine1 = Routine(
       user_id = 1, description = "Push day routine", image="https://i.imgur.com/xMh6K93.jpg",created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    workout1 = Workout(
        exercise = 'Db Incline press', user_id = 1, sets=1, reps=10 ,weights = 120,notes="True 10 reps with slow eccentric", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout2 = Workout(
        exercise = 'Machine chest press', user_id = 1, sets=1, reps=15,weights = 300,notes="Rest Pause", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout3 = Workout(
        exercise = 'Weighted Dips/Machine Dips', user_id = 1, sets=2, reps=15,weights = 100,notes="2 straight sets", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout4 = Workout(
        exercise = 'Cable fly', user_id = 1, sets=3, reps=15,weights = 70,notes="3 sets to failure", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout5 = Workout(
        exercise = 'Single arm tricep extension', user_id = 1, sets=1, reps=20,weights = 40,notes="Rest Pause", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout6 = Workout(
        exercise = 'Skull Crushers', user_id = 1, sets=2, reps=15,weights = 90,notes="2 straight sets", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout7 = Workout(
        exercise = 'V-bar tricep push down', user_id = 1, sets=1, reps=20,weights = 200,notes="Rest Pause", created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    routine1.workouts.extend([workout1,workout2,workout3,workout4,workout5,workout6,workout7])

    routine2 = Routine(
        user_id = 2, description = "Pull day routine",image="https://i.imgur.com/sBcWBCw.jpg",created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    workout8 = Workout(
        exercise = 'Cable Pull Over', user_id = 2, sets=1, reps=20 ,weights = 93,notes="Rest Pause", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout9 = Workout(
        exercise = 'Assisted Pull Up', user_id = 2, sets=3, reps=15,weights = 80,notes="3 sets with first set to 15 then the rest to failure", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout10 = Workout(
        exercise = 'V-bar pull down', user_id = 2, sets=2, reps=10,weights = 231,notes="First set to 10, second set drop set x 3", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout11 = Workout(
        exercise = 'Bent Over Row', user_id = 2, sets=2, reps=10,weights = 230,notes="First set to 10, second set to failure", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout12 = Workout(
        exercise = 'Db row', user_id = 2, sets=2, reps=12,weights = 95,notes="First set to 12, second set to failure", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout13 = Workout(
        exercise = 'Stiff Leg Deadlift', user_id = 2, sets=2, reps=10,weights = 95,notes="First set to 10, second set to 12-15 with lower weights", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout14 = Workout(
        exercise = 'Standing DB curls', user_id = 2, sets=2, reps=15,weights = 40,notes="2 straight sets", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout15 = Workout(
        exercise = 'Standing DB hammer curls', user_id = 2, sets=2, reps=15,weights = 40,notes="2 straight sets", created_at=fake.date_between(start_date='-5y', end_date='today')
    )


    routine2.workouts.extend([workout8,workout9,workout10,workout11,workout12,workout13,workout14,workout15])

    routine3 = Routine(
        user_id = 3, description = "Legs day routine",image="https://i.imgur.com/j5Jq9WJ.jpg",created_at=fake.date_between(start_date='-5y', end_date='today')
    )


    workout16 = Workout(
        exercise = 'Barbell Squat', user_id = 3, sets=4, reps=10,weights = 320,notes="First set to 10, last 3 sets back off 20% to 10", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout17 = Workout(
        exercise = 'Legs press', user_id = 3, sets=1, reps=20,weights = 450,notes="1 set to 15, rest then another 5", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout18 = Workout(
        exercise = 'Legs extension', user_id = 3, sets=3, reps=15,weights = 140,notes="3 sets to 15 or failure, superset with legs curl", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout19 = Workout(
        exercise = 'Lying legs extension', user_id = 3, sets=3, reps=15,weights = 140,notes="3 sets to 15 or failure, superset with legs extension", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout20 = Workout(
        exercise = 'Walking Lunges', user_id = 3, sets=2, reps=15,weights = 35,notes="2 sets to failure", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout21 = Workout(
        exercise = 'Adduction', user_id = 3, sets=2, reps=15,weights = 250,notes="1st set to 15, 2nd set rest pause", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout22 = Workout(
        exercise = 'Standing Calves Raise', user_id = 3, sets=2, reps=15,weights = 130,notes="2 straight sets", created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    workout23 = Workout(
        exercise = 'Seated Calves Raise', user_id = 3, sets=1, reps=15,weights = 90,notes="1 set RP with 5 seconds eccentric", created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    routine3.workouts.extend([workout16,workout17,workout18,workout19,workout20,workout21,workout22,workout23])

    routines = [routine1, routine2, routine3]

    [db.session.add(routine) for routine in routines]
    db.session.commit()


def undo_routines():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.routines RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routines"))

    db.session.commit()
