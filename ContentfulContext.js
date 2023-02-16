import React, { createContext, useState, useEffect } from "react";
import {
  categorizeHistoricalSites,
  categorizeImportantPeople,
  categorizeCultures,
  categorizeTours,
} from "./lib/contentfulHelper.js";
import Shuffle from "./Components/Shuffle.js";
import * as Location from "expo-location";
//Context provides a way to pass data through the component tree without having to pass props down manually at every level..
//This page will contain all the data from contentful and the user will be able to pass data to different files using this code.
const ContentfulDataContext = createContext();
const ContentfulContextProvider = ({ children }) => {
  const [contentfulData, setContentfulData] = useState(null);

  //Use Effect that takes the data from contentful and stores it in contentful data use state.
  useEffect(() => {
    const fetchData = async () => {
      let responseArticles = await fetch(
        "https://cdn.contentful.com/spaces/medznjolzzmh/environments/master/entries?access_token=jeA7zHNhaRYGujpCQ6MrIB_9Wk5P2R4Pvwmn7ym7xZ4&content_type=historicalSite"
      );
      let responsePeople = await fetch(
        "https://cdn.contentful.com/spaces/medznjolzzmh/environments/master/entries?access_token=jeA7zHNhaRYGujpCQ6MrIB_9Wk5P2R4Pvwmn7ym7xZ4&content_type=importantPeople"
      );
      let responseCultures = await fetch(
        "https://cdn.contentful.com/spaces/medznjolzzmh/environments/master/entries?access_token=jeA7zHNhaRYGujpCQ6MrIB_9Wk5P2R4Pvwmn7ym7xZ4&content_type=culture"
      );
      let responseTours = await fetch(
        "https://cdn.contentful.com/spaces/medznjolzzmh/environments/master/entries?access_token=jeA7zHNhaRYGujpCQ6MrIB_9Wk5P2R4Pvwmn7ym7xZ4&content_type=tours"
      );

      const contentfulArticles = await responseArticles.json();
      const contentfulPeople = await responsePeople.json();
      const contentfulCultures = await responseCultures.json();
      const contentfulTours = await responseTours.json();

      const articles = Shuffle(categorizeHistoricalSites(contentfulArticles));
      const people = Shuffle(categorizeImportantPeople(contentfulPeople));
      const cultures = Shuffle(categorizeCultures(contentfulCultures));
      const tours = Shuffle(categorizeTours(contentfulTours));

      await Location.requestForegroundPermissionsAsync();
      setContentfulData({ articles, people, cultures, tours });
      await Location.requestForegroundPermissionsAsync();
    };

    fetchData();
  }, []);

  return (
    <ContentfulDataContext.Provider value={contentfulData}>
      {children}
    </ContentfulDataContext.Provider>
  );
};

export { ContentfulDataContext, ContentfulContextProvider };
