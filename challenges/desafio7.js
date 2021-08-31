db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
      cast: { $exists: true },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $count: {} },
      IMDBmedia: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$IMDBmedia", 1] },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);
