import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

function ErrorFallback({ error }) {
  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h2>Something went wrong:</h2>
      <pre>{error?.message}</pre>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);