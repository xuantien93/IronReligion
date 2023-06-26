import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { createWorkout, getAllRoutines } from '../../store/routine';
import OpenModalButton from '../OpenModalButton'
import { useModal } from '../../context/Modal';

const CreateWorkoutModal = ({ routineId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [exercise, setExercise] = useState("")
    const [weights, setWeights] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])


    useEffect(() => {
        const error = {}
        const integerRegex = /^\d+$/;
        if (!exercise) error.exercise = 'Exercise is required';
        if (exercise.trim().length < 2)
            error.exercise = 'Minimum of 2 characters is required';
        if (exercise.trim().length > 200)
            error.exercise = 'Maximum of 200 characters only';
        if (!sets) error.sets = 'Sets is required';
        if (sets.trim().length > 200)
            error.sets = 'Maximum of 200 characters only';
        if (!integerRegex.test(sets))
            error.sets = 'Please enter a valid integer for Sets';
        if (!reps) error.reps = 'Reps is required';
        if (reps.trim().length > 200)
            error.reps = 'Maximum of 200 characters only';
        if (!integerRegex.test(reps))
            error.reps = 'Please enter a valid integer for Reps';
        if (!weights) error.weights = 'Weights is required';
        if (weights.trim().length > 200)
            error.weights = 'Maximum of 200 characters only';
        if (!integerRegex.test(weights))
            error.weights = 'Please enter a valid integer for Weights';
        if (notes.trim().length > 1000)
            error.notes = 'Maximum of 1000 characters only';
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
            const data = await dispatch(createWorkout(routineId, formData));
            setExercise("")
            setSets("")
            setReps("")
            setWeights("")
            closeModal()
        }
    }

    // if (data.errors) {
    //     return setErrors(data.errors[0])
    // }



    // if (submitted && errors) {
    //     console.log('errors was reset!')
    //     setErrors('');
    // }







    return (
        <div className='workout-form-container'>
            <form className='workout-form' onSubmit={submitForm}>
                {errors.exercise && submitted && (
                    <p style={{ color: "red", marginTop: "2%" }}>{errors.exercise}</p>
                )}
                <div className='txt_field'>
                    <label>
                        <div>Exercise</div>
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


export default CreateWorkoutModal
