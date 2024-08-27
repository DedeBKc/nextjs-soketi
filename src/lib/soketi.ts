import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "app-id",
  key: "app-key",
  secret: "app-secret",
  cluster: "development",
  useTLS: false,
  host: "127.0.0.1",
  port: "6001",
});

export const pusherClient = new PusherClient("app-key", {
  cluster: "development",
  httpHost: "127.0.0.1",
  httpPort: 6001,
  wsHost: "127.0.0.1",
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  enabledTransports: ["ws"],
});

