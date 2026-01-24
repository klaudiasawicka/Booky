using BookyBuddyFunctions.Model;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BookyBuddyFunctions.Functions
{
    public class TopRatedBooks
    {
        private readonly IMongoCollection<Book> _books;
        public TopRatedBooks() 
        {
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnection");
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("bookbuddy");
            _books = database.GetCollection<Book>("books");
        }

        [Function("TopRatedBooks")]
        public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "top-rated-books")]
        HttpRequestData req)
        {
            var result = await _books
                .Find(_ => true)
                .SortByDescending(b => b.AvgRating)
                .Limit(3)
                .Project(b => new
                {
                    b.Title,
                    b.AvgRating,
                    b.RatingsCount
                })
                .ToListAsync();

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(result);
            return response;
        }
    }
}
