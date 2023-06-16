from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Routine,Workout,Comment
from ...forms.routine_form import RoutineForm,WorkoutForm


workouts = Blueprint("workouts", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@workouts.route("/<int:id>/update", methods=['PUT'])
@login_required
def update_workout(id):
    form = WorkoutForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        workout = Workout.query.get(id)
        routineId = workout.routine_id
        workout.exercise = form.data['exercise']
        workout.sets = form.data['sets']
        workout.reps = form.data['reps']
        workout.weights = form.data['weights']
        workout.notes = form.data['notes']
        workout.created_at = date.today(),
        workout.routine_id = routineId
        workout.user_id = current_user.id

        db.session.commit()
        return {"resWorkout":workout.to_dict()}
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@workouts.route("<int:id>/delete",methods=['DELETE'])
@login_required
def delete_workout(id):
    workout_to_delete = Workout.query.get(id)
    db.session.delete(workout_to_delete)
    db.session.commit()
    return {'res':'Successfully deleted'}
