import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./MyBookings.css"
import { deleteBookingThunk } from "../../store/booking";
import { useHistory } from "react-router-dom";


function DeleteBookingModal({ bookingId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()


    const deleteButton = async (e) => {
        e.preventDefault();


        await dispatch(deleteBookingThunk(bookingId));
        history.push("/bookings")
        closeModal();
    }



    return (
        <div className="routine-delete-modal-house">
            <h1>Are you sure you want to cancel your reservation?</h1>
            <button id="delete-routine-yes" onClick={deleteButton} >Yes (delete this post)</button>
            <button id="delete-routine-no" onClick={() => closeModal()} >No (don't delete)</button>
        </div>
    );
}

export default DeleteBookingModal;
