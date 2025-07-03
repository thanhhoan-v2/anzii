"use client";

import Image from "next/image";
import { useState } from "react";

interface LazyImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	priority?: boolean;
	quality?: number;
	placeholder?: "blur" | "empty";
	blurDataURL?: string;
}

export default function LazyImage({
	src,
	alt,
	width,
	height,
	className,
	priority = false,
	quality = 75,
	placeholder = "blur",
	blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
}: LazyImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	if (hasError) {
		return (
			<div
				className={`flex items-center justify-center bg-zinc-800 text-zinc-400 ${className}`}
				style={{ width, height }}
			>
				<span className="text-sm">Failed to load image</span>
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				quality={quality}
				placeholder={placeholder}
				blurDataURL={blurDataURL}
				className={`transition-opacity duration-300 ${
					isLoading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={handleLoad}
				onError={handleError}
				loading={priority ? "eager" : "lazy"}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>

			{isLoading && (
				<div className="absolute inset-0 animate-pulse bg-zinc-800">
					<div className="animate-shimmer h-full w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%]"></div>
				</div>
			)}
		</div>
	);
}
