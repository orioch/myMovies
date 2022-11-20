// this file have all the functions and the variables that have somthing to do with featching data from api

const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";
export const imgUrl = "http://image.tmdb.org/t/p/original";
const personUrls = {
  imdb: "https://www.imdb.com/name/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
};

const personInfoProps = [
  { prop: "known_for_department", display: "known for" },
  { prop: "gender", display: "gender" },
  { prop: "birthday", display: "birthday" },
  { prop: "deathday", display: "deathday" },
  { prop: "place_of_birth", display: "place of birth" },
  { prop: "also_known_as", display: "also known as" },
];
export const fetchList = async (listType, listName, setFunction) => {
  const url = `https://api.themoviedb.org/3/${listType}/${listName}?api_key=${apiKey}&language=en-US&page=1`;
  let response = await (await fetch(url)).json();
  if (setFunction) setFunction(response.results);
  return response;
};

export const fetchMovie = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  if (setFunction) setFunction(response);
  return response;
};

export const fetchLogo = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}&language=en`;
  let response = await (await fetch(url)).json();
  if (response.logos.length == 0) {
    if (setFunction) setFunction("");
    return "";
  }
  if (setFunction) setFunction(imgUrl + response.logos[0].file_path);
};

export const fetchTrailer = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  let youtubeId = response.results.find(
    (video) => video.type == "Trailer" && video.site == "YouTube"
  ).key;
  if (setFunction) setFunction(youtubeId);
  return youtubeId;
};

export const fetchActors = async (type, id, setFunction, amount) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`;
  let response = await (await fetch(url)).json();
  let cast = response.cast.slice(0, amount);
  if (setFunction) setFunction(cast);
  return cast;
};

export const fetchPerson = async (id, setFunction) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`;
  let response = await (await fetch(url)).json();
  let person = response;
  let info = [];
  personInfoProps.forEach((item) => {
    const { prop, display } = item;
    if (person[prop] && person[prop] != "") {
      info.push({ title: display, value: person[prop] });
      delete person[prop];
    }
  });
  person.info = info;
  if (setFunction) setFunction(person);
  return person;
};

export const fetchExternalLinks = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${apiKey}`;
  let response = await (await fetch(url)).json();
  let externalLinks = Object.keys(response).map((item) => {
    let title = item.split("_")[0];
    if (Object.hasOwn(personUrls, title) && response[item])
      return {
        title,
        link: personUrls[title] + response[item],
      };
    return;
  });
  externalLinks = externalLinks.filter((element) => element !== undefined);
  if (setFunction) setFunction(externalLinks);
  return response;
};

export const fetchActorCredits = async (
  listName,
  creditType,
  id,
  setFunction,
  amount
) => {
  const url = `https://api.themoviedb.org/3/person/${id}/${listName}?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  let credits = response[creditType].slice(0, amount);
  if (setFunction) setFunction(credits);
  return credits;
};
