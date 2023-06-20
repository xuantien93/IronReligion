from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import datetime
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
    bookings = Booking.query.all()
    booking_list = [booking.to_dict() for booking in bookings]

    res = {}
    for booking in booking_list:
        booking_id = booking['id']
        res[booking_id] = booking

    return res

@bookings.route("",methods=['POST'])
@login_required
def create_booking():
    data = request.get_json()


    time_format = '%a, %d %b %Y %H:%M:%S GMT'
    time_start = datetime.strptime(data['time_start'], time_format)
    time_end = datetime.strptime(data['time_end'], time_format)

    new_booking = Booking(
        time_start = time_start,
        time_end = time_end,
        class_id = data['id'],
        user_id = current_user.id
    )
    db.session.add(new_booking)
    db.session.commit()
    return {"resBooking":new_booking.to_dict() }

@bookings.route("/<int:id>/delete",methods=['DELETE'])
@login_required
def delete_booking(id):
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return {"res":"Successfully deleted"}
