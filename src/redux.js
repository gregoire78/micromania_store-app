import {
    configureStore,
    createSlice
} from "redux-starter-kit";

const {
    actions,
    reducer: storesReducer
} = createSlice({
    slice: "stores",
    initialState: [],
    reducers: {
        addStore(state, action) {
            state = [...state, action.payload]
            return [...new Set(state.map(a => a.id))].map(id => {
                return state.find(a => a.id === id);
            })
        },
        deleteStore(state, action) {
            return state.filter((store) => store.id !== action.payload)
        }
    }
})

export const store = configureStore({
    reducer: {
        stores: storesReducer
    }
})

export const {
    addStore,
    deleteStore
} = actions;