# Tecido App

## Setup

Up db docker container
```sh
docker compose up -d
```

Run migrations
```sh
npx prisma migrate dev
```

## Testing

```sh
npm run test
# Or a specific test
npm run test <path>
```

Coverage
```sh
npm run test
# Or a specific test
npm run test <path>
```


## Run app

Dev mode
```sh
npm run start:dev
```

Production mode
```sh
npm run start
```