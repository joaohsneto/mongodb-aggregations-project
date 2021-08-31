db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        stationName: "$startStationName",
        day: "$dayOfWeek",
      },
      countStation: { $count: {} },
    },
  },
  {
    $sort: { countStation: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stationName",
      total: "$countStation",
    },
  },
]);
