import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        }
    };

    componentDidCatch(info, error) {
        console.log("This is component from where error is coming:", info);
        console.log("Your error is:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-100">
                    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-slate-600 text-sm mb-6">
                            {this.state.error?.message}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <>
                {this.props.children}
            </>
        )
    }
};

export default ErrorBoundary; 