//actions

const LOAD_CLASSES = 'classes/LOAD_CLASSES'


//action creators

const loadClasses = (classes) => ({
    type: LOAD_CLASSES,
    classes
})

//thunk action creators

export const getAllClasses = () => async (dispatch) => {
    const res = await fetch(`/api/classes`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadClasses(data))
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
const classReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CLASSES:
            newState = { ...action.classes }
            return newState
        default:
            return state;
    }
}


export default classReducer
