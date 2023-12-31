import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import './RoutinePage.css'
import { getAllRoutines } from '../../store/routine';
import RoutineDetail from './RoutineDetail';



const RoutinePage = ({ myRoutines, isMyRoutine }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const routines = Object.values(useSelector(state => state.routines))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])


    // console.log("this is routines", routines)
    // if (!user) {
    //     return <Redirect to="/" />
    // }

    return (
        <div className='routine-landing-container'>
            <div className="single-routine">
                <h1>Workout Library</h1>
                {user &&
                    <button id="create-routine-btn" onClick={() => history.push("/routines/create")}>Add Routine</button>
                }
                {isMyRoutine ?
                    myRoutines.toReversed().map(routine => <RoutineDetail key={routine.id} routine={routine} />)
                    : routines.toReversed().map(routine => <RoutineDetail key={routine.id} routine={routine} />)}
            </div>
        </div>
    )

}


export default RoutinePage
