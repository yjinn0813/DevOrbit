/* Local development server entry point */

import dotenv from "dotenv";
import app from "./app";

// ====================
dotenv.config({
  path: ".env.local",
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `API server running at http://localhost:${PORT}`,
  );
});