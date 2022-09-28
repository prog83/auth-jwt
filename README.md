# auth-jwt

auth-jwt

## Installation

Download or git clone [source code](https://github.com/prog83/auth-jwt).

Use the package manager [npm](https://www.npmjs.com/get-npm) to install.

```bash
npm i
```

## Usage

### Environment variables

SCHEME - scheme service (http)

HOST - host service (localhost)

PORT - port service (3000)

DB_HOST - db host

DB_PORT - db port

DB_NAME - db name

DB_USER - db user name

DB_PASS - db user password

JWT_ACCESS_SECRET - secret for access token

JWT_REFRESH_SECRET - secret for refresh token

JWT_ACCESS_EXPIRES - expiration time second (180=3m)

JWT_REFRESH_EXPIRES - expiration time second (1296000=15d)

### Development

```bash
npm run dev
```

Ready on http://localhost:3000

Docs on http://localhost:3000/api-docs

### Production

```bash
npm run build
npm run start
```

Ready on http://localhost:3000

Docs on http://localhost:3000/api-docs

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
