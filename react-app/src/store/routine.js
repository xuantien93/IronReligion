//actions
const LOAD_ROUTINES = 'routines/LOAD_ROUTINES'
const ADD_ROUTINES = 'routines/ADD_ROUTINES'
const ADD_WORKOUT = 'routines/ADD_WORKOUT'
const EDIT_WORKOUT = 'routines/EDIT_WORKOUT'

//action creators
const loadRoutines = (routines) => ({
    type: LOAD_ROUTINES,
    routines
})

const addRoutine = (routine) => ({
    type: ADD_ROUTINES,
    routine
})

const addWorkout = (workout) => ({
    type: ADD_WORKOUT,
    workout
})

const editWorkout = (wokrout) => ({
    type: EDIT_WORKOUT,
    wokrout
})

//thunk action creators
export const getAllRoutines = () => async (dispatch) => {
    const res = await fetch('/api/routines')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadRoutines(data))
        return data
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const createRoutine = (data) => async (dispatch) => {
    console.log('data in create routine thunk ', data)
    const res = await fetch("/api/routines", {
        method: 'POST',
        body: data
    })
    if (res.ok) {
        const { resRoutine } = await res.json()
        dispatch(addRoutine(resRoutine))
        // dispatch(addWorkout(resWorkout))
        return resRoutine
    } else {
        const error = await res.json()
        if (error.errors) {
            return error
        }
    }

}
export const createWorkout = (routineId, data) => async (dispatch) => {
    const res = await fetch(`/api/routines/${routineId}/workouts`, {
        method: 'POST',
        body: data
    })
    if (res.ok) {
        const { resWorkout } = await res.json()
        dispatch(addWorkout(resWorkout))
        // dispatch(addWorkout(resWorkout))
        return resWorkout
    } else {
        const error = await res.json()
        if (error.errors) {
            return error
        }
    }

}



const initialState = {}

//Reducer

const routinesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ROUTINES:
            newState = { ...action.routines }
            return newState;
        case ADD_ROUTINES:
            newState = { ...state }
            newState[action.routine.id] = action.routine
            return newState
        case ADD_WORKOUT:
            newState = { ...state }
            newState[action.workout.routine_id].workouts.push(action.workout)
            return newState
        default:
            return state;
    }
}

export default routinesReducer
