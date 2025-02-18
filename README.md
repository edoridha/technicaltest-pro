# technicaltest-pro

## How to run server
### Server Setup
```sh
go to directory /config/config.json
adjust development configuration for database
```
run terminal at /server-side
```sh
npm install
```

```sh
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

```
npm run dev
```

## How to run client
run terminal at /client-side
```sh
npm install
```


```
npm run dev
```

- admin login

```
url : /adminpanel
username : admin
password : admin
```