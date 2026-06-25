'use client';
import { Component } from 'react';
import { Trees, Home, RefreshCw } from 'lucide-react';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-ochre-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trees className="w-10 h-10 text-ochre-600" />
            </div>
            <h2 className="font-serif text-2xl text-stone-900 mb-2">Something went wrong</h2>
            <p className="text-stone-500 text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleReset} variant="primary">
                <RefreshCw className="w-4 h-4" /> Try Again
              </Button>
              <Button href="/" variant="outline">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-6 p-4 bg-red-50 rounded-xl text-red-700 text-xs text-left overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}