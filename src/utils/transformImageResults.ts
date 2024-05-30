function transformImageResults(originalResponse) {
  const transformedItems = originalResponse.results.map((originalItem) => {
    const originalDocument = originalItem.document;
    const originalFields = originalDocument.derivedStructData.fields;

    const transformedItem = {
      kind: 'customsearch#result',
      title: originalFields.title.stringValue,
      htmlTitle: originalFields.htmlTitle.stringValue,
      link: originalFields.link.stringValue,
      displayLink: originalFields.displayLink.stringValue,
      snippet:
        originalFields.snippets.listValue.values[0].structValue.fields.snippet
          .stringValue,
      htmlSnippet:
        originalFields.snippets.listValue.values[0].structValue.fields
          .htmlSnippet.stringValue,
      mime: originalFields.mime.stringValue,
      fileFormat: originalFields.fileFormat.stringValue,
      image: {
        byteSize: originalFields.image.structValue.fields.byteSize.numberValue,
        width: originalFields.image.structValue.fields.width.numberValue,
        contextLink:
          originalFields.image.structValue.fields.contextLink.stringValue,
        thumbnailHeight:
          originalFields.image.structValue.fields.thumbnailHeight.numberValue,
        height: originalFields.image.structValue.fields.height.numberValue,
        thumbnailWidth:
          originalFields.image.structValue.fields.thumbnailWidth.numberValue,
        thumbnailLink:
          originalFields.image.structValue.fields.thumbnailLink.stringValue,
      },
    };
    return transformedItem;
  });

  return {
    items: transformedItems,
    nextPageToken: originalResponse.nextPageToken,
  };
}

export default transformImageResults;
