//poner en true cuando se haga push al igual que ./client/resources/config/config
// const production = true;
const production = false;

module.exports = {
  connectionDataBase: {
    user: "baq",
    host: "localhost",
    // host: "10.255.255.25",
    password: "Asiste.2021",
    database: "newnet",
  },
  portServer: 5000,
  portClient: 3000,
  cors: {
    origin: [this.urlClient],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: true,
  },
  session: {
    key: "usu_id",
    secret: "asiste",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  },
  urlClient: production
    ? "http://10.255.255.25:" + this.portClient
    : "http://localhost:" + this.portClient,
  urlServer: production
    ? "http://10.255.255.25:" + this.portServer
    : "http://localhost:" + this.portServer,
};
