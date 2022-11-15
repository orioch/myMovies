// this file have all the functions and the variables that have somthing to do with featching data from api

const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";
export const imgUrl = "http://image.tmdb.org/t/p/original";
export const fetchList = async (listType, listName, setFunction) => {
  const url = `https://api.themoviedb.org/3/${listType}/${listName}?api_key=${apiKey}&language=en-US&page=1`;
  let response = await (await fetch(url)).json();
  setFunction(response.results);
  return response;
};

export const fetchMovie = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  console.log(response);
  setFunction(response);
  return response;
};

export const fetchLogo = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}&language=en`;
  let response = await (await fetch(url)).json();
  setFunction(imgUrl + response.logos[0].file_path);
};
