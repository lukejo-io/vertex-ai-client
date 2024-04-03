type SearchParams = {
  query: string;
  googleLr: string;
  type: 'web' | 'image' | 'video' | 'music' | 'tools' | 'results';
  facet: string;
  subFacet: string;
  genConfDateRange: string;
  secondaryBook: string;
  selectedYear: string;
  lang: string;
};

function handleWebSearch({
  query,
  googleLr,
  type,
  facet,
  subFacet,
  genConfDateRange,
  secondaryBook,
  selectedYear,
  lang,
}: SearchParams) {
  const searchParams = new URLSearchParams();
}
