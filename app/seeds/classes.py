from app.models import Class,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime,timedelta
from faker import Faker
import random


fake = Faker()

# def seed_classes():
#     class1 = Class(
#         class_name ="Iron Titans: Total Mass Blast", trainer_id = 1, time_start=datetime(2023,7,6,hour = 9,minute = 30), time_end= datetime(2023,7,6, hour = 10, minute = 30),
#         created_at=fake.date_between(start_date='-5y', end_date='today'))

#     class2 = Class( class_name ="Muscle Mayhem: Power Pump", trainer_id = 2, time_start=datetime(2023,7,6,hour = 10,minute = 30), time_end= datetime(2023,7,6, hour = 11, minute = 30), created_at=fake.date_between(start_date='-5y', end_date='today'))

#     class3 = Class(class_name ="Sculpt & Shred: Bodybuilder's Playground",trainer_id = 3, time_start=datetime(2023,7,7,hour = 9,minute = 30), time_end= datetime(2023,7,7, hour = 10, minute = 30), created_at=fake.date_between(start_date='-5y', end_date='today'))

#     class4 = Class(class_name ="Massive Gains: Strength Fusion", trainer_id = 1, time_start=datetime(2023,7,7,hour = 8,minute = 30), time_end= datetime(2023,7,7, hour = 9, minute = 30),
# created_at=fake.date_between(start_date='-5y', end_date='today'))

#     class5 = Class(class_name ="Ripped Revolution: Hardcore Muscle Build", trainer_id = 2, time_start=datetime(2023,7,8,hour = 12 ,minute = 30), time_end= datetime(2023,7,8, hour = 13, minute = 30),created_at=fake.date_between(start_date='-5y', end_date='today'))

#     class6 = Class(class_name ="Iron Titans: Total Mass Blast", trainer_id = 3, time_start=datetime(2023,7,8,hour = 15,minute = 30),time_end= datetime(2023,7,8, hour = 16, minute = 30),
# created_at=fake.date_between(start_date='-5y', end_date='today'))

#     classes = [class1,class2,class3,class4,class5,class6]
#     [db.session.add(one_class) for one_class in classes]
#     db.session.commit()

def seed_classes():
    # Calculate the date range
    today = datetime.now().date()
    future_date = today + timedelta(days=90)
    classes=[]
    gym_class_names = [
        "Iron Titans: Total Mass Blast",
        "Muscle Mayhem: Power Pump",
        "Sculpt & Shred: Bodybuilder's Playground",
        "Massive Gains: Strength Fusion",
        "Ripped Revolution: Hardcore Muscle Build",
        "Cardio Crusher: High-Intensity Interval Training",
        "Yoga Fusion: Mind and Body Balance",
        "Cycling Surge: Endurance Challenge",
        "Bootcamp Blitz: Full-Body Conditioning",
        "Pilates Sculpt: Core Strength and Flexibility",
        "Zumba Party: Dance Fitness Extravaganza",
        "Boxing Bootcamp: Fight-Style Conditioning",
        "Functional Fitness: Real-Life Strength Training",
        "Barre Burn: Ballet-Inspired Workout",
        "TRX Suspension: Total Body Resistance",
    ]

    for i in range(15):
        # Generate a random datetime within the date range
        time_start = datetime.combine(
            random.choice([today, future_date]),
            datetime.min.time()
        ) + timedelta(hours=random.randint(0, 23), minutes=random.randint(0, 59))

        # Add a random duration of 1 to 2 hours
        duration_hours = random.randint(1, 2)
        time_end = time_start + timedelta(hours=duration_hours)
        class_name = random.choice(gym_class_names)
        # Create the class instance
        class_instance = Class(
            class_name=class_name,
            trainer_id=random.randint(1, 4),
            time_start=time_start,
            time_end=time_end,
            created_at=fake.date_between(start_date='-5y', end_date='today')
        )
        classes.append(class_instance)

    # Add classes to the database
    db.session.add_all(classes)
    db.session.commit()

def undo_classes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))

    db.session.commit()
