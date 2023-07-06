import { Component, ReactNode } from "react";

import styles from "./ErrorBoundary.module.scss";

const { wrapper } = styles;

interface Props {
  children?: ReactNode;
}

interface State {
  isError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { isError: false };

  public componentDidCatch() {
    this.setState({ isError: true });
  }

  public render() {
    const { children } = this.props;
    const { isError } = this.state;

    if (isError) {
      return (
        <div className={wrapper}>
          <p>Whoops!</p>
          <div>We couldn’t load that feature. Please try again!</div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
