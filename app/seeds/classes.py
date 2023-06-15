from app.models import Class,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_classes():
    class1 = Class(
        class_name ="Iron Titans: Total Mass Blast", trainer_id = 1, date="2023-02-02", time_start="08:00", time_end="09:00",
        created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    class2 = Class( class_name ="Muscle Mayhem: Power Pump", trainer_id = 2, date="2023-05-15", time_start="10:00", time_end="11:00", created_at=fake.date_between(start_date='-5y', end_date='today')
)

    class3 = Class(class_name ="Sculpt & Shred: Bodybuilder's Playground",trainer_id = 3, date="2023-06-20", time_start="16:00", time_end="17:00", created_at=fake.date_between(start_date='-5y', end_date='today')
)

    class4 = Class(class_name ="Massive Gains: Strength Fusion", trainer_id = 1, date="2023-07-05", time_start="14:00",time_end="15:00",
created_at=fake.date_between(start_date='-5y', end_date='today')
)

    class5 = Class(class_name ="Ripped Revolution: Hardcore Muscle Build", trainer_id = 2, date="2023-05-30", time_start="18:00",time_end="19:00",created_at=fake.date_between(start_date='-5y', end_date='today')
)

    class6 = Class(class_name ="Iron Titans: Total Mass Blast", trainer_id = 13, date="2023-06-10", time_start="09:00", time_end="10:00",
created_at=fake.date_between(start_date='-5y', end_date='today')
)

    classes = [class1,class2,class3,class4,class5,class6]
    db.session.commit()


def undo_classes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))

    db.session.commit()
