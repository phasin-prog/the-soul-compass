export {
  getPublishedSeries as getSeries,
  getSeriesBySlug,
  getSeriesReferences,
  getSeriesRelatedConcepts,
  getStaticSeriesParams,
  getSuggestedSeries,
  resolveSeriesItems,
} from '@/lib/series';
export type {
  ResolvedSeriesItem,
  Series,
  SeriesCategory,
  SeriesDifficulty,
  SeriesItem,
  SeriesItemType,
  SeriesStatus,
  SeriesSummary as SeriesMeta,
  SeriesType,
} from '@/types/series';
