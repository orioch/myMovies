import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ActorInfoCard from "../components/ActorInfoCard";
import ActorOverview from "../components/ActorOverview";
import Slider from "../components/Slider";
import {
  fetchExternalLinks,
  fetchPerson,
  imgUrl,
} from "../components/utils/api";
import "../css/actorPage.css";

/**
 * This component displays information about a particular actor.
 * It makes use of the useEffect hook to fetch data about the actor, their external
 * social media links, and the movies and TV shows they have been in.
 * The component also makes use of the useParams hook to get the id of the actor
 * from the URL.
 */
export default function ActorPage() {
  const [person, setPerson] = useState(undefined); // used to store the data about the actor
  const [externalLinks, setExternalLinks] = useState([]); // used to store the data about the social media links
  const [loading, setLoading] = useState(true); // used to show a loading spinner while the data is being fetched.

  let id = useParams().id; // gets the id of the actor from the URL.

  /**
   * This useEffect hook is called when the component is first rendered.
   * It is used to fetch data about the actor and their external links,
   * using the fetchPerson and fetchExternalLinks functions from the api.js.
   * This data is then stored in the states "person" and "externalLinks".
   */
  useEffect(() => {
    fetchPerson(id, setPerson);
    fetchExternalLinks("person", id, setExternalLinks);
  }, []);

  /**
   * This function is a callback that is passed to the ActorInfoCard component.
   * It is called when the image for the actor has finished loading.
   * It sets a timeout before changing the loading state variable to false,
   * which will hide the loading screen and show the actor page.
   */
  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000));
  };

  return (
    <React.Fragment>
      <div className={`loading ${loading}`}>
        <ColorRing />
      </div>
      {person ? (
        <div className={loading ? "actor-page hidden" : "actor-page"}>
          <ActorInfoCard
            finishLoading={finishLoading}
            person={person}
            externalLinks={externalLinks}
          />
          <ActorOverview person={person} />
        </div>
      ) : null}
    </React.Fragment>
  );
}
