import { defineConfig } from "cypress";
import { execa } from "execa";
import waitOn from "wait-on";

export default defineConfig({
  fixturesFolder: "__tests__/fixtures",
  viewportHeight: 1080,
  viewportWidth: 1920,
  pageLoadTimeout: 70000,
  defaultCommandTimeout: 20000,
  screenshotOnRunFailure: true,
  screenshotsFolder: "__tests__/report/screenshots",
  experimentalMemoryManagement: true,
  video: false,
  e2e: {
    async setupNodeEvents(on, config) {
      let devServerProcess;

      on("before:run", async () => {
        console.log("🔄 Uruchamiam serwer deweloperski...");
        devServerProcess = execa("yarn", ["dev"], {
          stdio: "inherit",
          shell: true,
        });

        devServerProcess.catch((err) => {
          console.error("❌ Błąd podczas uruchamiania serwera:", err);
        });

        console.log("⏳ Czekam na gotowość serwera...");
        try {
          await waitOn({
            resources: ["http://localhost:5173"],
            timeout: 60000, // 60 sekund na uruchomienie serwera
            interval: 2000, // Sprawdzanie co 2 sekundy
          });
          console.log("✅ Serwer gotowy!");
        } catch (error) {
          console.error("❌ Serwer nie uruchomił się na czas.");
          devServerProcess.kill();
          throw error;
        }
      });

      on("after:run", async () => {
        if (devServerProcess) {
          console.log("🛑 Zatrzymuję serwer...");
          devServerProcess.kill("SIGTERM", { forceKillAfterTimeout: 5000 });
        }
      });

      process.on("SIGINT", () => {
        if (devServerProcess) devServerProcess.kill("SIGINT");
      });

      process.on("SIGTERM", () => {
        if (devServerProcess) devServerProcess.kill("SIGTERM");
      });
    },
    baseUrl: "http://localhost:5173",
    specPattern: ["__tests__/test/**/*.cy.{js,jsx,ts,tsx}"],
    supportFile: "__tests__/support/e2e.ts",
    retries: {
      runMode: 2,
    },
  },
  chromeWebSecurity: false,
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
});
