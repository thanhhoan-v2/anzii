# Authentication

Implement user authentication and authorization using Stack Auth in Anzii.

## 🔐 Authentication Overview

Anzii uses Stack Auth for authentication, replacing NextAuth.js with a more modern and flexible solution:

- **Stack Auth** - Modern authentication framework
- **Multiple Providers** - Email, OAuth (Google, GitHub, etc.)
- **Session Management** - Secure session handling
- **User Profiles** - Rich user data management

## 🚀 Stack Auth Setup

### 1. Environment Configuration

```env
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"
```

### 2. Stack Configuration

```tsx
// stack.tsx
import { StackServerApp } from "@stackframe/stack/server";
import { StackClientApp } from "@stackframe/stack/client";

// Server-side configuration
export const stackServerApp = new StackServerApp({
	projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
	secretKey: process.env.STACK_SECRET_SERVER_KEY!,
});

// Client-side configuration
export const stackClientApp = new StackClientApp({
	projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
	publishableKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
});
```

### 3. Provider Setup

```tsx
// app/providers.tsx
import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "@/stack";

export function Providers({ children }: { children: React.ReactNode }) {
	return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
```

## 👤 User Management

### 1. Client-Side User Hooks

```tsx
// hooks/use-auth.ts
import { useUser, useStackApp } from "@stackframe/stack";

export function useAuth() {
	const user = useUser();
	const app = useStackApp();

	const signIn = async (email: string, password: string) => {
		try {
			await app.signInWithCredential({
				email,
				password,
			});
		} catch (error) {
			console.error("Sign in failed:", error);
			throw error;
		}
	};

	const signUp = async (
		email: string,
		password: string,
		displayName?: string
	) => {
		try {
			await app.signUpWithCredential({
				email,
				password,
				displayName,
			});
		} catch (error) {
			console.error("Sign up failed:", error);
			throw error;
		}
	};

	const signOut = async () => {
		try {
			await app.signOut();
		} catch (error) {
			console.error("Sign out failed:", error);
			throw error;
		}
	};

	const updateProfile = async (updates: {
		displayName?: string;
		avatar?: string;
	}) => {
		if (!user) throw new Error("User not authenticated");

		try {
			await user.update(updates);
		} catch (error) {
			console.error("Profile update failed:", error);
			throw error;
		}
	};

	return {
		user,
		isAuthenticated: !!user,
		isLoading: user === undefined,
		signIn,
		signUp,
		signOut,
		updateProfile,
	};
}
```

### 2. Server-Side User Management

```tsx
// lib/auth/server.ts
import { stackServerApp } from "@/stack";

export async function getCurrentUser() {
	try {
		const user = await stackServerApp.getUser();
		return user;
	} catch (error) {
		console.error("Failed to get current user:", error);
		return null;
	}
}

export async function requireAuth() {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("Authentication required");
	}

	return user;
}

export async function getUserProfile(userId: string) {
	try {
		const user = await stackServerApp.getUserById(userId);
		return user;
	} catch (error) {
		console.error("Failed to get user profile:", error);
		return null;
	}
}
```

## 🎯 Authentication Components

### 1. Sign In Component

```tsx
// components/auth/sign-in-form.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { signIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await signIn(email, password);
			// Redirect or show success message
		} catch (error) {
			setError(error instanceof Error ? error.message : "Sign in failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Signing In..." : "Sign In"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
```

### 2. Sign Up Component

```tsx
// components/auth/sign-up-form.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { signUp } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await signUp(email, password, displayName);
			// Redirect or show success message
		} catch (error) {
			setError(error instanceof Error ? error.message : "Sign up failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle>Create Account</CardTitle>
				<CardDescription>Sign up for a new Anzii account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<div className="space-y-2">
						<Label htmlFor="displayName">Display Name</Label>
						<Input
							id="displayName"
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={isLoading}
							minLength={8}
						/>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating Account..." : "Create Account"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
```

### 3. User Profile Component

```tsx
// components/auth/user-profile.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
	const { user, updateProfile, signOut } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [displayName, setDisplayName] = useState(user?.displayName || "");
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdateProfile = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			await updateProfile({ displayName });
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to update profile:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("Failed to sign out:", error);
		}
	};

	if (!user) return null;

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Manage your account settings</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={user.avatar} />
						<AvatarFallback>
							{user.displayName?.charAt(0) || user.primaryEmail?.charAt(0)}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1">
						{isEditing ? (
							<div className="space-y-2">
								<Label htmlFor="displayName">Display Name</Label>
								<Input
									id="displayName"
									value={displayName}
									onChange={(e) => setDisplayName(e.target.value)}
									disabled={isLoading}
								/>
								<div className="flex space-x-2">
									<Button
										size="sm"
										onClick={handleUpdateProfile}
										disabled={isLoading}
									>
										{isLoading ? "Saving..." : "Save"}
									</Button>
									<Button
										size="sm"
										variant="outline"
										onClick={() => setIsEditing(false)}
										disabled={isLoading}
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<div>
								<h3 className="font-medium">
									{user.displayName || "No name set"}
								</h3>
								<p className="text-sm text-muted-foreground">
									{user.primaryEmail}
								</p>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setIsEditing(true)}
									className="mt-2"
								>
									Edit Profile
								</Button>
							</div>
						)}
					</div>
				</div>

				<Button
					variant="destructive"
					onClick={handleSignOut}
					className="w-full"
				>
					Sign Out
				</Button>
			</CardContent>
		</Card>
	);
}
```

