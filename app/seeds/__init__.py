from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trainers import seed_trainers,undo_trainers
from .classes import seed_classes,undo_classes
from .comments import seed_comments,undo_comments
from .routines import seed_routines,undo_routines
from .products import seed_products,undo_products
from .reviews import seed_reviews,undo_reviews
from .routines import seed_routines,undo_routines
from .enrollments import seed_enrollments,undo_enrollments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_products()
        undo_routines()
        undo_comments()
        undo_classes()
        undo_enrollments()
        undo_users()
        undo_trainers()
    seed_trainers()
    seed_users()
    seed_enrollments()
    seed_classes()
    seed_comments()
    seed_routines()
    seed_products()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_products()
    undo_routines()
    undo_comments()
    undo_classes()
    undo_enrollments()
    undo_users()
    undo_trainers()
    # Add other undo functions here
