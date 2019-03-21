const ADD = 'add';
const CUT = 'cut';

//新建store
//根据老的state和action，生成新的state

export function counter(state={num:10},action) {
    switch (action.type) {
        case 'add':
            return {num:state.num+1}
        case 'cut':
            return {num:state.num-1}
        default:
        return {num:10}
    }
}



export function add() {
    return {type:ADD}
}

export function cut() {
    return {type:CUT}
}

export function addSync() {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(add())
        },2000)
    }
}

