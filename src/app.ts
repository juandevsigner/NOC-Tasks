import { envs } from "./config/plugins/env.plugins";
import { ServerApp } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  ServerApp.start();
}
