import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createRoutine, editRoutineThunk, getAllRoutines } from '../../store/routine';
import './RoutinePage.css'
import { useParams } from 'react-router-dom';



const EditRoutine = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const routineObj = useSelector(state => state.routines)

    const routine = routineObj[id]

    const [description, setDescription] = useState(routine?.description || "")
    const [image, setImage] = useState(routine?.image || "")
    const [exercise, setExercise] = useState(routine?.exercise || "")
    const [sets, setSets] = useState(routine?.sets || "")
    const [reps, setReps] = useState(routine?.reps || "")
    const [weights, setWeights] = useState(routine?.weights || "")
    const [notes, setNotes] = useState(routine?.notes || "")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);

    const user = useSelector(state => state.session.user)


    useEffect(() => {
        const error = {}
        if (!description) error.description = "Description is required"
        if (!image) error.image = "Image is required"
        if (!exercise) error.exercise = "Excercise is required"
        if (!sets) error.sets = "Sets is required"
        if (!reps) error.reps = "Reps is required"
        if (!weights) error.weights = "Weights is required"
        setErrors(error)

    }, [description, image, exercise, sets, reps, weights])

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const routineData = new FormData()
        routineData.append("description", description)
        routineData.append("image", image)
        routineData.append("exercise", exercise)
        routineData.append("sets", sets)
        routineData.append("reps", reps)
        routineData.append("weights", weights)
        routineData.append("notes", notes)




        if (!Object.values(errors).length) {
            const data = await dispatch(editRoutineThunk(routineData))
            history.push("/routines")
            setDescription("")
            setNotes("")
            setImage("")
            setExercise("")
            setSets("")
            setReps("")
            setWeights("")
        }


        if (!user) history.push("/login")

    }
    return (
        <div className='routine-form-container'>
            <div className='routine-form-subform'>
                <h1>Update Routine</h1>
                <form className="routine-form" onSubmit={submitForm}>
                    <div className="inside-routine-form">
                        <label>
                            <div>Description</div>
                            {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                            <input
                                id="routine-description"
                                placeholder="Description..."
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            <div>Image</div>
                            {errors.image && submitted && < p style={{ color: "red" }}>{errors.image}</p>}
                            <input
                                id="routine-image"
                                placeholder="Image..."
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </label>

                        <label>
                            <div>Exercise</div>
                            {errors.exercise && submitted && < p style={{ color: "red" }}>{errors.exercise}</p>}
                            <input
                                id="workout-exercise"
                                placeholder="Exercise..."
                                type="text"
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            <div>Sets</div>
                            {errors.sets && submitted && < p style={{ color: "red" }}>{errors.sets}</p>}
                            <textarea
                                id="workout-sets"
                                placeholder="Sets..."
                                type="text"
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>Reps</div>
                            {errors.reps && submitted && < p style={{ color: "red" }}>{errors.reps}</p>}
                            <input
                                id="workout-reps"
                                placeholder="Reps..."
                                type="text"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            <div>Weights</div>
                            {errors.weights && submitted && < p style={{ color: "red" }}>{errors.weights}</p>}
                            <input
                                id="workout-reps"
                                placeholder="Weights..."
                                type="text"
                                value={weights}
                                onChange={(e) => setWeights(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            <div>Notes</div>
                            {errors.workoutNotes && submitted && < p style={{ color: "red" }}>{errors.workoutNotes}</p>}
                            <input
                                id="workout-notes"
                                placeholder="Notes..."
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></input>
                        </label>
                    </div>
                    <div className='routine-submmit'>
                        <button type="submit" className='routine-submit-btn'>Submit</button>
                    </div>
                </form >
            </div>
        </div >

    )
}

export default EditRoutine
