//actions
const ALL_BOOKING = 'bookings/ALL_BOOKING'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'


//action creators
const allBooking = (bookings) => ({
    type: ALL_BOOKING,
    bookings
})

const addBooking = (booking) => ({
    type: ADD_BOOKING,
    booking
})


const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

//thunk action creators

export const getAllBooking = () => async (dispatch) => {
    const res = await fetch(`/api/bookings`)
    if (res.ok) {
        const data = await res.json()
        dispatch(allBooking(data))
        return data
    } else {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}

export const createBooking = (data) => async (dispatch) => {
    // const { id, time_start, time_end, trainer_id } = data
    const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const { resBooking } = await res.json()
        dispatch(addBooking(resBooking))
        return resBooking

    } else {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await fetch(`/api/bookings/${bookingId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteBooking(bookingId))
    }
}

const initialState = {}
//Reducer
const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_BOOKING:
            newState = { ...action.bookings }
            return newState
        case ADD_BOOKING:
            newState = { ...state }
            newState[action.booking.id] = action.booking
            return newState
        case DELETE_BOOKING:
            newState = { ...state }
            delete newState[action.bookingId]
            return newState
        default:
            return state;
    }
}


export default bookingReducer
