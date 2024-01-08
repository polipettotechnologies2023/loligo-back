import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { NextUIProvider } from '@nextui-org/react'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <NextUIProvider>
          <main className="light text-foreground bg-background">
            <App />
          </main>
        </NextUIProvider>
      </Provider>
    </Auth0Provider>
    
  </React.StrictMode>
);
