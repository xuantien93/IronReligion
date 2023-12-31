from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError
from flask_wtf.file import FileAllowed,FileField,FileRequired
from app.api.routes.aws import ALLOWED_EXTENSIONS

def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 5000 or len(text) < 5:
        raise ValidationError('Must be between 5 and 5,000 characters')


class RoutineForm(FlaskForm):
    description = TextAreaField("Description",validators=[text_length])
    image = FileField("Image",validators=[FileRequired(),FileAllowed(list(ALLOWED_EXTENSIONS))])
    exercise = StringField('Exercise',validators=[DataRequired()])
    sets = IntegerField('Sets')
    reps = IntegerField('Reps')
    weights = IntegerField('Weights')
    notes = StringField('Notes')
    created_at = DateField('Date')
    submit = SubmitField('Submit')


class WorkoutForm(FlaskForm):
    exercise = StringField('Exercise',validators=[DataRequired()])
    sets = IntegerField('Sets')
    reps = IntegerField('Reps')
    weights = IntegerField('Weights')
    notes = StringField('Notes')
    created_at = DateField('Date')
    submit = SubmitField('Submit')

class CommentForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), text_length])
    create_at = DateField("Date")
    submit = SubmitField("Submit")
