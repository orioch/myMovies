import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const initialState = {
  popular: [],
};

export const getPopular = createAsyncThunk("users/getPopular", () => {
  return fetch(popularUrl)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const listsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [getPopular.fulfilled]: (state, action) => {
      state.popular = action.payload.results;
      console.log(state.popular);
    },
  },
});

export default listsSlice.reducer;
