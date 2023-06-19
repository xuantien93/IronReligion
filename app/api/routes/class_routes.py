from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Class,Booking




classes = Blueprint("classes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@classes.route("")
def all_classes():
    classes = Class.query.all()
    class_list = [one_class.to_dict() for one_class in classes]
    res = {}
    for one_class in class_list:
        one_class_id = one_class['id']
        res[one_class_id]=one_class

    return res
