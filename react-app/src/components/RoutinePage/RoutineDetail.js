import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import CreateWorkoutModal from './CreateWorkoutModal';
import EditWorkoutModal from './EditWorkoutModal';
import { deleteWorkoutThunk } from '../../store/routine';




const RoutineDetail = ({ routine }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleClick = () => {
        history.push(`/routines/${routine.id}`)
    }

    if (!user) history.push("/login")
    // console.log("this is routine on routine detail", routine)



    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                <div className='routine-description' onClick={handleClick}>
                    {routine.description}
                </div>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routine.image}></img>
                </div>
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
                        modalComponent={<CreateWorkoutModal routineId={routine.id} />}

                    />
                </div>
            </div>
        </div>
    )


}


export default RoutineDetail
