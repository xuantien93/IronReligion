import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import CreateWorkoutModal from './CreateWorkoutModal';
import EditWorkoutModal from './EditWorkoutModal';
import { deleteWorkoutThunk } from '../../store/routine';
import EditRoutine from './EditRoutine';




const RoutineDetail = ({ routine }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleClick = () => {
        history.push(`/routines/${routine.id}`)
    }

    // if (!user) history.push("/")
    console.log("this is routine on routine detail", routine)



    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                <div className='routine-description' onClick={handleClick}>
                    {routine.description}
                </div>
                <div className='routine-image-container'>
                    {routine.image ? (
                        <img id="routine-image" src={routine.image} alt="Routine" />
                    ) : (
                        <img id="routine-image" src="https://i.imgur.com/IySASzx.jpg" alt="Default Routine" />
                    )}
                    {routine.user_id === user?.id && <button id="update-routine-btn" onClick={() => history.push(`/routines/${routine.id}/update`)}>Update Routine</button>}
                </div>
                <div>Comments</div>
                {Object.values(routine.comments).map(comment => {
                    { console.log(comment.user) }
                    return (
                        <div className='routine-comment'>{comment.user.first_name} {comment.user.last_name}: {comment.content}</div>
                    )
                })}
                {routine.workouts?.map(workout => {
                    if (!workout) return null
                    const deleteWorkoutBtn = async (e) => {
                        e.preventDefault()
                        await dispatch(deleteWorkoutThunk(workout.id, routine.id))
                    }
                    return (
                        <div className="workout-block" key={workout.id}>
                            <span>{workout.exercise}</span>
                            <span> Sets {workout.sets}</span>
                            <span> Reps {workout.reps}</span>
                            <span> Weights {workout.weights}lbs</span>
                            <div className='workout-note-div'>
                                <span> Notes: {workout.notes}</span>
                            </div>
                            <div className='delete-edit-button'>
                                {workout.user_id === user?.id && <div className='edit-workout-modal'>
                                    <OpenModalButton
                                        buttonText={<i className="fa-solid fa-pen-fancy"></i>}
                                        modalComponent={<EditWorkoutModal workoutId={workout.id} workout={workout} />}

                                    />
                                </div>}
                                {workout.user_id === user?.id && <div className='delete-workout' onClick={deleteWorkoutBtn}><i className="fa-solid fa-trash"></i></div>}
                            </div>
                        </div>
                    )
                })}
                {routine.user_id === user?.id && <div className='create-workout-modal'>
                    <OpenModalButton
                        buttonText={<i class="fa-solid fa-plus"></i>}
                        modalComponent={<CreateWorkoutModal routineId={routine.id} />}

                    />
                </div>}
            </div>
        </div >
    )


}


export default RoutineDetail
