# Build a search application in 15 minutes 

This is a sample code to show you how to use Elastic Enterprise Search and Search UI to quickly build a search application

# Pre-reqs

- [Elastic Cloud](https://cloud.elastic.co/) Deployment created, new accounts can sign-up for a limitless 14-day free trial to POC building a solution like this
- Enable [CORS](https://docs.elastic.co/search-ui/tutorials/elasticsearch#enabling-cors) on Elasticsearch
- Ingest movies data into search-movies index

## Load data

Once your deployment is ready, you can load the sample data. 

You can use the script [index_es.py](index_es.py) to load the data into Elasticsearch.

Pass the Cloud ID and API Key as part of the script execution. Example: `python3 index_es.py --cloud_id xyz --api_key xyz`

## Prepare the application

Edit the file `.env` to provide the following attributes: 

- REACT_APP_AS_SEARCH_API_KEY: Get the [search key](https://www.elastic.co/guide/en/app-search/current/search-guide.html) from the App Search engine credentials.
- REACT_APP_AS_BASE_URL: Get the endpoint from the App Search engine credentials.
- REACT_APP_ES_CLOUD_ID: Get the Cloud ID from the Elastic Cloud deployment UI
- REACT_APP_ES_API_KEY: Generate an [Api Key](https://www.elastic.co/guide/en/kibana/master/api-keys.html) from Kibana



## Run the application locally

Install the dependencies: `yarn install`

Go back to the root folder, run the application: `yarn start`

Access the application on [http://localhost:3000])(http://localhost:3000)
