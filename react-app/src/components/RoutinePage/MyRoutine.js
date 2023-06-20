import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RoutinePage from '.';
import { getAllRoutines } from '../../store/routine';



const MyRoutine = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const routines = Object.values(useSelector(state => state.routines))
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getAllRoutines())
    }, [dispatch])

    const myRoutines = routines.filter(routine => routine.user_id === user.id)
    // console.log("this is my routine0,", myRoutines)

    if (!user) {
        return <Redirect to="/" />
    }
    return (
        <RoutinePage myRoutines={myRoutines} isMyRoutine={true} />
    )
}


export default MyRoutine
