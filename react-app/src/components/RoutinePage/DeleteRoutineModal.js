import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutinePage.css"
import { deleteRoutineThunk } from "../../store/routine";
import { useHistory } from "react-router-dom";


function DeleteRoutineModal({ routineId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()


    const deleteButton = async (e) => {
        e.preventDefault();


        await dispatch(deleteRoutineThunk(routineId));
        history.push("/routines")
        closeModal();
    }



    return (
        <div className="routine-delete-modal-house">
            <h1>Are you sure you want to delete your routine?</h1>
            <button id="delete-routine-yes" onClick={deleteButton} >Yes (delete this post)</button>
            <button id="delete-routine-no" onClick={() => closeModal()} >No (don't delete)</button>
        </div>
    );
}

export default DeleteRoutineModal;
