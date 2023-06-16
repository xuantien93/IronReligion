import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import CreateWorkoutModal from './CreateWorkoutModal';




const RoutineDetail = ({ routine }) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const handleClick = () => {
        history.push(`/routines/${routine.id}`)
    }

    // console.log("this is routine on routine detail", routine)



    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                <div className='routine-notes' onClick={handleClick}>
                    {routine.description}
                </div>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routine.image}></img>
                </div>
                {routine.workouts?.map(workout => {
                    return (
                        <div className="workout-block" key={workout.id}>
                            <span>{workout.exercise}</span>
                            <span> Sets {workout.sets}</span>
                            <span> Reps {workout.reps}</span>
                            <span> Notes: {workout.notes}</span>
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
