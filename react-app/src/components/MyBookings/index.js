import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { getAllBooking } from '../../store/booking';
import OpenModalButton from '../OpenModalButton';
import DeleteBookingModal from './DeleteBookingModal';

const Mybooking = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const bookings = Object.values(useSelector(state => state.bookings))

    // console.log("this is bookings", bookings)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllBooking())
    }, [dispatch])


    if (!user) {
        history.push(`/`)
    }

    return (
        <div className='mybooking-container'>
            <div className='mybooking-header'>
                <h1>My bookings</h1>
            </div>
            <div className='mybooking-content'>
                {bookings.toReversed().map(booking => {
                    const timeStart = new Date(booking.time_start);
                    const timeEnd = new Date(booking.time_end);

                    const durationInMilliseconds = timeEnd.getTime() - timeStart.getTime();
                    const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));

                    return (
                        booking.user_id === user.id && <div key={booking.id}>
                            <div className='mybooking-detail'>
                                <h3>{booking.class.class_name}</h3>
                                <p>Start: {booking.class.time_start}</p>
                                <p>End: {booking.class.time_end}</p>
                                <p>Duration: {durationInMinutes}</p>
                            </div>
                            <div className='mybooking-delete-modal'>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteBookingModal bookingId={booking.id} />}
                                />
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>

    )
}



export default Mybooking
