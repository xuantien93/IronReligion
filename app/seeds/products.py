from app.models import Product,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()


def seed_products():
    product1 = Product(
        name = 'Shirt', price = 30.00, description= 'Workout shirt', created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    product2 = Product(
        name = 'Shorts', price = 25.00, description= 'Workout shorts', created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    product3 = Product(
        name = 'Whey protein', price = 40.00, description= 'Whey', created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    product4 = Product(
        name = 'Wrist wraps', price = 60.00, description= 'Supprt wraps', created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    product5 = Product(
        name = 'Pre workout', price = 15.00, description= 'Supplement', created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    product6 = Product(
        name = 'Creatine', price = 50.00, description= 'Supplement', created_at=fake.date_between(start_date='-5y', end_date='today')
    )


    products = [product1,product2,product3,product4,product5,product6]
    [db.session.add(product) for product in products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
