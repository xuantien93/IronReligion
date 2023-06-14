from .db import db, environment, SCHEMA, add_prefix_for_prod
import os


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

class Trainer(db.Model):
    __tablename__ = 'trainers'
    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50),nullable=False)
    image = db.Column(db.String(100))
    specialization = db.Column(db.String(2000),nullable=False)
    bio = db.Column(db.String(5000),nullable=False)
    created_at = db.Column(db.Date(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True)

    classes = db.relationship('Class',back_populates='trainer')
    users = db.relationship('User', back_populates='trainer')

    def __repr__(self):
        return f'<Trainer #{self.id} {self.first_name} {self.last_name} was created>'

    def to_dict(self):
        return {
            'id':self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'email':self.email,
            'phone':self.phone,
            'specialization':self.specialization,
            'bio':self.bio,
            'created_at':self.created_at
        }

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('trainers.id')), nullable=False)

    class_name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    time_start = db.Column(db.String(10),nullable=False)
    time_end = db.Column(db.String(10),nullable=False)
    created_at = db.Column(db.Date(), nullable=False)

    user = db.relationship('User', back_populates = 'classes')
    trainer = db.relationship('Trainer', back_populates = 'classes')

    def __repr__(self):
        return f'<Class {self.class_name} was posted by {self.trainer.first_name} {self.trainer.last_name}>'

    def to_dict(self):
        return {
            'id':self.id,
            'class_name':self.class_name,
            'date':self.date,
            'time_start':self.time_start,
            'time_end':self.time_end,
            'created_at':self.created_at,
            'user':{
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            },
            'trainer':{
                'id':self.trainer.id,
                'first_name':self.trainer.first_name,
                'last_name':self.trainer.last_name,
                'specialization':self.trainer.specialization
            }

        }

class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    exercise = db.Column(db.String(),nullable=False)
    sets = db.Column(db.Integer(),nullable=False)
    reps = db.Column(db.Integer(),nullable=False)
    weights = db.Column(db.Integer(),nullable=False)
    notes = db.Column(db.String())
    created_at = db.Column(db.Date(), nullable=False)

    user = db.relationship('User', back_populates = 'workouts')
    comments = db.relationship('Comment', back_populates='workout',cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just created Workout #{self.id}>'

    def to_dict(self):
        return {
            'id':self.id,
            'exercise':self.exercise,
            'sets':self.sets,
            'reps':self.reps,
            'weights':self.weights,
            'notes':self.notes,
            'created_at':self.created_at,
            'user':{
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            },
            'comments':{}
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String())
    created_at = db.Column(db.Date(), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('workouts.id')), nullable=False)

    user = db.relationship('User', back_populates='comments')
    workout = db.relationship('Workout', back_populates='comments')

    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just posted Comment #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'content':self.content,
            'created_at':self.created_at,
            'user': {
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            }
        }

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(),nullable=False)
    created_at = db.Column(db.Date(), nullable=False)


    reviews = db.relationship('Review', back_populates='product')
    cart = db.relationship('Cart', back_populates='products')


    def __repr__(self):
        return f'<Product {self.id} {self.name} was created>'

    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            'price':self.price,
            'description':self.description,
            'created_at':self.created_at,
            'reviews' : {}
        }


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    stars = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(5000),nullable=False)
    created_at = db.Column(db.Date(), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    product = db.relationship('Product', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')
    cart = db.relationship('Cart', back_populates='products')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, posted a new Review #{self.id}>'


    def to_dict(self):
        return {
            'id': self.id,
            'stars':self.stars,
            'content':self.content,
            'created_at':self.created_at,
            'user': {
                'id': self.user.id,
                'name':self.name,
                'price':self.price,
                'description':self.description,
                'created_at':self.created_at
            },
            'product': {
                'id':self.product.id,
                'name':self.product.name
            }
        }

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    quantity = db.Column(db.Integer())
    created_at = db.Column(db.Date(), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    products = db.relationship('Product', back_populates='cart', cascade='all, delete-orphan')
    user = db.relationship('User',back_populates='cart')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, added {self.products.name} to Cart #{self.id}>'


    def to_dict(self):
        return {
            'id':self.id,
            'quantity':self.quantity,
            'created_at':self.created_at,
            'user': {
                'id': self.user.id,
                'name':self.name,
                'price':self.price,
                'description':self.description,
                'created_at':self.created_at
            },
            'product': {
                'id':self.product.id,
                'name':self.product.name
            }
        }
