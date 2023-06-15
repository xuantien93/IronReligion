from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError


def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 5000 or len(text) < 5:
        raise ValidationError('Post must be between 5 and 5,000 characters')


class RoutineForm(FlaskForm):
    notes = TextAreaField("Notes",text_length)
    image = StringField("Image")
    created_at = DateField("Date")
    submit = SubmitField('Submit')


class WorkoutForm(FlaskForm):
    exercise = StringField('Exercise',validators=[DataRequired()])
    sets = IntegerField('Sets')
    reps = IntegerField('Reps')
    weights = IntegerField('Weights')
    notes = StringField('Notes')
    created_at = DateField('Date')
    submit = SubmitField('Submit')
