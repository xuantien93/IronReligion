import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';




const RoutineDetail = ({ routine }) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const handleClick = () => {
        history.push(`/routines/${routine.id}`)
    }

    console.log("this is routine on routine detail", routine.workouts)

    return (
        <div className='all-routines'>
            <div className='detail-routine' onClick={handleClick}>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routine.image}></img>
                </div>
                {routine.workouts.map(workout => {
                    return (
                        <div className="workout-block" key={workout.id}>
                            <span>{workout.exercise}</span>
                            <span> {workout.sets}</span>
                            <span> {workout.reps}</span>
                            <span> {workout.notes}</span>
                        </div>
                    )
                })}
                <div className='routine-notes'>
                    {routine.notes}
                </div>
            </div>
        </div>
    )


}


export default RoutineDetail
