function transformWebResults(originalResponse) {
  const transformedResponse = {
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
    nextPageToken: originalResponse.nextPageToken,
  };

  originalResponse.results.forEach((result) => {
    const fields = result.document.derivedStructData.fields;
    transformedResponse.items.push({
      kind: 'customsearch#result',
      title: fields.title?.stringValue ?? '',
      htmlTitle: fields.htmlTitle?.stringValue ?? '',
      link: fields.link?.stringValue ?? '',
      displayLink: fields.displayLink?.stringValue ?? '',
      snippet:
        fields.snippets.listValue.values[0].structValue.fields.snippet
          ?.stringValue ?? '',
      htmlSnippet:
        fields.snippets.listValue.values[0].structValue.fields.htmlSnippet
          ?.stringValue ?? '',
      formattedUrl: fields.formattedUrl?.stringValue ?? '',
      htmlFormattedUrl: fields.htmlFormattedUrl?.stringValue ?? '',
      pagemap: {
        // metatags: fields.pagemap.structValue.fields.metatags
        //   ? fields.pagemap.structValue.fields.metatags.map((tag) => ({
        //       og_type: tag.fields['og:type']?.stringValue ?? ',
        //       viewport: tag.fields.viewport?.stringValue ?? ',
        //       search_doc_aid: tag.fields['search.doc-aid']?.stringValue ?? ',
        //       og_title: tag.fields['og:title']?.stringValue ?? ',
        //       title: tag.fields.title?.stringValue ?? ',
        //       og_url: tag.fields['og:url']?.stringValue ?? ',
        //       version: tag.fields.version?.stringValue ?? ',
        //     }))
        //   : [],
        cse_thumbnail: fields?.pagemap?.structValue?.fields?.cse_thumbnail
          ?.listValue?.values
          ? fields.pagemap.structValue.fields.cse_thumbnail.listValue.values.map(
              (value) => ({
                src: value.structValue.fields.src?.stringValue ?? '',
                width: value.structValue.fields.width?.stringValue ?? '',
                height: value.structValue?.fields?.height?.stringValue ?? '',
              }),
            )
          : [],
        cse_image: fields?.pagemap?.structValue?.fields?.cse_image?.listValue
          ?.values
          ? fields.pagemap.structValue.fields.cse_image.listValue.values.map(
              (value) => ({
                src: value.structValue.fields.src?.stringValue ?? '',
                height: null,
                width: null,
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
      title: fields.title?.stringValue ?? '',
      totalResults: originalResponse.totalSize.toString(),
      searchTerms: fields.title?.stringValue ?? '',
      count: 10,
      startIndex: 1,
      language: 'lang_en',
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      safe: 'off',
      // cx: fields.pagemap.structValue.fields.metatags?.find(
      //   (tag) => tag.fields['og:type']?.stringValue ?? ' === 'website',
      // )?.fields['search.doc-aid']?.stringValue ?? ',
    });
    transformedResponse.queries.nextPage.push({
      title: fields.title?.stringValue ?? '',
      totalResults: originalResponse.totalSize.toString(),
      searchTerms: fields.title?.stringValue ?? '',
      count: 10,
      startIndex: 11,
      language: 'lang_en',
      inputEncoding: 'utf8',
      outputEncoding: 'utf8',
      safe: 'off',
      // cx: fields.pagemap.structValue.fields.metatags?.find(
      //   (tag) => tag.fields['og:type']?.stringValue ?? ' === 'website',
      // )?.fields['search.doc-aid']?.stringValue ?? ',
    });
  });

  return transformedResponse;
}

export default transformWebResults;
