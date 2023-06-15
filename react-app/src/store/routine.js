//actions
const LOAD_ROUTINES = 'routines/LOAD_ROUTINES'
const SINGLE_ROUTINE = 'routines/SINGLE_ROUTINE'

//action creators
const loadRoutines = (routines) => ({
    type: LOAD_ROUTINES,
    routines
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


const initialState = {}

//Reducer

const routinesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ROUTINES:
            newState = { ...action.routines }
            return newState;
        default:
            return state;
    }
}

export default routinesReducer
