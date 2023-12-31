from .db import db, environment, SCHEMA, add_prefix_for_prod
import os


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


enrollments = db.Table(
    'enrollments',
    db.Model.metadata,
    db.Column('user_id',db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column('trainer_id',db.Integer,db.ForeignKey(add_prefix_for_prod('trainers.id')),primary_key=True)

)

if environment == "production":
    enrollments.schema = SCHEMA


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
    # user_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('users.id')), nullable=False)
    trainer_enrollments = db.relationship(
        'User',
        secondary = enrollments,
        back_populates = 'user_enrollments'
    )

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
            'image':self.image,
            'specialization':self.specialization,
            'bio':self.bio,
            'created_at':self.created_at
        }

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    trainer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('trainers.id')), nullable=False)

    class_name = db.Column(db.String(50), nullable=False)
    # date = db.Column(db.Date(), nullable=False)
    time_start = db.Column(db.DateTime(),nullable=False)
    time_end = db.Column(db.DateTime(),nullable=False)
    created_at = db.Column(db.Date(), nullable=False)


    trainer = db.relationship('Trainer', back_populates = 'classes')
    bookings = db.relationship('Booking',back_populates='one_class')

    def __repr__(self):
        return f'<Class {self.class_name} was posted by {self.trainer.first_name} {self.trainer.last_name}>'

    def to_dict(self):
        return {
            'id':self.id,
            'class_name':self.class_name,
            'trainer_id':self.trainer_id,
            # 'date':self.date,
            'time_start':self.time_start,
            'time_end':self.time_end,
            'created_at':self.created_at,
            'trainer':{
                'id':self.trainer.id,
                'first_name':self.trainer.first_name,
                'last_name':self.trainer.last_name,
                'specialization':self.trainer.specialization
            }

        }


class Booking(db.Model):
    __tablename__='bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('classes.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    time_start = db.Column(db.DateTime())
    time_end = db.Column(db.DateTime())

    user = db.relationship('User', back_populates='bookings')
    one_class = db.relationship('Class', back_populates='bookings')

    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just created Booking #{self.id}>'

    def to_dict(self):
        return {
            'id':self.id,
            'class_id':self.class_id,
            'user_id':self.user_id,
            'time_start':self.time_start,
            'time_end':self.time_end,
            'user': {
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            },
            'class':{
                'id':self.one_class.id,
                'class_name':self.one_class.class_name,
                'trainer_id':self.one_class.trainer_id,
                'time_start':self.one_class.time_start,
                'time_end':self.one_class.time_end
            }
        }

class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    routine_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('routines.id')), nullable=False)
    exercise = db.Column(db.String(),nullable=False)
    sets = db.Column(db.Integer(),nullable=False)
    reps = db.Column(db.Integer(),nullable=False)
    weights = db.Column(db.Integer(),nullable=False)
    notes = db.Column(db.String())
    created_at = db.Column(db.Date(), nullable=False)

    user = db.relationship('User', back_populates = 'workouts')
    # comments = db.relationship('Comment', back_populates='workout',foreign_keys=[comment_id],cascade="all, delete-orphan")
    routine = db.relationship('Routine', back_populates='workouts',foreign_keys=[routine_id])

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
            'routine_id':self.routine_id,
            'user_id':self.user_id,
            'created_at':self.created_at,
            'user':{
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            }
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
    routine_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('routines.id')), nullable=False)

    user = db.relationship('User', back_populates='comments')
    routine = db.relationship('Routine', back_populates='comments')
    # workout = db.relationship('Workout',back_populates='comments')

    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just posted Comment #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'content':self.content,
            'routine_id':self.routine_id,
            'user_id':self.user_id,
            'created_at':self.created_at,
            'user': {
                'id':self.user.id,
                'username':self.user.username,
                'first_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            }
        }

class Routine(db.Model):
    __tablename__ = 'routines'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(5000))
    image = db.Column(db.String())
    created_at = db.Column(db.Date(), nullable=False)


    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    # workout_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('workouts.id')), nullable=True)
    # comment_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('comments.id')), nullable=True)

    workouts = db.relationship('Workout', back_populates = 'routine',cascade="all, delete")
    user = db.relationship('User', back_populates='routines')
    comments = db.relationship('Comment', back_populates='routine',cascade="all, delete" )

    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just made Routine #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'description':self.description,
            'image':self.image,
            'created_at':self.created_at,
            'user_id':self.user_id,
            'user': {
                'id':self.user.id,
                'username':self.user.username,
                'fisrt_name':self.user.first_name,
                'last_name':self.user.last_name,
                'phone':self.user.phone
            },
            'workouts': [workout.to_dict() for workout in self.workouts],
            # 'comments': [comment.to_dict() for comment in self.comments]
            'comments':{}
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
    cart = db.relationship('Cart', back_populates='products',cascade='all, delete-orphan')


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
    # cart = db.relationship('Cart', back_populates='products')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, posted a new Review #{self.id}>'


    def to_dict(self):
        return {
            'id': self.id,
            'stars':self.stars,
            'content':self.content,
            'product_id':self.product_id,
            'user_id':self.user_id,
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

    products = db.relationship('Product', back_populates='cart')
    user = db.relationship('User',back_populates='cart')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, added {self.products.name} to Cart #{self.id}>'


    def to_dict(self):
        return {
            'id':self.id,
            'quantity':self.quantity,
            'created_at':self.created_at,
            'user_id':self.user_id,
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
