import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import MovieReviews from "./components/MovieReviews";
import MovieInfo from "./components/MovieInfo";

const MoviePage = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const connector = new AppSearchAPIConnector({
    searchKey: process.env.REACT_APP_AS_SEARCH_API_KEY,
    engineName: "movies",
    endpointBase: process.env.REACT_APP_AS_BASE_URL
  });

  const config = {
    alwaysSearchOnInitialLoad: false,
    apiConnector: connector,
    hasA11yNotifications: true,
    trackUrlState: false,
    debug: false,
    initialState: { searchTerm: movieId, resultsPerPage: 1 },
    searchQuery: {
      result_fields: {
        title: { raw: {} },
        poster_path: { raw: {} },
        overview: { raw: {} },
        cast: { raw: {} },
        runtime: {raw: {}},
        release_date: {raw: {}},
        rating: {raw: {}}
      },
      search_fields: {
        id: {}
      },
      disjunctiveFacets: [""],
      facets: {}
    }
  };


  return (
    <div className="movie_page">
      <SearchProvider config={config}>
        <MovieInfo />
      </SearchProvider>
      <MovieReviews />
    </div>
  );

};

export default MoviePage;
