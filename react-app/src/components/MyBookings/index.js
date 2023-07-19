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

    const user = useSelector(state => state.session.user)
    // console.log("this is user", user)

    useEffect(() => {
        dispatch(getAllBooking())
    }, [dispatch])

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.getTime();
    };

    if (!user) {
        return <Redirect to="/" />
    }
    const userBooking = bookings.some(booking => booking.user_id === user?.id)

    return (
        <div className='mybooking-container'>
            <div className='mybooking-header'>
                <h1>My Classes</h1>
            </div>
            <div className='mybooking-content'>
                {!userBooking ? (
                    <h2>Sign up for a <NavLink id="nav-class" to="classes">class</NavLink> now!</h2>
                ) : (
                    bookings.toReversed().map(booking => {
                        const timeStart = new Date(booking.time_start);
                        const timeEnd = new Date(booking.time_end);

                        const durationInMilliseconds = timeEnd.getTime() - timeStart.getTime();
                        const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
                        const isAlreadyPassed = getCurrentDateTime() > timeStart.getTime();
                        return (
                            booking.user_id === user?.id && <div key={booking.id}>
                                <div className='mybooking-detail'>
                                    <h3>{booking.class.class_name}</h3>
                                    <p>Start: {booking.class.time_start}</p>
                                    <p>End: {booking.class.time_end}</p>
                                    <p>Duration: {durationInMinutes}</p>
                                </div>
                                <div className='mybooking-bottom-btn'>
                                    {isAlreadyPassed ? (<button disabled={true}>Completed</button>) :
                                        < div className='mybooking-delete-modal'>
                                            <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={<DeleteBookingModal bookingId={booking.id} />}
                                            />
                                        </div>}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div >
    )
}



export default Mybooking
