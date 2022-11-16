import { imgUrl } from "./api";

export const backgroundStyle = (imgId) => {
  return {
    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 17%, rgba(0,0,0,0.713344712885154) 81%, rgba(0,0,0,1) 100%), 
    url(${imgUrl + imgId})`,
  };
};
