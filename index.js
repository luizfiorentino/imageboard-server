const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");

const PORT = process.env.PORT || 4000;
const app = express();

// Setting up the app to handle incoming http requests
const jsonParser = express.json();
app.use(jsonParser);

app.use("/images", authMiddleware, imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("Listening on port:", PORT));
