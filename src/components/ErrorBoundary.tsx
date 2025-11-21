import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600">
                The app encountered an error. Please check the console for details.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-red-800 mb-2">Error Details:</h2>
                <pre className="text-sm text-red-700 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-blue-800 mb-2">
                🔧 Common Fixes:
              </h2>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>
                  <strong>1. Check Firebase Configuration:</strong>
                  <br />
                  Make sure your <code className="bg-blue-100 px-1 rounded">.env</code> file
                  has valid Firebase credentials
                </li>
                <li>
                  <strong>2. Restart Dev Server:</strong>
                  <br />
                  Stop the server (Ctrl+C) and run{' '}
                  <code className="bg-blue-100 px-1 rounded">pnpm dev</code> again
                </li>
                <li>
                  <strong>3. Clear Browser Cache:</strong>
                  <br />
                  Hard refresh the page (Ctrl+Shift+R)
                </li>
                <li>
                  <strong>4. Check Console:</strong>
                  <br />
                  Open browser DevTools (F12) and check the Console tab for more details
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Try Again
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Need help? Check{' '}
                <a
                  href="/QUICKSTART.md"
                  className="text-primary-600 hover:underline"
                  target="_blank"
                >
                  QUICKSTART.md
                </a>{' '}
                for setup instructions
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
