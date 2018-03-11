# DNS Rebinding Attack for Ethereum JSON-RPC without Waiting

This is my failed attempt to pretend to be a cool hacker.

I basically stole the idea from [Jazzy](https://ret2got.wordpress.com/2018/01/19/how-your-ethereum-can-be-stolen-using-dns-rebinding/) but implemented it differently. In particular, the non-standard [Background Sync](https://caniuse.com/#feat=background-sync) feature is used.

This has the advantage that the hacker does not have to trick the user into staying on the page for a whole minute.

[![image.png](https://s17.postimg.org/vsvbvyujz/image.png)](https://postimg.org/image/57st0es6j/)

## Why this doesn't work

HTTPS. While this works on localhost, serving the service worker [requires a HTTPS website](https://developers.google.com/web/fundamentals/primers/service-workers/#you_need_https). While this is trivial, this also means that we cannot access the same URL (except at vanilla HTTP). This is because of the Same Origin Principle (SOP). What this means is that we cannot call the local geth JSON-RPC because it's not served on HTTPS.

## Running this demo

Running this demo is somewhat clumsy. Here is how you do it:

1. Clone this repo. `git clone --depth=1 https://gitlab.com/isaackwan/eth-dns-rebinding-without-wait`
2. `cd meat && npm install`
3. Set up your hosts file and point `geth.test to 127.0.0.1`. [Instructions](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/)
4. `node app.js`.
5. Visit [http://localhost:8545/](http://localhost:8545/)
6. Check console, in case you are curious what is happening behind the scenes.
7. Terminate the node process with control-c.
8. Optionally, close your browser window.
9. Start your geth/whatever Ethereum client with JSON-RPC on port 8545. No CORS header needed.
10. Wait for 6 minutes.
11. Turn off geth and turn node back on.
12. Go to [http://localhost:8545/](http://localhost:8545/) and see all the requests it has made in the background.

## DNS

I was planning to have a public demo. This is how the DNS works:

You will get re-directed to (unix timestamp in MS).eth-dns1.isaac.pw. The DNS server simply replies 127.0.0.1 if the supplied timestamp is less than/equal to the current time on server. Otherwise, the server IP will be supplied.