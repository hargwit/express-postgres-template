cp .env.example .env

docker-compose up -d

yarn db:migrate:local