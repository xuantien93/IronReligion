from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trainers import seed_trainers,undo_trainers
from .classes import seed_classes,undo_classes
from .workouts import seed_workouts,undo_workouts
from .comments import seed_comments,undo_comments

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
        undo_comments()
        undo_workouts()
        undo_classes()
        undo_trainers()
        undo_users()
    seed_users()
    seed_trainers()
    seed_classes()
    seed_workouts()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_workouts()
    undo_classes()
    undo_trainers()
    undo_users()
    # Add other undo functions here
