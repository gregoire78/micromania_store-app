import {
    configureStore,
    createSlice
} from "redux-starter-kit";

const {
    actions,
    reducer: storesReducer
} = createSlice({
    slice: "stores",
    initialState: 0,
    reducers: {
        addStore(state, action) {
            state.push(action.payload)
        }
    }
})

export const store = configureStore({
    reducer: {
        stores: storesReducer
    }
})

export const {addStore} = actions;