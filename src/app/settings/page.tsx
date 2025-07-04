"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
	Check,
	HelpCircle,
	Loader2,
	LogOut,
	Mail,
	Save,
	Settings,
	Shield,
	User,
	UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";

export default function SettingsPage() {
	const { user, isLoaded } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();
	const { toast } = useToast();

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	// Redirect to sign-in if not authenticated
	useEffect(() => {
		if (isLoaded && !user) {
			router.push(ROUTES.SIGN_IN);
		} else if (user) {
			const initialDisplayName =
				user.firstName && user.lastName
					? `${user.firstName} ${user.lastName}`
					: user.firstName || "";
			setDisplayName(initialDisplayName);
			setEmail(user.primaryEmailAddress?.emailAddress || "");
			setIsLoadingProfile(false);
		}
	}, [user, isLoaded, router]);

	// Track changes for unsaved indicator
	useEffect(() => {
		if (user && !isLoadingProfile) {
			const currentDisplayName =
				user.firstName && user.lastName
					? `${user.firstName} ${user.lastName}`
					: user.firstName || "";
			const hasChanges = displayName.trim() !== currentDisplayName;
			setHasUnsavedChanges(hasChanges);
		}
	}, [displayName, user, isLoadingProfile]);

	const handleUpdateProfile = async () => {
		if (!user || !hasUnsavedChanges) return;

		setIsLoading(true);
		try {
			await user.update({
				firstName: displayName.split(" ")[0] || null,
				lastName:
					displayName.split(" ").length > 1 ? displayName.split(" ")[1] : null,
			});

			setHasUnsavedChanges(false);
			toast({
				title: "✅ Profile Updated",
				description: "Your profile has been successfully updated.",
			});
		} catch {
			toast({
				variant: "destructive",
				title: "❌ Update Failed",
				description: "Failed to update profile. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignOut = async () => {
		if (!user) return;

		try {
			await signOut();
			router.push(ROUTES.HOME);
			toast({
				title: "👋 Signed Out",
				description: "You have been successfully signed out.",
			});
		} catch {
			toast({
				variant: "destructive",
				title: "❌ Sign Out Failed",
				description: "Failed to sign out. Please try again.",
			});
		}
	};

	const handleDiscardChanges = () => {
		if (user) {
			setDisplayName(
				user.firstName && user.lastName
					? `${user.firstName} ${user.lastName}`
					: user.firstName || ""
			);
			setHasUnsavedChanges(false);
		}
	};

	if (isLoadingProfile) {
		return (
			<div className="min-h-screen bg-black">
				<AppHeader />
				<div className="flex h-96 flex-col items-center justify-center">
					<Loader2 className="mb-4 h-12 w-12 animate-spin text-lime-400" />
					<h2 className="mb-2 text-xl font-semibold text-gray-300">
						Loading Settings
					</h2>
					<p className="text-gray-500">Fetching your account information...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-white">
			<AppHeader />

			<main className="container mx-auto max-w-5xl p-4 md:p-8">
				<div className="space-y-8">
					{/* Header with Navigation */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3">
								<div className="rounded-lg bg-lime-400/10 p-2">
									<Settings className="h-6 w-6 text-lime-400" />
								</div>
								<div>
									<h1 className="text-3xl font-bold text-gray-100">Settings</h1>
									<p className="text-gray-400">
										Manage your account and preferences
									</p>
								</div>
							</div>
						</div>

						{hasUnsavedChanges && (
							<div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-400">
								<div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
								Unsaved changes
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						{/* Main Settings */}
						<div className="space-y-6 lg:col-span-2">
							{/* Profile Settings */}
							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-gray-100">
										<div className="rounded-lg bg-blue-500/10 p-2">
											<UserCog className="h-5 w-5 text-blue-400" />
										</div>
										Profile Information
									</CardTitle>
									<CardDescription className="text-gray-400">
										Update your personal information and how others see you
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<div className="space-y-3">
											<Label
												htmlFor="displayName"
												className="flex items-center gap-2 font-medium text-gray-300"
											>
												<User className="h-4 w-4 text-gray-400" />
												Display Name
											</Label>
											<Input
												id="displayName"
												type="text"
												value={displayName}
												onChange={(e) => setDisplayName(e.target.value)}
												placeholder="Enter your display name"
												className="border-zinc-700 bg-zinc-900/50 text-white placeholder-gray-500 transition-colors focus:border-lime-400 focus:ring-lime-400/20"
											/>
											<p className="text-xs text-gray-500">
												This is how your name appears to other users
											</p>
										</div>

										<div className="space-y-3">
											<Label
												htmlFor="email"
												className="flex items-center gap-2 font-medium text-gray-300"
											>
												<Mail className="h-4 w-4 text-gray-400" />
												Email Address
											</Label>
											<div className="relative">
												<Input
													id="email"
													type="email"
													value={email}
													disabled
													className="cursor-not-allowed border-zinc-700 bg-zinc-800/50 pr-10 text-gray-400"
												/>
												<Shield className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
											</div>
											<p className="flex items-center gap-1 text-xs text-gray-500">
												<HelpCircle className="h-3 w-3" />
												Email cannot be changed here. Contact support for
												assistance.
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
										<Button
											onClick={handleUpdateProfile}
											disabled={isLoading || !hasUnsavedChanges}
											className="bg-lime-400 font-semibold text-black transition-all duration-200 hover:bg-lime-500 disabled:opacity-50"
										>
											{isLoading ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Saving...
												</>
											) : (
												<>
													<Save className="mr-2 h-4 w-4" />
													Save Changes
												</>
											)}
										</Button>

										{hasUnsavedChanges && (
											<Button
												variant="outline"
												onClick={handleDiscardChanges}
												className="border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white"
											>
												Discard
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Account Status */}
							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-lg text-gray-100">
										<Check className="h-5 w-5 text-green-400" />
										Account Status
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-400">Status</span>
											<span className="text-sm font-medium text-green-400">
												Active
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-400">Plan</span>
											<span className="text-sm text-gray-300">Free</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-400">
												Member since
											</span>
											<span className="text-sm text-gray-300">
												{user?.createdAt
													? new Date(user.createdAt).toLocaleDateString()
													: "Recently"}
											</span>
										</div>
									</div>

									<Separator className="bg-zinc-800" />

									<Button
										onClick={() => router.push(ROUTES.PRICING)}
										variant="outline"
										className="w-full border-lime-400/20 bg-gradient-to-r from-lime-400/10 to-lime-500/10 text-lime-400 hover:bg-lime-400/20 hover:text-lime-300"
									>
										Upgrade Plan
									</Button>
								</CardContent>
							</Card>

							{/* Danger Zone */}
							<Card className="border-red-800/50 bg-red-950/20 shadow-xl">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-lg text-red-400">
										<LogOut className="h-5 w-5" />
										Account Actions
									</CardTitle>
									<CardDescription className="text-red-300/70">
										Actions that affect your account
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Button
										onClick={handleSignOut}
										variant="outline"
										className="w-full border-red-800/50 bg-transparent text-red-400 hover:border-red-600 hover:bg-red-900/30 hover:text-red-300"
									>
										<LogOut className="mr-2 h-4 w-4" />
										Sign Out
									</Button>

									<div className="border-t border-red-800/30 pt-3">
										<p className="mb-3 text-xs text-red-300/70">
											Need help? Get in touch with our support team.
										</p>
										<div className="flex flex-col gap-2">
											<Button
												variant="link"
												className="h-auto justify-start p-0 text-sm text-red-400 hover:text-red-300"
												onClick={() =>
													window.open("mailto:support@anzii.app", "_blank")
												}
											>
												📧 Contact Support
											</Button>
											<Button
												variant="link"
												className="h-auto justify-start p-0 text-sm text-red-400 hover:text-red-300"
												onClick={() => router.push(ROUTES.FEATURES)}
											>
												📖 View Documentation
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
