## MongoDB with Docker 🐳

### How To Run

docker compose up --build

### Clean All

docker compose down -v --rmi all


### Using Makefile

* make up - build, run containers & services in detached mode

* make logs - print out all logs

* make down - delete containers

* make restart - restarting all services

* make clean - completely remove all containers, volumes etc.

rest of commands will be fixed later ...


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

Or run localhost:9800 - web management MongoDB

check initial password for admin in logs ;)

```
mongo-db-mongo-express-1  | Mongo Express server listening at http://0.0.0.0:8081
mongo-db-mongo-express-1  | Server is open to allow connections from anyone (0.0.0.0)
mongo-db-mongo-express-1  | basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
mongo-db-mongo-express-1  | GET / 200 151.947 ms - 10020
```

LOGIN to MongoDB with User and Password
```
docker exec -it mongo-db-mongodb-1 mongosh -u admin -p mongo --authenticationDatabase admin
```

Changing password for user "admin"
```
use admin
db.changeUserPassword("admin", "new_password")
```
