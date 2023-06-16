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

    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState('');

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const formData = new FormData()
        formData.append('exercise', exercise)
        formData.append('sets', sets)
        formData.append('reps', reps)
        formData.append('weights', weights)
        formData.append('notes', notes)

        const data = await dispatch(createWorkout(routineId, formData));

        if (data.errors) {
            return setErrors(data.errors[0])
        }

        if (submitted && errors) {
            console.log('errors was reset!')
            setErrors('');
        }

        return closeModal()
    }




    return (
        <div className='workout-form-container'>
            <form className='workout-form' onSubmit={submitForm}>
                {errors && (
                    <p style={{ color: "red" }}>{errors}</p>
                )}
                <div className='inside-workout-form'>
                    <label>
                        <div>Exercise</div>

                        <input
                            id="workout-exercise"
                            placeholder="exercise..."
                            type="text"
                            value={exercise}
                            onChange={(e) => setExercise(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>Sets</div>

                        <input
                            id="workout-sets"
                            placeholder="sets..."
                            type="text"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        ></input>
                    </label>
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
                    <label>
                        <div>Notes</div>

                        <input
                            id="workout-notes"
                            placeholder="notes..."
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
