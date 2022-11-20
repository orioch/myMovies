import React, { useEffect, useState } from "react";
import { imgUrl } from "./utils/api";

export default function ActorInfoCard({
  person,
  externalLinks,
  finishLoading,
}) {
  const [loadedImagesCounter, setLoadedImagesCounter] = useState(0);

  useEffect(() => {
    if (loadedImagesCounter == imagesInComponent) finishLoading();
  }, [loadedImagesCounter]);

  const imagesInComponent = externalLinks.length + 1;
  const imageLoaded = () => {
    setLoadedImagesCounter((prev) => prev + 1);
  };
  const getInfoValueJsx = ({ title, value }) => {
    if (title == "gender")
      return value == 0 ? (
        <p>other</p>
      ) : value == 1 ? (
        <p>female</p>
      ) : (
        <p>male</p>
      );
    if (title == "also known as") return value.map((i) => <p>{i}</p>);
    return <p>{value}</p>;
  };
  return (
    <div className="card-column">
      <img
        onLoad={imageLoaded}
        src={imgUrl + person.profile_path}
        alt={person.name}
        className="actor-img"
      />
      <div className="external-links">
        {externalLinks.map((item) => (
          <a href={item.link}>
            <img
              onLoad={imageLoaded}
              src={require(`../assets/icons/${item.title}.png`)}
              alt=""
              className="icon"
            />
          </a>
        ))}
      </div>
      <div className="info">
        <h1>Personal Info</h1>
        {person.info.map((item) => (
          <React.Fragment>
            <h2>{item.title}</h2>
            {getInfoValueJsx(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
