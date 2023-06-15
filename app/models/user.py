from .db import db, environment, SCHEMA, add_prefix_for_prod
from .models import enrollments
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10),nullable=False)
    phone = db.Column(db.String(12),nullable=False)
    birthday = db.Column(db.String(),nullable=False)
    status = db.Column(db.String(),nullable=False)
    enrolled_with_coach = db.Column(db.Boolean(),default=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.Date(), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    trainer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('trainers.id')), nullable=True)

    trainer = db.relationship('Trainer', back_populates='users')
    classes = db.relationship('Class', back_populates='user')
    workouts = db.relationship('Workout', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
    cart = db.relationship('Cart', back_populates='user')
    routines = db.relationship('Routine', back_populates='user')


    user_enrollments = db.relationship(
        'Trainer',
        secondary = enrollments,
        back_populates = 'trainer_enrollments'
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'gender':self.gender,
            'phone':self.phone,
            'birthday':self.birthday,
            'status':self.status,
            'enrolled_with_coach':self.enrolled_with_coach,
            'trainer_id':self.trainer_id,
            'created_at':self.created_at
        }
