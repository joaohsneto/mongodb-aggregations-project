db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaTrip: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $addFields: {
      tripHours: { $divide: ["$mediaTrip", 3600000] },
    },
  },
  {
    $sort: { tripHours: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$tripHours", 2] },
    },
  },
]);
