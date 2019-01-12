This is the code for the touchscreen kiosk I made with my Raspberry Pi. [I talked about it on Twitter](https://twitter.com/andrewlho_codes/status/1068685640118689792).


![Raspberry Pi Kiosk](https://pbs.twimg.com/media/DtS77IeUwAAs0Cx.jpg "Raspberry Pi Kiosk")


### Development
You'll need your own API keys from the following APIs:
- [Dark Sky (weather)](https://darksky.net/forecast/40.7127,-74.0059/us12/en)
- [News API (news)](https://newsapi.org/)

Add these API keys along with some other configuration strings to a file called `config.js` in the `server` folder, using `config.example.js` as an example.

Start the Node server by navigating to the `server` folder:
```
cd server
yarn start
```

In a separate terminal , start the webpack server by navigating to the `client` folder:
```
cd client
yarn start
```

You can find the kiosk running at `localhost:3000`.

### Technologies Used
- Create React App
- TypeScript
- styled-components
- Node
- Express
- Prettier
