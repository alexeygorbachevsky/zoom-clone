import { FC, PropsWithChildren } from "react";

import Header from "components/header";

const Template: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Template;
