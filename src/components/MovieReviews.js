import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
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

function compare(a, b) {

  if (a.ml.raw.inference.sentiment.predicted_value > b.ml.raw.inference.sentiment.predicted_value) {
    return -1;
  }
  if (a.ml.raw.inference.sentiment.predicted_value < b.ml.raw.inference.sentiment.predicted_value) {
    return 1;
  }
  return 0;
}

function getEmoji(sentiment) {
  if (sentiment == 'Positive') return String.fromCodePoint(128512)
  else if  (sentiment == 'Neutral') return String.fromCodePoint(128528)
  else return String.fromCodePoint(128577)
}

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const connector = new ElasticsearchAPIConnector({
    cloud: {
      id: process.env.REACT_APP_ES_CLOUD_ID
    },
    apiKey: process.env.REACT_APP_ES_API_KEY,
    index: "search-reviews"
  });


  const config = {
    alwaysSearchOnInitialLoad: true,
    apiConnector: connector,
    hasA11yNotifications: true,
    trackUrlState: false,
    initialState: { searchTerm: movieId, resultsPerPage: 20 },
    searchQuery: {
      result_fields: {
        content: { raw: {} },
        author: { raw: {} },
        ml: { raw: {} }

      },
      search_fields: {
        movie_id: {}
      },
      disjunctiveFacets: [""],
      facets: {}
    }
  };

  return (

    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched, results }) => ({
          wasSearched, results
        })}
      >
        {({ wasSearched, results }) => {
          return (
            <div className="movie_review">
              <div className="review_header"> 
              Reviews</div>
              {results.sort(compare).map(review => {
                return (
                    <div className="review review_positive">
                     {getEmoji(review.ml.raw.inference.sentiment.predicted_value)} {review.content.raw}
                    </div>
                   
                )
              })}

            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );

};

export default MovieReviews;
