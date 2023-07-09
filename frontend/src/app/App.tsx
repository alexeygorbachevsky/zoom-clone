import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "components";

import { store, RootStoreContext, } from "store";

import { Routing } from "./components";

const App = () => (
    <RootStoreContext.Provider value={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ErrorBoundary>
  </RootStoreContext.Provider>
);

export default App;
