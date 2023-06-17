import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { deleteRoutineThunk, getAllRoutines } from "../../store/routine"
import { useHistory } from "react-router-dom"
import OpenModalButton from '../OpenModalButton';
import CreateWorkoutModal from "../RoutinePage/CreateWorkoutModal"
import EditWorkoutModal from "../RoutinePage/EditWorkoutModal"
import { deleteWorkoutThunk } from '../../store/routine';





const SingleRoutinePage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const routine = useSelector(state => state.routines)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])


    const routineById = routine[id]
    if (!user) history.push("/login")

    const deleteRoutineBtn = async (e) => {
        e.preventDefault()
        await dispatch(deleteRoutineThunk(routineById?.id))
        history.push("/routines")
    }

    // console.log("this is single routine====", routineById)

    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                <div className='routine-description'>
                    {routineById?.description}
                </div>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routineById?.image}></img>
                    <button id="delete-routine-button" onClick={deleteRoutineBtn}><i className="fa-solid fa-eraser"></i></button>
                </div>
                {routineById?.workouts.map(workout => {
                    if (!workout) return null
                    const deleteWorkoutBtn = async (e) => {
                        e.preventDefault()
                        await dispatch(deleteWorkoutThunk(workout.id, routineById?.id))
                    }
                    return (
                        <div className="workout-block" key={workout.id}>
                            <span>{workout.exercise}</span>
                            <span> Sets {workout.sets}</span>
                            <span> Reps {workout.reps}</span>
                            <span> Notes: {workout.notes}</span>
                            <div className='edit-workout-modal'>
                                <OpenModalButton
                                    buttonText={<i className="fa-solid fa-pen-fancy"></i>}
                                    modalComponent={<EditWorkoutModal workoutId={workout.id} workout={workout} />}

                                />
                            </div>
                            <div className='delete-workout' onClick={deleteWorkoutBtn}><i className="fa-solid fa-trash"></i></div>
                        </div>
                    )
                })}
                <div className='create-workout-modal'>
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                        modalComponent={<CreateWorkoutModal routineId={routineById?.id} />}

                    />
                </div>
            </div>
        </div>
    )
}


export default SingleRoutinePage
