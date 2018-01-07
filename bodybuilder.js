bodybuilder()
  .query(
    'query_string', 'query', 'ppk', {
      fields: ['sample_text', 'sample_post_tags']
    })
  .query('range', 'sample_created_at', {
    'gte': 1512685817844,
    'lte': 1515277817845,
    'format': 'epoch_millis'
  })
  .agg('date_histogram', 'sample_created_at', {
      interval: '1d',
      time_zone: 'America/Bogota',
      min_doc_count: 1
    },
    (a) => {
      a.agg('terms', 'sample_sentiment.keyword');
      a.agg('terms', 'sample_emotions.keyword');
      return a;
    }
  )
  .agg('terms', 'sample_sentiment.keyword')
  .agg('terms', 'author_age.keyword')
  .agg('terms', 'author_gender.keyword')
  .from(0)
  .size(0)
  .build()
