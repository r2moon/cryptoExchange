# cryptoExchange
Technical stacks are node.js, ejs, bootstrap and jquery for enabling server side rendering and coingecko api service was used for fetching historical data of token prices.
SSR technique is helpful in situations like the client has a slow internet connection.
Views and Public folder involves rendering files and css&js assets and calling coingecko apis are proceeded on the client side each time when users select date, from-currency and to-currency.
Coingecko api service doesn't require any credentials and this service allows 10 api calls each second per IP address.
Since all api calls are proceeded in the client side with users own IP address so there aren't any api limit issues.
Additionally, the feature for saving cache info the local storage is implemented to the client so client doesn't repeat same api calls with same query params.

How to run;
1. npm install
2. npm start
3. open browser and visit http://127.0.0.1:5000/.
