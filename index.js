const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

const PORT = process.env.PORT || 4001;
const app = express();

// Setting up the app to handle incoming http requests
const jsonParser = express.json();
app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Listening on port:", PORT));
