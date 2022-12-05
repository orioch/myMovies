/**
 * This file exports several functions that can be used to fetch data
 * from the TMDb API.
 */

// This is the API key used to authenticate the requests to the API
const apiKey = "8b01a7b87cdb38e6c9f92b17ae90ef7e";

// This is the base URL for images from the API
export const imgUrl = "http://image.tmdb.org/t/p/original";

// This object contains the URLs for different social media platforms for actors and actresses
const personUrls = {
  imdb: "https://www.imdb.com/name/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
};

// This array contains objects that define which properties of an actor or actress to display and how to display them
const personInfoProps = [
  { prop: "known_for_department", display: "known for" },
  { prop: "gender", display: "gender" },
  { prop: "birthday", display: "birthday" },
  { prop: "deathday", display: "deathday" },
  { prop: "place_of_birth", display: "place of birth" },
  { prop: "also_known_as", display: "also known as" },
];

/**
 * This function is used to fetch a list of results of a specified type from the API.
 * For example, you could use this function to fetch a list of popular movies or a list
 * of the latest TV shows. The function takes three arguments:
 *
 * @param {string} listType - The type of list to fetch. Possible values include "movie", "tv", and "person".
 * @param {string} listName - The name of the list to fetch. Possible values include "popular", "top_rated",
 *                            "upcoming", and others.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
export const fetchList = async (listType, listName, setFunction) => {
  const url = `https://api.themoviedb.org/3/${listType}/${listName}?api_key=${apiKey}&language=en-US&page=1`;
  let response = await (await fetch(url)).json();
  if (setFunction) setFunction(response.results);
  return response;
};

/**
 * This function is used to fetch information about a specific movie or TV show from the API.
 * It takes three arguments:
 *
 * @param {string} type - The type of item to fetch. Possible values are "movie" and "tv".
 * @param {string|number} id - The ID of the item to fetch.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
export const fetchMovie = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  if (setFunction) setFunction(response);
  return response;
};

/**
 * This function is used to fetch the logo for a specific movie or TV show from the API.
 * It takes three arguments:
 *
 * @param {string} type - The type of item to fetch the logo for. Possible values are "movie" and "tv".
 * @param {string|number} id - The ID of the item to fetch the logo for.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
export const fetchLogo = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}&language=en`;
  let response = await (await fetch(url)).json();
  if (response.logos.length == 0) {
    if (setFunction) setFunction("");
    return "";
  }
  if (setFunction) setFunction(imgUrl + response.logos[0].file_path);
};

/**
 * This function is used to fetch the trailer for a specific movie or TV show from the API.
 * It takes three arguments:
 *
 * @param {string} type - The type of item to fetch the trailer for. Possible values are "movie" and "tv".
 * @param {string|number} id - The ID of the item to fetch the trailer for.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
export const fetchTrailer = async (type, id, setFunction) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`;
  let response = await (await fetch(url)).json();
  let youtubeId = response.results.find(
    (video) => video.type == "Trailer" && video.site == "YouTube"
  ).key;
  if (setFunction) setFunction(youtubeId);
  return youtubeId;
};

/**
 * This function is used to fetch a list of actors for a specific movie or TV show from the API.
 * It takes four arguments:
 *
 * @param {string} type - The type of item to fetch the actors for. Possible values are "movie" and "tv".
 * @param {string|number} id - The ID of the item to fetch the actors for.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 * @param {number} amount - The maximum number of actors to fetch.
 */
export const fetchActors = async (type, id, setFunction, amount) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`;
  let response = await (await fetch(url)).json();
  let cast = response.cast.slice(0, amount);
  if (setFunction) setFunction(cast);
  return cast;
};

/**
 * This function is used to fetch information about a specific actor or some other team member from the API.
 * It takes two arguments:
 *
 * @param {string|number} id - The ID of the person to fetch information for.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
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

/**
 * This function is used to fetch the social media URLs for a specific actor or actress from the API.
 * It takes one argument:
 *
 * @param {string|number} id - The ID of the person to fetch URLs for.
 */
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

/**
 * This function is used to fetch the credits (movies and TV shows) for a specific actor or actress from the API.
 * It takes two arguments:
 *
 * @param {string|number} id - The ID of the person to fetch credits for.
 * @param {function} setFunction - A callback function that will be called with the results of the API call.
 *                                 This function can be used to update the state of a component with the
 *                                 results of the API call.
 */
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
