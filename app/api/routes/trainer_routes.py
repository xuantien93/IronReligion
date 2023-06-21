from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Trainer


trainers = Blueprint("trainers",__name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@trainers.route("")
def all_trainers():
    trainers = Trainer.query.all()
    trainer_list = [trainer.to_dict() for trainer in trainers]
    res = {}
    for trainer in trainer_list:
        train_id = trainer['id']
        res[train_id]=trainer
    return res
