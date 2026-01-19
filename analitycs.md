## GET /stats/top-rated-books

db.books.find(
  {},
  { title: 1, avgRating: 1, ratingsCount: 1, _id: 0 }
)
.sort({ avgRating: -1 })
.limit(3)

## GET /stats/most-active-users

db.ratings.aggregate([
    {
        $group: {
        _id: "$userId",
        ratingsCount: { $sum: 1 }
        }
    },
  { $sort: { ratingsCount: -1 } },
  { $limit: 5 }
])

## GET /stats/average-rating-per-book

db.ratings.aggregate([
  {
    $group: {
      _id: "$bookId",
      avgRating: { $avg: "$rating" }
    }
  },
  { $sort: { avgRating: -1 } }
])

## GET /stats/most-popular-tags

db.books.aggregate([
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$tags",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
])
