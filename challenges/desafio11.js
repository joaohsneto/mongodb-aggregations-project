db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dayOfWeek",
      countDays: { $count: {} },
    },
  },
  {
    $sort: { countDays: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$countDays",
    },
  },
]);
