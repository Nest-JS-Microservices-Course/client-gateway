# Client Gateway

## Dev

1. Clone the repository
2. Install dependencies
3. Create `.env` file based on the `.env.template`
4. The microservices that will be consumed must be up
5. Execute `npm run start:dev`

## NATS server

docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats