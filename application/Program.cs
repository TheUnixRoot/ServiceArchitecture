using System;
using System.Threading;
using ServiceStack.Redis;
using System.Collections.Generic;

// Requires https://www.nuget.org/packages/ServiceStack.Redis/ nuget package

namespace application
{
    class Program
    {
        private static RedisClient redisClient;
        static void Main(string[] args)
        {
            StartApplication(args);
        }

        private static void StartApplication(string[] args) {
            if (args.Length < 2) {
                Console.Error.WriteLine("Invalid number of arguments, uri and port should be provided. Use: dotnet run <uri> <port>");
                return;
            }
            Console.WriteLine($"uri: {args[0]}, port: {args[1]}");
            var uri = args[0];
            var port = Int32.Parse(args[1]);
            redisClient = new RedisClient(uri, port);
            
            var randomGenerator =  new Random();
            var command = "Hola";
            redisClient.Set<int>("interval", 5000);

            while (true) {
                // Console.WriteLine(redisClient.Host);
                if (redisClient.Get<string>("yAxisCommand") == "start") {
                    var yAxis = randomGenerator.Next(0,1000);
                    redisClient.Set<int>("yAxis", yAxis);
                    Console.WriteLine("Y running");
                } else {
                    Console.WriteLine("Y stopped");
                }
                if (redisClient.Get<string>("xAxisCommand") == "start") {
                    var xAxis = randomGenerator.Next(0,1000);
                    redisClient.Set<int>("xAxis", xAxis);
                    Console.WriteLine("X running");
                } else {
                    Console.WriteLine("X stopped");
                }
                var interval = redisClient.Get<int>("interval");
                Console.WriteLine(command!="stop"?$"Waiting {interval/1000} seconds...":"Stop have been read");
                Thread.Sleep(interval);
                
            }

        }
    }
}
