import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";

const initialState = {
  lists: {},
};

export const getList = createAsyncThunk(
  "users/getList",
  ({ listType, listName }) => {
    const url = `https://api.themoviedb.org/3/${listType}/${listName}?api_key=${apiKey}&language=en-US&page=1`;
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

const listsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      const { listType, listName } = action.meta.arg;
      state.lists[listType + "_" + listName] = action.payload.results;
    },
  },
});

export default listsSlice.reducer;
