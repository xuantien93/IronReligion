import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import { getAllClasses } from '../../store/class';
import './ClassPage.css'


const ClassPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const classes = Object.values(useSelector(state => state.classes))
    const user = useSelector(state => state.session.user)




    useEffect(() => {
        dispatch(getAllClasses())
    }, [dispatch])



    return (
        <div className='classes-page-container'>
            <div className='single-class'>
                {classes.map(classItem => {
                    const timeStart = new Date(classItem.time_start);
                    const timeEnd = new Date(classItem.time_end);

                    const durationInMilliseconds = timeEnd.getTime() - timeStart.getTime();
                    const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
                    return (
                        < div className='single-class-block' key={classItem.id} >
                            <span>{classItem.class_name}</span>
                            <span>Start: {classItem.time_start}</span>
                            <span>End: {classItem.time_end}</span>
                            <span>Duration: {durationInMinutes} mins</span>
                            <span>Trainer: {classItem.trainer.first_name} {classItem.trainer.last_name}</span>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}


export default ClassPage
