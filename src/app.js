import express from "express";
import path from "path";
import config from "./config/config.js";

const app = express();
const { pathname } = new URL("../", import.meta.url);
app.set("port", config.port);
app.use(express.static(path.join(pathname, "public")));

export { app };
