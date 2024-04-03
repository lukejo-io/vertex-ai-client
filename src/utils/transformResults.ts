interface OriginalResponse {
  results: {
    document: {
      derivedStructData: {
        fields: {
          title: { stringValue: string };
          htmlTitle: { stringValue: string };
          snippets: {
            listValue: {
              values: {
                structValue: {
                  fields: {
                    snippet: { stringValue: string };
                    htmlSnippet: { stringValue: string };
                  };
                };
              }[];
            };
          };
          formattedUrl: { stringValue: string };
          link: { stringValue: string };
          htmlFormattedUrl: { stringValue: string };
          pagemap: {
            structValue: {
              fields: {
                metatags: {
                  listValue: {
                    values: {
                      structValue: {
                        fields: { viewport: { stringValue: string } };
                      };
                    }[];
                  };
                };
                cse_thumbnail: {
                  listValue: {
                    values: {
                      structValue: {
                        fields: {
                          height: { stringValue: string };
                          width: { stringValue: string };
                          src: { stringValue: string };
                        };
                      };
                    }[];
                  };
                };
                cse_image?: {
                  listValue: {
                    values: {
                      structValue: { fields: { src: { stringValue: string } } };
                    }[];
                  };
                };
                listitem?: {
                  listValue: {
                    values: {
                      structValue: {
                        fields: {
                          position: { stringValue: string };
                          name: { stringValue: string };
                          item: { stringValue: string };
                        };
                      };
                    }[];
                  };
                };
              };
            };
          };
          displayLink: { stringValue: string };
        };
      };
    };
  }[];
  totalSize: number;
  attributionToken: string;
  nextPageToken: string;
  correctedQuery: string;
  summary: {
    summarySkippedReasons: any[];
    summaryText: string;
    safetyAttributes: any;
    summaryWithMetadata: any;
  };
  redirectUri: string;
  queryExpansionInfo: any;
}

interface TargetJSON {
  kind: string;
  url: { type: string; template: string };
  queries: {
    request: {
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      language: string;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }[];
    nextPage: {
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      language: string;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }[];
  };
  context: { title: string };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items: {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: {
      metatags?: {
        og_type: string;
        viewport: string;
        search_doc_aid: string;
        og_title: string;
        title: string;
        og_url: string;
        version: string;
      }[];
      cse_thumbnail?: { src: string; width: string; height: string }[];
      cse_image?: { src: string }[];
    };
    cacheId?: string;
  }[];
}

function transformResults(originalResponse: any): TargetJSON {
  const transformedResponse: any = {
    kind: 'customsearch#search',
    url: {
      type: 'application/json',
      template:
        'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json',
    },
    queries: {
      request: [],
      nextPage: [],
    },
    context: { title: 'Churchofjesuschrist.org' },
    searchInformation: {
      searchTime: 0,
      formattedSearchTime: '0.00',
      totalResults: originalResponse.totalSize.toString(),
      formattedTotalResults: originalResponse.totalSize.toLocaleString(),
    },
    items: [],
  };

  originalResponse.results.forEach((result) => {
    const fields = result.document.derivedStructData.fields;
    transformedResponse.items.push({
      kind: 'customsearch#result',
      title: fields.title.stringValue,
      htmlTitle: fields.htmlTitle.stringValue,
      link: fields.link.stringValue,
      displayLink: fields.displayLink.stringValue,
      snippet:
        fields.snippets.listValue.values[0].structValue.fields.snippet
          .stringValue,
      htmlSnippet:
        fields.snippets.listValue.values[0].structValue.fields.htmlSnippet
          .stringValue,
      formattedUrl: fields.formattedUrl.stringValue,
      htmlFormattedUrl: fields.htmlFormattedUrl.stringValue,
      pagemap: {
        // metatags: fields.pagemap.structValue.fields.metatags
        //   ? fields.pagemap.structValue.fields.metatags.map((tag) => ({
        //       og_type: tag.fields['og:type'].stringValue,
        //       viewport: tag.fields.viewport.stringValue,
        //       search_doc_aid: tag.fields['search.doc-aid'].stringValue,
        //       og_title: tag.fields['og:title'].stringValue,
        //       title: tag.fields.title.stringValue,
        //       og_url: tag.fields['og:url'].stringValue,
        //       version: tag.fields.version.stringValue,
        //     }))
        //   : [],
        cse_thumbnail: fields?.pagemap?.structValue?.fields?.cse_thumbnail
          ?.listValue?.values
          ? fields.pagemap.structValue.fields.cse_thumbnail.listValue.values.map(
              (value) => ({
                src: value.structValue.fields.src.stringValue,
                width: value.structValue.fields.width.stringValue,
                height: value.structValue.fields.height.stringValue,
              }),
            )
          : [],
        cse_image: fields?.pagemap?.structValue?.fields?.cse_image?.listValue
          ?.values
          ? fields.pagemap.structValue.fields.cse_image.listValue.values.map(
              (value) => ({
                src: value.structValue.fields.src.stringValue,
              }),
            )
          : [],
      },
      cacheId: result.document.cacheId,
    });
  });

  originalResponse.results.forEach((result) => {
    const fields = result.document.derivedStructData.fields;
    transformedResponse.queries.request.push({
      title: fields.title.stringValue,
      totalResults: originalResponse.totalSize.toString(),
      searchTerms: fields.title.stringValue,
      count: 10,
      startIndex: 1,
      language: 'lang_en',
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      safe: 'off',
      // cx: fields.pagemap.structValue.fields.metatags?.find(
      //   (tag) => tag.fields['og:type'].stringValue === 'website',
      // )?.fields['search.doc-aid'].stringValue,
    });
    transformedResponse.queries.nextPage.push({
      title: fields.title.stringValue,
      totalResults: originalResponse.totalSize.toString(),
      searchTerms: fields.title.stringValue,
      count: 10,
      startIndex: 11,
      language: 'lang_en',
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      safe: 'off',
      // cx: fields.pagemap.structValue.fields.metatags?.find(
      //   (tag) => tag.fields['og:type'].stringValue === 'website',
      // )?.fields['search.doc-aid'].stringValue,
    });
  });

  return transformedResponse;
}

export default transformResults;
