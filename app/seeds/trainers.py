from app.models import Trainer,db,SCHEMA,environment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_trainers():
    trainer1 = Trainer(
        first_name = 'Matt', last_name='Jansen',email='matt@jansen.io',phone='469-999-8888', image='https://i.imgur.com/u42anGe.png',specialization='Bodybuilding Coach',bio="Matt has coached 16 IFBB pros to the Olympia in Mens Open, 212, figure and women's physique divisions. Among those athletes (not including the 5 qualifications for 2018) he has had four top 5 finishes, and three top 10 finishes. To this day one of the things he enjoys most within coaching is helping amateur athletes attain pro status",created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    trainer2 = Trainer(
        first_name = 'Dom', last_name='Kuza',email='dom@kuza.io',phone='469-888-6666', image='https://i.imgur.com/Q2HtWGE.jpg',specialization='Powerlifting Coach',bio="Dominic Kuza is a Nutrition Coach from Southeast Michigan. He works with a wide range of clientele including: competitive athletes, lifestyle/general population clients, collegiate athletes, and is an extensive educator for coaches looking to expand their knowledge. Dom graduated from Oakland University with a Master of Science in Exercise Sciences with his course concentration in exercise, muscle, and advanced medical physiology.",created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    trainer3 = Trainer(
        first_name = 'Tien', last_name='Hoang',email='tien@hoang.io',phone='469-888-2222', image='https://i.imgur.com/EBhQffE.jpg',specialization='Bodybuilding Coach',bio="Tien Hoang is a Nutrition Coach based in Dallas, Texas. He specializes in working with a diverse range of clients, including competitive athletes, lifestyle/general population clients, collegiate athletes, and serves as a comprehensive educator for coaches seeking to enhance their expertise. Having graduated from the University of Texas in Arlington, Tien has a deep understanding of the local fitness landscape and is well-versed in tailoring his coaching approach to the unique needs and preferences of individuals in the Dallas area. His passion for nutrition and exercise, combined with his commitment to ongoing education, enables him to stay at the forefront of industry advancements and deliver cutting-edge strategies to his clients.",created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    trainer3 = Trainer(
        first_name = 'Quinn', last_name='Raulerson',email='quinn@raulerson.io',phone='469-222-3122', image='https://i.imgur.com/wnJGaGg.jpg',specialization='Powerlifting Coach',bio="Hi, my name is Quinn. I am a Certified Personal Trainer (CPT) and a two-time FHSAA weightlifting state champion. Additionally, I have achieved two national powerlifting titles. I am also the founder of Erratic Strength. As a Nutrition Coach from Gainesville Florida, I specialize in working with a diverse range of clients, including competitive athletes, lifestyle/general population clients, and collegiate athletes. I am passionate about educating coaches/clients and expanding their knowledge in the field. I am currently pursuing a comprehensive education at Missouri University, where I am specializing in Anesthesiologist Assistant studies. Alongside my primary program, I have chosen to minor in Exercise Sciences, focusing specifically on exercise, muscle, and advanced medical physiology. This deliberate combination of disciplines will greatly enhance my understanding and proficiency in training clients effectively. By incorporating the intricacies of human physiology and the principles of exercise science into my skill set, I am equipping myself with a solid foundation to excel in the field of healthcare and optimize client outcomes.",created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    trainers = [trainer1,trainer2,trainer3]
    [db.session.add(trainer) for trainer in trainers]
    db.session.commit()



def undo_trainers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.trainers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM trainers"))

    db.session.commit()
