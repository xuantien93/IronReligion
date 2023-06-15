import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllRoutines } from "../../store/routine"






const SingleRoutinePage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const routine = useSelector(state => state.routines)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])



    const routineById = routine[id]
    console.log("this is single routine====", routineById)

    return (
        <div className='all-routines'>
            <div className='detail-routine'>
                <div className='routine-image-container'>
                    <img id="routine-image" src={routineById?.image}></img>
                </div>
                {routineById?.workouts.map(workout => {
                    return (
                        <div className="workout-block" key={workout.id}>
                            <span>{workout.exercise}</span>
                            <span> Sets {workout.sets}</span>
                            <span> Reps {workout.reps}</span>
                            <span> Notes: {workout.notes}</span>
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


export default SingleRoutinePage
