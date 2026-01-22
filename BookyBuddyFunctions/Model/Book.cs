using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookyBuddyFunctions.Model
{
    public class Book
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("avgRating")]
        public double AvgRating { get; set; }
        [BsonElement("ratingsCount")]
        public int RatingsCount { get; set; }

    }
}
