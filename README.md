# prisma graphql

These containers allow to display an instance of Prisma and Grahpql

## Steps to follow configure our environment
1. [ ] Clone .env.example renamed to .env
2. [ ] Execute in our console the following command ``docker-compose build``
3. [ ] Execute in our console the following command ``docker-compose up``
4. [ ] Execute in other console the following command ``docker-compose exec node bash``, then once inside, run the following command ``npm i``. This installs the dependencies
5. [ ] Right there execute the following command ``prisma migrate dev --name init``, this builds a migration on our mysql database
6. [ ] Right there execute the following command ``node app``
7. [ ] Init project ``npm run dev``

# Deployment and local variables
Environment variables in the docker scope


| ENV Variable     | Content                                       | Example                   |
|------------------|-----------------------------------------------|---------------------------|
| NODE_PORT        | Node port for the host machine                | ``NODE_PORT=3001``        |
| PHP_MYADMIN_PORT | PhpMyadmin console port for the host machine  | ``PHP_MYADMIN_PORT=8085`` |
| DB_NAME          | DB name MYSQL                                 | ``DB_NAME=prisma``        |
| DB_USER          | Database User                                 | ``DB_USER=prisma``        |
| DB_PASS          | Database Password                             | ``DB_PASS=prisma``        |
| DB_PORT          | Database Port                                 | ``DB_PORT=3240``          |
| DB_NAME          | Database Name                                 | ``DB_NAME=prisma``        |


# Environment subnet
| ENV Variable      | Content                                      | Example                  |
|-------------------|----------------------------------------------|--------------------------|
| GA_BACKEND_SUBNET | Subnet range                                 | ``120.2.1.0/16``         |
| GA_DB_HOST        | Host IP inherited of the variable DB_HOST    | ``GA_DB_HOST=120.2.1.2`` |
| GA_NODE_IP        | Host IP inherited of the variable GA_NODE_IP | ``GA_NODE_IP=120.2.1.3`` |

### Tool
``graphdoc -e http://localhost:4001/graphql -o ./doc/schema``

[Prisma Migrate](https://www.youtube.com/watch?v=9l8iZP_HKY8)

### Prisma Migrate
``prisma migrate dev --name init``
####
``prisma migrate dev --schema=./prisma/mysql/schema.prisma``
####
``prisma migrate dev --schema=./prisma/postgres/schema1.prisma``

### graphql limit
[Graphl limit](https://mugan86.medium.com/tips-graphql-limitando-la-profundidad-de-las-consultas-1-cd12f3e0b1ba)

### Prisma Migrate from typeorm
[Migrate from typeorm](https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-typeorm)

### Create different scheme
[Different schema](https://github.com/prisma/prisma/issues/2443#issuecomment-630679118)
``prisma generate --schema=./prisma/mysql/schema.prisma``

``prisma generate --schema=./prisma/postgres/schema1.prisma``

### init project
``npm run dev``

``prisma migrate deploy --schema=./prisma/postgres/schema1.prisma``
