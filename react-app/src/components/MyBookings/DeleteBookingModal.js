import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./MyBookings.css"
import { deleteBookingThunk, getAllBooking } from "../../store/booking";
import { useHistory } from "react-router-dom";


function DeleteBookingModal({ bookingId, bookingPage }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()


    const deleteButton = async (e) => {
        e.preventDefault();

        if (bookingPage) {
            await dispatch(deleteBookingThunk(bookingId));
            history.push("/bookings")

            closeModal();
        } else {
            await dispatch(deleteBookingThunk(bookingId));
            history.push("/bookings")
            closeModal();
        }
    }



    return (
        <div className="routine-delete-modal-house">
            <h1>Are you sure you want to cancel your class?</h1>
            <button id="delete-routine-yes" onClick={deleteButton} >Yes (Cancel this class)</button>
            <button id="delete-routine-no" onClick={() => closeModal()} >No (Don't cancel)</button>
        </div>
    );
}

export default DeleteBookingModal;
