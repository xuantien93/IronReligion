from app.models import Booking,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import datetime
from faker import Faker


fake = Faker()

def seed_bookings():
    booking1 = Booking(
        class_id=1,
        user_id=3,
        time_start=datetime(2023,6,19, hour = 9,minute = 30),
        time_end= datetime(2023,6,19, hour = 10, minute = 30),
    )
    booking2 = Booking(
        class_id=2,
        user_id=1,
        time_start=datetime(2023,6,20,hour = 10,minute = 30),
        time_end= datetime(2023,6,20, hour = 11, minute = 30),
    )
    booking3 = Booking(
        class_id=3,
        user_id=2,
        time_start=datetime(2023,6,21,hour = 9,minute = 30),
        time_end= datetime(2023,6,21, hour = 10, minute = 30),
    )
    booking4 = Booking(
        class_id=4,
        user_id=3,
        time_start=datetime(2023,6,22,hour = 8,minute = 30),
        time_end= datetime(2023,6,22, hour = 9, minute = 30),
    )
    booking5 = Booking(
        class_id=5,
        user_id=1,
        time_start=datetime(2023,6,23,hour = 12 ,minute = 30),
        time_end= datetime(2023,6,23, hour = 13, minute = 30),
    )
    booking6 = Booking(
        class_id=6,
        user_id=2,
        time_start=datetime(2023,6,24,hour = 15,minute = 30),
        time_end= datetime(2023,6,24, hour = 16, minute = 30),
    )

    bookings = [booking1,booking2,booking3,booking4,booking5,booking6]
    [db.session.add(booking) for booking in bookings]
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
