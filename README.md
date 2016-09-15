# Spray Client

This JavaScript library can be used to access ChakSoft Spray API from NodeJS 6.x.

![Dependencies](https://david-dm.org/ChakSoft/spray.svg)
![Travis CI](https://travis-ci.org/ChakSoft/spray.svg?branch=master)

## Installation

```bash
$ npm install spray-client
```

## Usage

### Initialization

```javascript
const SprayClient = require('spray');
```

### Register your application

When you want to use Spray API, you will have to make sure your application has been created on the [AuthWeb ChakSoft platform](https://authweb.chaksoft.fr).
Then your app has to be approved by ChakSoft and you will receive your API Key.

This key **must not** be known by your users.

We'll assume here the key is `supersecretkey`.

### Configuration

```javascript
const client = new SprayClient({
    apiKey: 'supersecretkey', // Here goes your secret key (mandatory)
    apiVersion: '2.0.0', // Here goes the API Version (default 2.0.0)
    promised: true // If you don't want the client to use promises, put `false` in this field. (default true)
});
```

Your client is now configured.

### Interactions

#### Use client to login your users

On a login backend callback in your application :

```javascript
client.login().then(data => {
    // Redirect your user to the URI in `data.login.redirectTo`.
}).catch(err => console.error(err));
```

Your user will be redirected to AuthWeb website to login and allow your application.
Then, AuthWeb will redirect the user on your application following this pattern :

`${YOUR_WEBSITE_ADDRESS}/spray?allow=(0|1)[&token=LOGIN_TOKEN]`

If the `allow` parameter is `0`, the user has prevented your application from fetching information in AuthWeb. You cannot continue.
If the `allow` parameter is `1`, the user has allowed your application, and you can store the login token in your session system to ensure your user will remain connected.

#### Fetch user information

When you have created your application, a selection box let you specify which user information fields your application was authorized to fetch.
Only the fields you requested will be present in the returned JSON object.

```javascript
client.info(loginToken).then(data => {
    // You can store this information in your own database or update fields if the user has modified something
}).catch(err => console.error(err));
```

#### Without promises

If you don't want use `bluebird` promises in your application, which is recommended though, you can pass a callback as the last argument of each function of the `SprayClient`.
