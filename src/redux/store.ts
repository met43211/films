    import { filmsReducer } from "./slices/films";
    import { configureStore } from '@reduxjs/toolkit'

    const store = configureStore(
        {
            reducer: filmsReducer
        },
    )

    export type RootState = ReturnType<typeof store.getState>

    export default store