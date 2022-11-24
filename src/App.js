import './App.css';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
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
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Link } from "react-router-dom";



const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_AS_SEARCH_API_KEY,
  engineName: "movies",
  endpointBase: process.env.REACT_APP_AS_BASE_URL
});

const config = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      title: { raw: {} },
      poster_path: { raw: {} },
      overview: { snippet: { size: 100, fallback: true } },
      cast: { raw: {} },
    },
    search_fields: {
      title: {},
      cast: {},
      overview: {},
      genres: {},
    },
    disjunctiveFacets: [""],
    facets: {
      genres: { type: "value", size: 30 },
      cast: { type: "value", size: 30 },
      production_companies: { type: "value", size: 30 },
    }
  }
};

const CustomResultView = ({ result, onClickLink }) => (
  <li className="sui-result">
    <div className="sui-result__header">
      <h3>
        {/* Maintain onClickLink to correct track click throughs for analytics*/}
        <Link to={`/movie/${result.id.raw}`}>{result.title.raw}</Link>
        
      </h3>
    </div>
    <div className="sui-result__body">
      {/* use 'raw' values of fields to access values without snippets */}
      <div className="sui-result__image">
        <img src={result.poster_path.raw} alt="" />
      </div>
      {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
      <div>
        <div
          className="sui-result__details"
          dangerouslySetInnerHTML={{ __html: result.overview.snippet }}
        ></div>
        <div
          className="sui-result__details"
        >With:
          {result.cast.raw.slice(0, 3).map((cast) => (
            <li key={cast}>{cast}</li>
          ))}
        </div>
      </div>

    </div>
  </li>
);

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox debounceLength={0} />}
                  sideContent={
                    <div>
                      <Facet
                        field="cast"
                        label="Cast"
                        isFilterable={true}
                      />
                      <Facet
                        field="genres"
                        label="Genres"
                        isFilterable={true}
                      />
                      <Facet
                        field="production_companies"
                        label="Production companies"
                        isFilterable={true}
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      resultView={CustomResultView}
                      titleField="title"
                      thumbnailField="poster_path"
                      shouldTrackClickThrough
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}