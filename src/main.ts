import "./index.css";
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apollo } from "./apollo";
import App from "./App.vue";

createApp({
  setup() { provide(DefaultApolloClient, apollo); },
  render: () => h(App)
}).mount("#root");
