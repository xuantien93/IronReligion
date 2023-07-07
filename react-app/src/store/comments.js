//actions
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const POST_COMMENT = 'comments/POST_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'


//action creators

const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId

})

const createComment = (comment) => ({
    type: POST_COMMENT,
    comment

})


const editComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

//thunk action creators

export const deleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeComment(commentId))
    }
}

export const postComment = (routineId, comment) => async (dispatch) => {
    const response = await fetch(`/api/routines/${routineId}/comments`, {
        method: 'POST',
        body: comment
    })

    if (response.ok) {
        const { resComment } = await response.json();
        dispatch(createComment(resComment))
        return resComment
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }

}

export const updateCommentThunk = (commentId, info) => async (dispatch) => {
    const res = await fetch(`/api/routines/${commentId}/update`, {
        method: 'PUT',
        body: info
    })
    if (res.ok) {
        const { resComment } = await res.json()
        dispatch(editComment(resComment))
        return resComment
    } else {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}

const initialState = {}
// reducer
const commentReducer
    = (state = initialState, action) => {
        let newState;
        switch (action.type) {
            case DELETE_COMMENT:
                newState = { ...state };
                delete newState[action.commentId];
                return newState;
            case POST_COMMENT:
                newState = { ...state };
                newState[action.comment.id] = action.comment;
                return newState;
            case UPDATE_COMMENT:
                newState = { ...state }
                newState[action.comment.id] = action.comment;
                return newState;
            default:
                return state;
        }
    }


export default commentReducer;
