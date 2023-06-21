//actions

const LOAD_TRAINERS = 'trainers/LOAD_TRAINERS'

//action creators

const loadTrainers = (trainers) => ({
    type: LOAD_TRAINERS,
    trainers
})


//thunk action creators

export const getAllTrainers = () => async (dispatch) => {
    const res = await fetch(`/api/trainers`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadTrainers(data))
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

const trainerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TRAINERS:
            newState = { ...action.trainers }
            return newState
        default:
            return state;
    }
}

export default trainerReducer
