import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true, // Opt into React.startTransition behavior
      v7_relativeSplatPath: true, // Opt into relative splat path behavior
    }}
  >
    <Provider store={store}>
      <GoogleOAuthProvider clientId="679076242862-eeohjpmrcovpht2a61ti3p1rsa4pmcsr.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
);
