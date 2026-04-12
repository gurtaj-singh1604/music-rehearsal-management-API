import "./config/firebase";
import app from "./app";
import { env } from "./config/env";
import { startRehearsalReminderScheduler } from "./schedulers/rehearsalReminder.scheduler";

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startRehearsalReminderScheduler();
});