## 🔒 Route Protection

### 1. Client-Side Protection

```tsx
// components/auth/protected-route.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRouteProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/sign-in");
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return fallback || <div>Redirecting to sign in...</div>;
	}

	return <>{children}</>;
}
```

### 2. Server-Side Protection

```tsx
// lib/auth/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function authMiddleware(request: NextRequest) {
	const user = await stackServerApp.getUser();

	if (!user) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	return NextResponse.next();
}

// Usage in route handlers
export async function GET(request: NextRequest) {
	const user = await stackServerApp.getUser();

	if (!user) {
		return new Response("Unauthorized", { status: 401 });
	}

	// Handle authenticated request
	return new Response("Protected data");
}
```

### 3. API Route Protection

```tsx
// app/api/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/server";

export async function GET(request: NextRequest) {
	try {
		const user = await requireAuth();

		// Handle authenticated request
		return NextResponse.json({
			message: "Protected data",
			user: {
				id: user.id,
				email: user.primaryEmail,
				displayName: user.displayName,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Authentication required" },
			{ status: 401 }
		);
	}
}
```

## 🎯 Authentication Pages

### 1. Sign In Page

```tsx
// app/(auth)/sign-in/page.tsx
import { SignInForm } from "@/components/auth/sign-in-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">Welcome Back</CardTitle>
						<CardDescription>Sign in to your Anzii account</CardDescription>
					</CardHeader>
					<CardContent>
						<SignInForm />
					</CardContent>
				</Card>

				<div className="mt-4 text-center text-sm text-muted-foreground">
					Don't have an account?{" "}
					<a href="/sign-up" className="text-primary hover:underline">
						Sign up
					</a>
				</div>
			</div>
		</div>
	);
}
```

### 2. Sign Up Page

```tsx
// app/(auth)/sign-up/page.tsx
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-md">
				<SignUpForm />

				<div className="mt-4 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<a href="/sign-in" className="text-primary hover:underline">
						Sign in
					</a>
				</div>
			</div>
		</div>
	);
}
```

## 🧪 Testing Authentication

### 1. Unit Testing Auth Hooks

```tsx
// __tests__/hooks/use-auth.test.ts
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/hooks/use-auth";

// Mock Stack Auth
jest.mock("@stackframe/stack", () => ({
	useUser: jest.fn(),
	useStackApp: jest.fn(),
}));

describe("useAuth", () => {
	test("returns authentication state", () => {
		const mockUser = { id: "1", displayName: "Test User" };
		const mockApp = {
			signInWithCredential: jest.fn(),
			signUpWithCredential: jest.fn(),
			signOut: jest.fn(),
		};

		const { useUser, useStackApp } = require("@stackframe/stack");
		useUser.mockReturnValue(mockUser);
		useStackApp.mockReturnValue(mockApp);

		const { result } = renderHook(() => useAuth());

		expect(result.current.user).toBe(mockUser);
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isLoading).toBe(false);
	});
});
```

### 2. Integration Testing

```tsx
// tests/e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test("user can sign in and access protected content", async ({ page }) => {
	await page.goto("/sign-in");

	// Fill sign in form
	await page.fill('[data-testid="email-input"]', "test@example.com");
	await page.fill('[data-testid="password-input"]', "password123");
	await page.click('[data-testid="sign-in-button"]');

	// Wait for redirect to dashboard
	await expect(page).toHaveURL("/dashboard");

	// Verify user is authenticated
	await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
});

test("unauthenticated user is redirected to sign in", async ({ page }) => {
	await page.goto("/dashboard");

	// Should be redirected to sign in
	await expect(page).toHaveURL("/sign-in");
});
```

## 📚 Related Documentation

- **[Project Architecture](architecture.md)** - Understanding the tech stack
- **[State Management](state-management.md)** - Managing user state
- **[UI Development](ui-development.md)** - Building auth components
- **[Development Workflow](development-workflow.md)** - Testing auth features

---

**Ready to implement authentication?** Check out the [Deployment Guide](deployment.md) to learn about production deployment!
