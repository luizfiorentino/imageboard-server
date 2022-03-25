const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

const app = express();
const PORT = process.env.PORT || 4001;

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Listening on port:", PORT));
