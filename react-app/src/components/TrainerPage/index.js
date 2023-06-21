import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import './TrainerPage.css'
import { getAllTrainers } from '../../store/trainer';



const TrainerPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const trainers = Object.values(useSelector(state => state.trainers))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllTrainers())
    }, [dispatch])


    return (
        <div className='trainer-page-container'>
            <h1>Iron Religion Team</h1>
            {trainers.map(trainer =>
                <div className='single-trainer' key={trainer.id}>
                    <div className='trainer-image-container'>
                        <img src={trainer.image} id="trainer-img"></img>
                    </div>
                    <div className='trainer-info-block'>
                        <span>{trainer.first_name} {trainer.last_name}</span>
                        <span> {trainer.email}</span>
                        <span> {trainer.specialization}</span>
                    </div>
                    <div className='trainer-bio'>
                        {trainer.bio}
                    </div>
                </div>
            )}
        </div>
    )
}


export default TrainerPage
