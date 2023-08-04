import { Component, ReactNode } from "react";

import styles from "./ErrorBoundary.module.scss";

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
        <div className={styles.wrapper}>
          <p>We couldn’t load it.</p>
          <p>Please try again!</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
