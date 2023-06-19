# Aerializando API App

## Setup

Up db docker container
```sh
docker compose up -d
```

Run migrations
```sh
npx prisma migrate dev
```

Create migration
```sh
npx prisma migrate dev --name {name}
```

Generate prisma types
```sh
npx prisma generate
```

## Testing

```sh
npm run test
# Or a specific test
npm run test {path}
```

Coverage
```sh
npm run test
# Or a specific test
npm run test {path}
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
