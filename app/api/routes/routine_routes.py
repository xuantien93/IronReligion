from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Routine,Workout,Comment



routines = Blueprint("routines", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@routines.route("")
@login_required
def all_routines():
    routines = Routine.query.order_by(Routine.created_at.desc()).all()

    routine_ids = [routine.id for routine in routines]

    routine_comments = Comment.query.filter(Comment.routine_id.in_(routine_ids)).all()
    routine_workouts = Workout.query.filter(Workout.routine_id.in_(routine_ids)).all()

    comment_list = [comment.to_dict() for comment in routine_comments]
    workout_list = [workout.to_dict() for workout in routine_workouts]
    routine_list = [routine.to_dict() for routine in routines]

    for routine in routine_list:
        for comment in comment_list:
            if comment['routine_id'] == routine['id']:
                comments = routine['comments']
                comments[comment['id']] = comment
        # for workout in workout_list:
        #     if workout['routine_id'] == routine['id']:
        #         workouts = routine['workouts']
        #         workouts[workout['id']] = workout

    res = {}

    for routine in routine_list:
        routine_id = routine['id']
        res[routine_id] = routine

    return res
