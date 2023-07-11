import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createRoutine, editRoutineThunk, getAllRoutines } from '../../store/routine';
import './RoutinePage.css'
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';



const EditRoutine = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const routineObj = useSelector(state => state.routines)
    const user = useSelector(state => state.session.user)

    const routine = routineObj[id]


    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(routine?.description || "")
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(routine?.image || null)
    const [exercise, setExercise] = useState(routine?.workouts[0]?.exercise || "")
    const [sets, setSets] = useState(routine?.workouts[0]?.sets || "")
    const [reps, setReps] = useState(routine?.workouts[0]?.reps || "")
    const [weights, setWeights] = useState(routine?.workouts[0]?.weights || "")
    const [notes, setNotes] = useState(routine?.workouts[0]?.notes || "")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);



    useEffect(() => {
        const error = {};
        // const imageExtensions = ['.png', '.jpg', 'jpeg'];

        if (!description) error.description = "Description is required";
        if (description.toString().trim().length < 5) error.description = "Minimum of 5 characters is required";
        if (description.toString().trim().length > 5000) error.description = "Maximum of 5000 characters only";
        if (!image) error.image = "Image is required";
        // if (image && !imageExtensions.includes(image.slice(-4))) {
        //     error.image = "Please make sure your images end with either .png, .jpg, or .jpeg";
        // }
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

        setErrors(error);
    }, [description, image, exercise, sets, reps, weights]);

    useEffect(() => {
        dispatch(getAllRoutines())
            // dispatch()
            .then(routine => {
                setDescription(routine[id].description)
                setImage(routine[id].image)
                setExercise(routine[id].workouts[0]?.exercise)
                setReps(routine[id].workouts[0]?.reps)
                setSets(routine[id].workouts[0]?.sets)
                setWeights(routine[id].workouts[0]?.weights)
                setNotes(routine[id].workouts[0]?.notes)
                // console.log("===================", routine[id])
            })
    }, [dispatch])

    if (!routine) return null
    if (!user) {
        return <Redirect to="/" />
    }


    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setIsLoading(true);

        const routineData = new FormData()
        routineData.append("description", description)
        routineData.append("image", image)
        routineData.append("exercise", exercise)
        routineData.append("sets", sets)
        routineData.append("reps", reps)
        routineData.append("weights", weights)
        routineData.append("notes", notes)




        if (!Object.values(errors).length) {
            const data = await dispatch(editRoutineThunk(routine.id, routineData))
            history.push("/routines")
            setDescription("")
            setNotes("")
            setExercise("")
            setSets("")
            setReps("")
            setWeights("")
            setImage(null)
            setIsLoading(false);
        }


        if (!user) history.push("/login")

    }
    return (
        <div className='routine-form-container'>
            <h1>Update Routine</h1>
            {isLoading ? (
                <div className="loading-screen">
                    <BeatLoader color="#d636c4" size={30} />
                </div>
            ) : (

                <div className='routine-form-subform'>
                    <form className="routine-form" onSubmit={submitForm}>
                        <div className="txt_field">
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
                        </div>
                        <div className="txt_field">
                            <label>
                                <div>Image <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                                {console.log("this is iamge", image)}
                                {typeof image === 'object' ? null : <img id="routine-edit-image" src={image} alt="Preview" />}
                                {errors.image && submitted && < p style={{ color: "red" }}>{errors.image}</p>}
                                <input
                                    placeholder="Insert Image here..."
                                    type="file"
                                    accept="image/*"
                                    filename={image && image.name}
                                    onChange={(e) => setImage(e.target.files[0])}
                                ></input>
                            </label>
                        </div>
                        <div className="txt_field">
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
                        </div>
                        <div className="txt_field">
                            <label>
                                <div>Sets <span className="required-field" style={{ color: "red", fontSize: "0.7rem" }}>*</span></div>
                                {errors.sets && submitted && < p style={{ color: "red" }}>{errors.sets}</p>}
                                <input
                                    id="workout-sets"
                                    placeholder="Sets..."
                                    type="text"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="txt_field">
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
                        </div>
                        <div className="txt_field">
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
                        </div>
                        <div className="txt_field">
                            <label>
                                <div>Notes</div>
                                {errors.notes && submitted && < p style={{ color: "red" }}>{errors.notes}</p>}
                                <input
                                    id="workout-notes"
                                    placeholder="Notes...(optional)"
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></input>
                            </label>
                        </div>
                        <div className='routine-submit-btn'>
                            <button type="submit" >Submit</button>
                        </div>
                    </form >
                </div >
            )
            }
        </div >

    )
}

export default EditRoutine
