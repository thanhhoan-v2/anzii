"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-red-200 bg-red-50 p-8">
			<div className="text-center">
				<h2 className="mb-2 text-lg font-semibold text-red-600">
					Something went wrong
				</h2>
				<p className="mb-4 text-sm text-red-500">
					{error.message || "An unexpected error occurred"}
				</p>
			</div>
			<Button
				onClick={resetErrorBoundary}
				variant="outline"
				className="border-red-300 text-red-700 hover:bg-red-100"
			>
				Try again
			</Button>
		</div>
	);
}

interface QueryErrorBoundaryProps {
	children: React.ReactNode;
}

export function QueryErrorBoundary({ children }: QueryErrorBoundaryProps) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
