using System;
using System.Threading;
using ServiceStack.Redis;
using System.Collections.Generic;

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
            redisClient.Set<string>("interval", "10");

            while (command != "stop") {
                var xAxis = randomGenerator.Next(0,1000).ToString();
                var yAxis = randomGenerator.Next(0,1000).ToString();
                Console.WriteLine(redisClient.Host);
                redisClient.Set<string>("xAxis", xAxis);
                redisClient.Set<string>("yAxis", yAxis);
                var interval = redisClient.Get<string>("interval");
                Thread.Sleep(Int32.Parse(interval));
                command = redisClient.Get<string>("command");
                Console.WriteLine(command!="stop"?"Running...":"Stop have been read");
            }

        }
    }
}
