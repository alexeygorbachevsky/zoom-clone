import { useContext } from "react";

import { RootStoreContext } from "store";

const useMobX = () => useContext(RootStoreContext);

export default useMobX;
