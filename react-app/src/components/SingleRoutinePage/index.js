import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { deleteRoutineThunk, getAllRoutines } from "../../store/routine"
import { useHistory } from "react-router-dom"
import OpenModalButton from '../OpenModalButton';
import CreateWorkoutModal from "../RoutinePage/CreateWorkoutModal"
import EditWorkoutModal from "../RoutinePage/EditWorkoutModal"
import { deleteWorkoutThunk } from '../../store/routine';
import DeleteRoutineModal from "../RoutinePage/DeleteRoutineModal"





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

    if (!routineById) return null

    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                {user && routineById.user_id === user.id && < div className="single-routine-create-btn-container">
                    <button id="create-routine-btn" onClick={() => history.push("/routines/create")}>Create Routine</button>
                </div>}
                <div className='routine-description'>
                    {routineById?.description}
                </div>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routineById?.image}></img>
                    {/* <button id="delete-routine-button" onClick={deleteRoutineBtn}><i className="fa-solid fa-eraser"></i></button> */}
                </div>
                {routineById.user_id === user?.id && user && <div className='edit-workout-modal'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-eraser"></i>}
                        modalComponent={<DeleteRoutineModal routineId={routineById?.id} />}

                    />
                </div>}
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
                            {workout.user_id === user?.id && < div className='edit-workout-modal'>
                                <OpenModalButton
                                    buttonText={<i className="fa-solid fa-pen-fancy"></i>}
                                    modalComponent={<EditWorkoutModal workoutId={workout.id} workout={workout} />}

                                />
                            </div>}
                            {workout.user_id === user?.id && <div className='delete-workout' onClick={deleteWorkoutBtn}><i className="fa-solid fa-trash"></i></div>}
                        </div>
                    )
                })}
                {routine.user_id === user?.id && user && <div className='create-workout-modal'>
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                        modalComponent={<CreateWorkoutModal routineId={routineById?.id} />}

                    />
                </div>}
            </div>
        </div >
    )
}


export default SingleRoutinePage
