from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Routine,Workout,Comment
from ...forms.routine_form import WorkoutForm,RoutineForm



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


@routines.route("",methods=['POST'])
@login_required
def create_routines():
    routine_form = RoutineForm()
    routine_form["csrf_token"].data = request.cookies["csrf_token"]

    workout_form = WorkoutForm()
    workout_form["csrf_token"].data = request.cookies["csrf_token"]

    selected_user = User.query.get(current_user.id)
    if routine_form.validate_on_submit():
        result = Routine(
            notes = routine_form.data['notes'],
            image = routine_form.data['image'],
            created_at = date.today(),
            user = selected_user
        )

        db.session.add(result)
    if workout_form.validate_on_submit():
        res = Workout(
            exercise = workout_form.data['exercise'],
            sets = workout_form.data['sets'],
            reps = workout_form.data['sets'],
            weights = workout_form.data['weights'],
            notes = workout_form.data['notes'],
            created_at = date.today(),
            user = selected_user
        )

        db.session.add(res)
        db.session.commit()
        return {"resRoutine":result.to_dict(),"resWorkout":res.to_dict()}
    if routine_form.errors:
        return {'errors': validation_errors_to_error_messages(routine_form.errors)}, 400
    if workout_form.errors:
        return {'errors': validation_errors_to_error_messages(workout_form.errors)}, 400
