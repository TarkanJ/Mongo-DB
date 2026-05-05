## MongoDB with Docker 🐳

### How To Run

docker compose up --build

### Clean All

docker compose down -v --rmi all


### MongoDB login to container with database

docker exec -it mongo-db-mongodb-1 mongosh

It should look like this
```
Current Mongosh Log ID: 69fa6452214c3dcad78de665
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10
Using MongoDB:          6.0.27
Using Mongosh:          2.5.10

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/
``` 
