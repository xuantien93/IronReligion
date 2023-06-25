from app.models import Class,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime
from faker import Faker


fake = Faker()

def seed_classes():
    class1 = Class(
        class_name ="Iron Titans: Total Mass Blast", trainer_id = 1, time_start=datetime(2023,6,25,hour = 9,minute = 30), time_end= datetime(2023,6,25, hour = 10, minute = 30),
        created_at=fake.date_between(start_date='-5y', end_date='today'))

    class2 = Class( class_name ="Muscle Mayhem: Power Pump", trainer_id = 2, time_start=datetime(2023,6,25,hour = 10,minute = 30), time_end= datetime(2023,6,25, hour = 11, minute = 30), created_at=fake.date_between(start_date='-5y', end_date='today'))

    class3 = Class(class_name ="Sculpt & Shred: Bodybuilder's Playground",trainer_id = 3, time_start=datetime(2023,6,26,hour = 9,minute = 30), time_end= datetime(2023,6,26, hour = 10, minute = 30), created_at=fake.date_between(start_date='-5y', end_date='today'))

    class4 = Class(class_name ="Massive Gains: Strength Fusion", trainer_id = 1, time_start=datetime(2023,6,27,hour = 8,minute = 30), time_end= datetime(2023,6,27, hour = 9, minute = 30),
created_at=fake.date_between(start_date='-5y', end_date='today'))

    class5 = Class(class_name ="Ripped Revolution: Hardcore Muscle Build", trainer_id = 2, time_start=datetime(2023,6,27,hour = 12 ,minute = 30), time_end= datetime(2023,6,27, hour = 13, minute = 30),created_at=fake.date_between(start_date='-5y', end_date='today'))

    class6 = Class(class_name ="Iron Titans: Total Mass Blast", trainer_id = 3, time_start=datetime(2023,6,27,hour = 15,minute = 30),time_end= datetime(2023,6,27, hour = 16, minute = 30),
created_at=fake.date_between(start_date='-5y', end_date='today'))

    classes = [class1,class2,class3,class4,class5,class6]
    [db.session.add(one_class) for one_class in classes]
    db.session.commit()


def undo_classes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))

    db.session.commit()
