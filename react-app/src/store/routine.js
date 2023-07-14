//actions
const LOAD_ROUTINES = 'routines/LOAD_ROUTINES'
const ADD_ROUTINES = 'routines/ADD_ROUTINES'
const ADD_WORKOUT = 'routines/ADD_WORKOUT'
const EDIT_WORKOUT = 'routines/EDIT_WORKOUT'
const DELETE_WORKOUT = 'routines/DELETE_WORKOUT'
const EDIT_ROUTINE = 'routines/EDIT_ROUTINE'
const DELETE_ROUTINE = 'routines/DELETE_ROUTINE'

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

const editWorkout = (workout) => ({
    type: EDIT_WORKOUT,
    workout
})

const deleteWorkout = (workoutId, routineId) => ({
    type: DELETE_WORKOUT,
    workoutId,
    routineId
});

const editRoutine = (routine) => ({
    type: EDIT_ROUTINE,
    routine
})

const deleteRoutine = (routineId) => ({
    type: DELETE_ROUTINE,
    routineId
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

export const editWorkoutThunk = (workoutId, info) => async (dispatch) => {
    const res = await fetch(`/api/workouts/${workoutId}/update`, {
        method: 'PUT',
        body: info
    })
    if (res.ok) {
        const { resWorkout } = await res.json()
        dispatch(editWorkout(resWorkout))
        return resWorkout
    } else {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}

export const deleteWorkoutThunk = (workoutId, routineId) => async (dispatch) => {
    const res = await fetch(`/api/workouts/${workoutId}/delete`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteWorkout(workoutId, routineId));
    }
};

export const editRoutineThunk = (routineId, info) => async (dispatch) => {
    const res = await fetch(`/api/routines/${routineId}/update`, {
        method: 'PUT',
        body: info
    })
    if (res.ok) {
        const { resRoutine } = await res.json()
        dispatch(editRoutine(resRoutine))
        return resRoutine
    } else {
        const data = await res.json()
        console.log("this is data", data)
        if (data.errors) {
            return data
        }
    }
}

export const deleteRoutineThunk = (routineId) => async (dispatch) => {
    const res = await fetch(`/api/routines/${routineId}/delete`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteRoutine(routineId))
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
        case EDIT_WORKOUT:
            newState = { ...state };
            const routine_Id = action.workout.routine_id;
            const workoutIndex = newState[routine_Id].workouts.findIndex(
                (workout) => workout.id === action.workout.id
            );
            if (workoutIndex !== -1) {
                newState[routine_Id].workouts[workoutIndex] = action.workout;
            }
            return newState;
        case DELETE_WORKOUT:
            newState = { ...state };
            const routineId = action.routineId;
            const workoutArray = newState[routineId].workouts;
            const updatedWorkouts = workoutArray.filter(workout => workout.id !== action.workoutId);
            newState[routineId].workouts = updatedWorkouts;
            return newState;
        case EDIT_ROUTINE:
            newState = { ...state }
            newState[action.routine.id] = action.routine
            return newState
        case DELETE_ROUTINE:
            newState = { ...state }
            delete newState[action.routineId]
            return newState
        default:
            return state;
    }
}

export default routinesReducer
