import { Component, ErrorInfo, ReactNode } from "react";
import { Alert } from "./ui/Alert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // TODO: Send to error logging service
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4">
          <Alert variant="error" title="Something went wrong">
            We're sorry, but something went wrong. Please try refreshing the
            page.
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-2 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
            >
              Refresh Page
            </button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
