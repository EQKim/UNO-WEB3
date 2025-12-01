import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";

// Initialize Redux store (Assignment 5 requirement)
import "./store/store";

createApp(App).mount("#app");
