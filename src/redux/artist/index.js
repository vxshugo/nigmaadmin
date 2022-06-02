import {createSlice} from '@reduxjs/toolkit';

export const artistSlice = createSlice({
    name: "artists",
    initialState: {
        artists: null,
        createArtistProgress: false,
        getAllArtistProgress: false,
        updateArtistProgress: false,
        deleteArtistProgress: false,
        addSongProgress: false,
        error: false,
    },
    reducers:{
        createArtistStart:(state) => {
          state.createArtistProgress = true;
        },
        createArtistSuccess: (state,action) => {
            state.artists.push(action.payload);
        },
        createArtistFailure: (state) => {
            state.error = true;
            state.createArtistProgress= false;
        },
        getAllArtistStart: (state)=>{
          state.getAllArtistProgress = true;
        },
        getAllArtistSuccess: (state, action) => {
          state.artists = action.payload;
          state.getAllArtistProgress = false;
        },
        getAllArtistFailure: (state) => {
            state.error = true;
            state.getAllArtistProgress = false;
        },
        updateArtistStart: (state) => {
            state.isFetching = true;
        },
        updateArtistSuccess: (state, action) => {
            const index = state.artists.findIndex(
                (artist) => artist._id === action.payload._id
            );
            state.artists[index] = action.payload;
            state.isFetching = false;
        },
        updateArtistFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        deleteArtistStart: (state) => {
            state.isFetching = true;
        },
        deleteArtistSuccess: (state, action) => {
            state.artists = state.artists.filter((artist) => artist._id !== action.payload);
            state.isFetching = false;
        },
        deleteArtistFailure: (state)=> {
            state.error = true;
            state.isFetching = false;
        },
        addArtistSongStart: (state) =>{
            state.addSongProgress = true;
        },
        addArtistSongSuccess: (state, action) => {
            const index = state.artists.indexOf(action.payload._id);
            state.artists[index] = action.payload;
            state.addSongProgress = false;
        },
        addArtistSongFailure: (state) => {
            state.error = true;
            state.addSongProgress = false;
        }
    }
})

export const {
    createArtistStart,
    createArtistSuccess,
    createArtistFailure,
    getAllArtistStart,
    getAllArtistSuccess,
    getAllArtistFailure,
    updateArtistStart,
    updateArtistSuccess,
    updateArtistFailure,
    deleteArtistSuccess,
    deleteArtistFailure,
    deleteArtistStart,
    addArtistSongSuccess,
    addArtistSongFailure,
    addArtistSongStart
} = artistSlice.actions;

export default artistSlice.reducer;