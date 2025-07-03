// Performance monitoring utilities for lazy loading optimization

interface PerformanceMetric {
	name: string;
	value: number;
	timestamp: number;
}

class PerformanceMonitor {
	private metrics: PerformanceMetric[] = [];
	private observer: PerformanceObserver | null = null;

	constructor() {
		// Initialize performance observer if available
		if (typeof window !== "undefined" && "PerformanceObserver" in window) {
			this.initializeObserver();
		}
	}

	private initializeObserver() {
		try {
			this.observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "largest-contentful-paint") {
						this.recordMetric("LCP", entry.startTime);
					}
					if (entry.entryType === "first-input") {
						const fidEntry = entry as PerformanceEventTiming;
						this.recordMetric(
							"FID",
							fidEntry.processingStart - fidEntry.startTime
						);
					}
					if (entry.entryType === "layout-shift") {
						const clsEntry = entry as PerformanceEntry & { value: number };
						this.recordMetric("CLS", clsEntry.value);
					}
				}
			});

			// Observe Core Web Vitals
			this.observer.observe({
				entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
			});
		} catch (error) {
			console.warn("Performance monitoring not available:", error);
		}
	}

	recordMetric(name: string, value: number) {
		this.metrics.push({
			name,
			value,
			timestamp: Date.now(),
		});
	}

	// Track component loading times
	trackComponentLoad(componentName: string) {
		const startTime = performance.now();

		return () => {
			const endTime = performance.now();
			const loadTime = endTime - startTime;
			this.recordMetric(`Component_${componentName}_Load`, loadTime);
		};
	}

	// Track lazy loading success
	trackLazyLoadSuccess(componentName: string, loadTime: number) {
		this.recordMetric(`LazyLoad_${componentName}_Success`, loadTime);
	}

	// Track image loading performance
	trackImageLoad(imageName: string) {
		const startTime = performance.now();

		return () => {
			const endTime = performance.now();
			const loadTime = endTime - startTime;
			this.recordMetric(`Image_${imageName}_Load`, loadTime);
		};
	}

	// Get performance summary
	getSummary() {
		const now = Date.now();
		const recentMetrics = this.metrics.filter(
			(metric) => now - metric.timestamp < 300000 // Last 5 minutes
		);

		const groupedMetrics = recentMetrics.reduce(
			(acc, metric) => {
				if (!acc[metric.name]) {
					acc[metric.name] = [];
				}
				acc[metric.name].push(metric.value);
				return acc;
			},
			{} as Record<string, number[]>
		);

		const summary: Record<
			string,
			{ avg: number; min: number; max: number; count: number }
		> = {};

		for (const [name, values] of Object.entries(groupedMetrics)) {
			summary[name] = {
				avg: values.reduce((sum, val) => sum + val, 0) / values.length,
				min: Math.min(...values),
				max: Math.max(...values),
				count: values.length,
			};
		}

		return summary;
	}

	// Clear old metrics
	cleanup() {
		const now = Date.now();
		this.metrics = this.metrics.filter(
			(metric) => now - metric.timestamp < 3600000 // Keep last hour
		);
	}

	// Export metrics for analysis
	exportMetrics() {
		return {
			metrics: this.metrics,
			summary: this.getSummary(),
			timestamp: Date.now(),
		};
	}

	// Disconnect observer when component unmounts
	disconnect() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for easy tracking
export const trackComponentLoad = (componentName: string) => {
	return performanceMonitor.trackComponentLoad(componentName);
};

export const trackLazyLoadSuccess = (
	componentName: string,
	loadTime: number
) => {
	performanceMonitor.trackLazyLoadSuccess(componentName, loadTime);
};

export const trackImageLoad = (imageName: string) => {
	return performanceMonitor.trackImageLoad(imageName);
};

// Hook for React components
export const usePerformanceTracking = (componentName: string) => {
	if (typeof window === "undefined") return () => {};

	const endTracking = performanceMonitor.trackComponentLoad(componentName);

	// Auto-cleanup on unmount would be handled by the component
	return endTracking;
};

// Report performance insights
export const getPerformanceInsights = () => {
	const summary = performanceMonitor.getSummary();
	const insights: string[] = [];

	// Analyze Core Web Vitals
	if (summary.LCP) {
		if (summary.LCP.avg > 2500) {
			insights.push(
				"🟡 LCP (Largest Contentful Paint) is slower than recommended. Consider optimizing largest elements."
			);
		} else if (summary.LCP.avg <= 2500) {
			insights.push("✅ LCP performance is good!");
		}
	}

	if (summary.FID) {
		if (summary.FID.avg > 100) {
			insights.push(
				"🟡 FID (First Input Delay) is higher than ideal. Consider reducing JavaScript execution time."
			);
		} else {
			insights.push("✅ FID performance is excellent!");
		}
	}

	// Analyze lazy loading performance
	const lazyLoadMetrics = Object.entries(summary).filter(([name]) =>
		name.startsWith("LazyLoad_")
	);

	if (lazyLoadMetrics.length > 0) {
		const avgLazyLoadTime =
			lazyLoadMetrics.reduce((sum, [_, metric]) => sum + metric.avg, 0) /
			lazyLoadMetrics.length;

		if (avgLazyLoadTime < 100) {
			insights.push("✅ Lazy loading performance is excellent!");
		} else if (avgLazyLoadTime < 500) {
			insights.push("🟡 Lazy loading performance is acceptable.");
		} else {
			insights.push("🔴 Lazy loading performance needs improvement.");
		}
	}

	return insights;
};

// Automatic cleanup interval
if (typeof window !== "undefined") {
	setInterval(() => {
		performanceMonitor.cleanup();
	}, 300000); // Clean up every 5 minutes
}
