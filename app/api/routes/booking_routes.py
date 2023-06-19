from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.user import User
from ...models.models import Class,Booking




bookings = Blueprint("bookings", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@bookings.route("")
def all_bookings():
    pass
