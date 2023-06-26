import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { createWorkout, editWorkoutThunk, getAllRoutines } from '../../store/routine';
import OpenModalButton from '../OpenModalButton'
import { useModal } from '../../context/Modal';

const EditWorkoutModal = ({ workoutId, workout }) => {


    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [exercise, setExercise] = useState(workout?.exercise || "")
    const [weights, setWeights] = useState(workout?.weights || "")
    const [sets, setSets] = useState(workout?.sets || "")
    const [reps, setReps] = useState(workout?.reps || "")
    const [notes, setNotes] = useState(workout?.notes || "")

    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState('');


    useEffect(() => {
        const error = {}

        if (!exercise) error.exercise = "Exercise is required";
        if (exercise?.toString().trim().length < 2) error.exercise = "Minimum of 2 characters is required";
        if (exercise?.toString().trim().length > 200) error.exercise = "Maximum of 200 characters only";
        if (!sets?.toString().trim()) error.sets = "Sets is required";
        if (sets?.toString().trim().length > 200) error.sets = "Maximum of 200 characters only";
        if (sets && !Number.isInteger(parseInt(sets, 10))) error.sets = "Please enter a valid integer for Sets";
        if (!reps?.toString().trim()) error.reps = "Reps is required";
        if (reps?.toString().trim().length > 200) error.reps = "Maximum of 200 characters only";
        if (reps && !Number.isInteger(parseInt(reps, 10))) error.reps = "Please enter a valid integer for Reps";
        if (!weights?.toString().trim()) error.weights = "Weights is required";
        if (weights?.toString().trim().length > 200) error.weights = "Maximum of 200 characters only";
        if (weights && !Number.isInteger(parseInt(weights, 10))) error.weights = "Please enter a valid integer for Weights";
        if (notes?.toString().trim().length > 1000) error.notes = "Maximum of 1000 characters only";
        setErrors(error)
    }, [exercise, reps, sets, weights, notes])

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const formData = new FormData()
        formData.append('exercise', exercise)
        formData.append('sets', sets)
        formData.append('reps', reps)
        formData.append('weights', weights)
        formData.append('notes', notes)

        // const data = await dispatch(editWorkoutThunk(workoutId, formData));
        if (!Object.values(errors).length) {
            const data = await dispatch(editWorkoutThunk(workoutId, formData));
            setExercise("")
            setSets("")
            setReps("")
            setWeights("")
            closeModal()
        }
    }




    return (
        <div className='workout-form-container'>
            <form className='workout-form' onSubmit={submitForm}>
                {errors.exercise && submitted && (
                    <p style={{ color: "red", marginTop: "2%" }}>{errors.exercise}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>** Edit Workout **</div>
                        <input
                            id="workout-exercise"
                            placeholder="Exercise..."
                            type="text"
                            value={exercise}
                            onChange={(e) => setExercise(e.target.value)}
                        ></input>
                    </label>
                </div>
                {errors.sets && submitted && (
                    <p style={{ color: "red" }}>{errors.sets}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>Sets</div>

                        <input
                            id="workout-sets"
                            placeholder="Sets..."
                            type="text"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        ></input>
                    </label>
                </div>
                {errors.reps && submitted && (
                    <p style={{ color: "red" }}>{errors.reps}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>Reps</div>

                        <input
                            id="workout-reps"
                            placeholder="Reps..."
                            type="text"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        ></input>
                    </label>
                </div>
                {errors.weights && submitted && (
                    <p style={{ color: "red" }}>{errors.weights}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>Weight</div>

                        <input
                            id="workout-weights"
                            placeholder="Weights..."
                            type="text"
                            value={weights}
                            onChange={(e) => setWeights(e.target.value)}
                        ></input>
                    </label>
                </div>
                {errors.notes && submitted && (
                    <p style={{ color: "red" }}>{errors.notes}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>Notes</div>

                        <input
                            id="workout-notes"
                            placeholder="notes...(optional)"
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div className='workout-submit'>
                    <button type="submit" className='workout-submit-btn'>Submit</button>
                </div>
            </form>

        </div>

    )
}


export default EditWorkoutModal
