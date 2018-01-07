bodybuilder()
  .query(
    'query_string', 'query', 'ppk', {
      fields: ['sample_text', 'sample_post_tags']
    })
  .query('range', 'sample_created_at', {
    'gte': 1513659600000,
    'lte': 1514782799999,
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
  .agg('terms', 'sample_words', {
    size: 10,
    order: {
      '_count': 'desc'
    }
  }, (a) => {
    a.agg('terms', 'sample_sentiment.keyword');
    return a;
  })
  .agg('terms', 'sample_hashtags.keyword', {
    size: 10,
    order: {
      '_count': 'desc'
    }
  }, (a) => {
    a.agg('terms', 'sample_sentiment.keyword');
    return a;
  })
  .agg('terms', 'sample_mentions.keyword', {
    size: 10,
    order: {
      '_count': 'desc'
    }
  }, (a) => {
    a.agg('terms', 'sample_sentiment.keyword');
    return a;
  })

  .agg('terms', 'author_screen_name.keyword', {
      size: 6,
      order: {
        'agg_avg_author_followers_count': 'desc'
      }
    },
    (a) => {
      a.agg('avg', 'author_followers_count');
      return a
    }
  )

  .from(0)
  .size(0)
  .build()
