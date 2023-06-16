from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Routine,Workout,Comment
from ...forms.routine_form import RoutineForm,WorkoutForm



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
    # routine_workouts = Workout.query.filter(Workout.routine_id.in_(routine_ids)).all()

    comment_list = [comment.to_dict() for comment in routine_comments]
    # workout_list = [workout.to_dict() for workout in routine_workouts]
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

@routines.route("/<int:id>")
@login_required
def single_routine(id):
    routine = Routine.query.get(id)
    routine_detail = routine.to_dict()
    routine_id = routine_detail['id']
    res = {}
    res[routine_id] = routine_detail
    return res


@routines.route("", methods=['POST'])
@login_required
def create_routines():
    # print("this is hitting create_routine===============================================>", request.files.get('description'))
    form = RoutineForm()
    # print("this is hitting ==============================")
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():
        new_routine = Routine(
            description = form.data['description'],
            image = form.data['image'],
            created_at = date.today(),
            user_id = current_user.id,
        )

        db.session.add(new_routine)
        db.session.commit()
        new_workout = Workout(
            exercise = form.data['exercise'],
            sets = form.data['sets'],
            reps = form.data['reps'],
            weights = form.data['weights'],
            notes = form.data['notes'],
            created_at = date.today(),
            routine_id = new_routine.id,
            user_id = current_user.id
        )

        db.session.add(new_workout)
        db.session.commit()
        # print("this is new routine ----------------------",new_routine.to_dict())
        return {"resRoutine":new_routine.to_dict()}
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@routines.route("/<int:id>/workouts",methods=['POST'])
@login_required
def create_workout(id):
    workout_form = WorkoutForm()
    workout_form["csrf_token"].data = request.cookies["csrf_token"]

    if workout_form.validate_on_submit():
        new_workout = Workout(
            exercise = workout_form.data['exercise'],
            sets = workout_form.data['sets'],
            reps = workout_form.data['reps'],
            weights = workout_form.data['weights'],
            notes = workout_form.data['notes'],
            created_at = date.today(),
            routine_id = id,
            user_id = current_user.id
        )

        db.session.add(new_workout)
        db.session.commit()
        return {"resWorkout":new_workout.to_dict()}
    if workout_form.errors:
        return {'errors': validation_errors_to_error_messages(workout_form.errors)}, 400



