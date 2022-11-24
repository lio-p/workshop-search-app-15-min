from elasticsearch import Elasticsearch, helpers
import json
import argparse

parser = argparse.ArgumentParser()
#required args

parser.add_argument('--api_key', dest='api_key', required=True)
parser.add_argument('--cloud_id', dest='cloud_id', required=True)

args = parser.parse_args()

print("Init elasticsearch connection")
es = Elasticsearch(
    cloud_id=args.cloud_id,
    api_key=args.api_key,
    request_timeout=30
)
print("Elasticsearch connection establish")
moviesFile = open("movies.json")
moviesJson = json.load(moviesFile)
print("Indexing data to Elasticsearch")
status = helpers.parallel_bulk(es, moviesJson, index='search-movies')
# look through each result for status
for i in status:
    if i[0] == False:
        print("There was an error importing a record.  Error: ", i[1])
# if not success:
#     print(info)
print("Finish")
