import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createRoutine } from '../../store/routine';
import './RoutinePage.css'



const CreateRoutine = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [exercise, setExercise] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [weights, setWeights] = useState("")
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);

    const user = useSelector(state => state.session.user)


    useEffect(() => {
        const error = {}
        const imageExtensions = ['.png', '.jpg', 'jpeg']
        if (!description) error.description = "Description is required"
        if (description.trim().length < 5) error.description = "Minimum of 5 characters is required"
        if (description.trim().length > 5000) error.description = "Maximum of 5000 characters only"
        if (!image) error.image = "Image is required"
        if (image && !imageExtensions.includes(image.slice(-4))) {
            error.image = "Please make sure your images end with either .png, .jpg, or .jpeg"
        }
        if (!exercise) error.exercise = "Excercise is required"
        if (exercise.trim().length < 5) error.exercise = "Minimum of 5 characters is required"
        if (exercise.trim().length > 200) error.exercise = "Maximum of 200 characters only"
        if (!sets) error.sets = "Sets is required"
        if (sets.trim().length < 5) error.sets = "Minimum of 5 characters is required"
        if (sets.trim().length > 200) error.sets = "Maximum of 200 characters only"
        if (!reps) error.reps = "Reps is required"
        if (reps.trim().length < 5) error.reps = "Minimum of 5 characters is required"
        if (reps.trim().length > 200) error.reps = "Maximum of 200 characters only"
        if (!weights) error.weights = "Weights is required"
        if (weights.trim().length < 5) error.weights = "Minimum of 5 characters is required"
        if (weights.trim().length > 200) error.weights = "Maximum of 200 characters only"
        if (notes.trim().length > 1000) error.notes = "Maximum of 1000 characters only"
        setErrors(error)

    }, [description, image, exercise, sets, reps, weights])

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
            const data = await dispatch(createRoutine(routineData))
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
                <h1>Create Routine</h1>
                <form className="routine-form" onSubmit={submitForm}>
                    <div className="inside-routine-form">
                        <label>
                            <div>Description <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            <div>Image <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            <div>Exercise <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            <div>Sets <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            <div>Reps <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            <div>Weights <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
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
                            {errors.notes && submitted && < p style={{ color: "red", fontSize: "0.7rem" }}>{errors.notes}</p>}
                            <input
                                id="workout-notes"
                                placeholder="Notes...(optional)"
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

export default CreateRoutine
