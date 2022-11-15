// this file have all the functions and the variables that have somthing to do with featching data from api

const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";

export const fetchList = async (listType, listName, setFunction) => {
  const url = `https://api.themoviedb.org/3/${listType}/${listName}?api_key=${apiKey}&language=en-US&page=1`;
  let response = await (await fetch(url)).json();
  setFunction(response.results);
  return response;
};
