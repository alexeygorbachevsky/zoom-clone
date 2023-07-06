import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ErrorBoundary } from "components";

import { store } from "store";

import { Routing } from "./components";

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;
