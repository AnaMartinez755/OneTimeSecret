import app from "./src/presentation/SecretRoutes";
import * as data from "./config.json";
app.listen(data.portNumber, () => {
  console.log(`Listening http://localhost:${data.portNumber}`);
});
