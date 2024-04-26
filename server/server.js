import express from "express";
const app = express();
const port = 8000;








// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );
