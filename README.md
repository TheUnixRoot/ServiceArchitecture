# ServiceArchitecture
This services are intended to be run with a redis server (host and port are configurables)

## application
This folder contains a simple c# infinite-loop dotnet core application
which generates a pair of random numbers and publish them in the configured redis server passed by parameter.

## frontend/pages
This contains the 2 pages for the angular web application Configuration & Dashboard

## webserver 
This folder contains the simple nodejs backend server which communicates between Angular and Redis server.

## How to run it
- First start and configure your Redis server (I deployed it in a ubuntu bash on windows)
- Then runs nodejs and c# applications to start publishing and consuming data. To start c# application,
should be enough runs ```./application> dotnet run localhost 8080``` NodeJs starts with the following command: ```./webserver>node .\index.js redis://localhost:8080 8081```
- Angular application should be able to run with ```./pages> ng serve```
