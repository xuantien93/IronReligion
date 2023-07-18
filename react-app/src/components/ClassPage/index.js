import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import { getAllClasses } from '../../store/class';
import './ClassPage.css'
import { createBooking, deleteBookingThunk, getAllBooking } from '../../store/booking';
import OpenModalButton from '../OpenModalButton';
import DeleteBookingModal from '../MyBookings/DeleteBookingModal';
import Mybooking from '../MyBookings';


const ClassPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const classes = Object.values(useSelector(state => state.classes))
    const user = useSelector(state => state.session.user)
    const bookings = Object.values(useSelector(state => state.bookings))
    const [reservedClasses, setReservedClasses] = useState([]);
    const [errors, setErrors] = useState('');




    useEffect(() => {
        dispatch(getAllClasses())
        dispatch(getAllBooking())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setErrors('')
        }
    }, [user])


    const getCurrentDateTime = () => {
        const now = new Date();
        return now.getTime();
    };



    const myBooking = bookings.filter(booking => booking.user_id === user?.id)

    // console.log("this is mybooking", myBooking)
    return (
        <div className='classes-page-container'>
            <h1>Classes</h1>
            <div className='single-class'>
                {classes.map(classItem => {
                    const timeStart = new Date(classItem.time_start);
                    const timeEnd = new Date(classItem.time_end);

                    const durationInMilliseconds = timeEnd.getTime() - timeStart.getTime();
                    const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));

                    const handleReserve = async (e) => {
                        e.preventDefault()
                        const data = await dispatch(createBooking(classItem))
                        if (data.errors) {
                            setErrors(`${data.errors[0]}: Please login to reserve`)
                        } else {
                            setReservedClasses([...reservedClasses, classItem.id])
                        }
                    }

                    const isReserved = reservedClasses.includes(classItem.id)
                    const isAlreadyPassed = getCurrentDateTime() > timeStart.getTime();
                    const isAlreadyBooked = myBooking.some(booking => booking.class_id === classItem.id);
                    const myNewBooking = myBooking.find(booking => booking.class_id === classItem.id);

                    return (
                        < div className='single-class-block' key={classItem.id} >
                            <span>{classItem.class_name}</span>
                            <span>Start: {classItem.time_start}</span>
                            <span>End: {classItem.time_end}</span>
                            <span>Duration: {durationInMinutes} mins</span>
                            <span>Trainer: {classItem.trainer.first_name} {classItem.trainer.last_name}</span>
                            {errors && <p style={{ color: "red" }}>{errors}</p>}
                            <div className='reserve-block'>
                                <button id="reserve-btn"
                                    disabled={isAlreadyBooked || isReserved || isAlreadyPassed}
                                    onClick={handleReserve}
                                    className={isAlreadyPassed || isAlreadyBooked ? "already-passed" : ""}
                                >{isReserved ? "Reserved" : (isAlreadyPassed ? 'Already Passed' : (isAlreadyBooked ? 'Already Booked' : 'Reserve'))}</button>
                                {isAlreadyBooked && (
                                    < div id="reserve-btn2">
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteBookingModal bookingId={myNewBooking?.id} bookingPage={true}
                                            />}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}


export default ClassPage
