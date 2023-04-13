
// const production = true;
const production = false;

const addressServer = '';

const connectionDataBase = {
  user: "root",
  host: "localhost",
  password: "",
  database: "web",
}

const portServer = 5000;
const portClient = 3000;


const urlClient = `${addressServer && production ? addressServer : 'http://localhost'}:${portClient}`
const urlServer = `${addressServer && production ? addressServer : 'http://localhost'}:${portServer}`

const corsSetting = {
  origin: [urlClient],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  origin: true,
}


module.exports = {
  connectionDataBase,
  urlServer,
  production,
  portServer,
  corsSetting,
  urlClient,

}