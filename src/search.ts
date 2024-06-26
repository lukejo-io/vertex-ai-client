import { SearchServiceClient } from '@google-cloud/discoveryengine';

const projectId = '646976114225';
const location = 'global'; // Options: 'global', 'us', 'eu'
const collectionId = 'default_collection'; // Options: 'default_collection'
const dataStoreId = 'ccd-vertex-data_1711661587561'; // Create in Cloud Console
const servingConfigId = 'default_config'; // Options: 'default_config'

// For more information, refer to:
// https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
const apiEndpoint =
  location === 'global'
    ? 'discoveryengine.googleapis.com'
    : `${location}-discoveryengine.googleapis.com`;

// Instantiates a client
const client = new SearchServiceClient({
  apiEndpoint: apiEndpoint,
});

async function search(query, isImageSearch, pageSize = 10, offset = 0) {
  // The full resource name of the search engine serving configuration.
  // Example: projects/{projectId}/locations/{location}/collections/{collectionId}/dataStores/{dataStoreId}/servingConfigs/{servingConfigId}
  // You must create a search engine in the Cloud Console first.
  const name = client.projectLocationCollectionDataStoreServingConfigPath(
    projectId,
    location,
    collectionId,
    dataStoreId,
    servingConfigId,
  );

  const request = {
    pageSize,
    offset,
    query,
    servingConfig: name,
    ...(isImageSearch && {
      params: {
        search_type: { numberValue: 1 },
      },
    }),
  };

  const IResponseParams = {
    ISearchResult: 0,
    ISearchRequest: 1,
    ISearchResponse: 2,
  };

  // Perform search request
  const response = await client.search(request, {
    // Warning: Should always disable autoPaginate to avoid iterate through all pages.
    //
    // By default NodeJS SDK returns an iterable where you can iterate through all
    // search results instead of only the limited number of results requested on
    // pageSize, by sending multiple sequential search requests page-by-page while
    // iterating, until it exhausts all the search results. This will be unexpected and
    // may cause high Search API usage and long wait time, especially when the matched
    // document numbers are huge.
    autoPaginate: false,
  });

  return response[IResponseParams.ISearchResponse];
}

export default search;
