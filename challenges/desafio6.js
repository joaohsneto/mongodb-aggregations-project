db.movies.aggregate(
  [
    {
      $match:
      {
        awards: { $regex: /(won\s.\soscar)|(won\s.\sorcars)/gi },
      },
    },
    {
      $group: {
        _id: null,
        maior_rating: { $max: "$imdb.rating" },
        menor_rating: { $min: "$imdb.rating" },
        media_rating_request: { $avg: "$imdb.rating" },
        desvio_padrao_request: { $stdDevSamp: "$imdb.rating" },
      },
    },
    {
      $project:
      {
        _id: 0,
        maior_rating: 1,
        menor_rating: 1,
        media_rating: { $round: ["$media_rating_request", 1] },
        desvio_padrao: { $round: ["$desvio_padrao_request", 1] },
      },
    },
  ],
);
