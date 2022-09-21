import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme.js";
import App from "./App";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
        <App />
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
