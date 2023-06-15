import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import './RoutinePage.css'
import { getAllRoutines } from '../../store/routine';
import RoutineDetail from './RoutineDetail';



const RoutinePage = () => {
    const dispatch = useDispatch()


    const routines = Object.values(useSelector(state => state.routines))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])


    // console.log("this is routines", routines)


    return (
        <div className='routine-landing-container'>
            <div className="single-routine">
                {routines.map(routine => <RoutineDetail key={routine.id} routine={routine} />)}
            </div>
        </div>
    )

}


export default RoutinePage
