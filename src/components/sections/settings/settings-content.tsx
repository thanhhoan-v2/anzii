"use client";

import { useUser } from "@stackframe/stack";
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

import SettingsLoading from "./settings-loading";

export default function SettingsContent() {
	const user = useUser();
	const router = useRouter();
	const { toast } = useToast();

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	// Redirect to sign-in if not authenticated
	useEffect(() => {
		if (user === null) {
			router.push(ROUTES.SIGN_IN);
		} else if (user) {
			const initialDisplayName = user.displayName || "";
			setDisplayName(initialDisplayName);
			setEmail(user.primaryEmail || "");
			setIsLoadingProfile(false);
		}
	}, [user, router]);

	// Track changes for unsaved indicator
	useEffect(() => {
		if (user && !isLoadingProfile) {
			const hasChanges = displayName.trim() !== (user.displayName || "");
			setHasUnsavedChanges(hasChanges);
		}
	}, [displayName, user, isLoadingProfile]);

	const handleUpdateProfile = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			await user.update({
				displayName: displayName.trim() || undefined,
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
				description: "Failed to update your profile. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignOut = async () => {
		if (!user) return;

		try {
			await user.signOut();
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
			setDisplayName(user.displayName || "");
			setHasUnsavedChanges(false);
		}
	};

	if (isLoadingProfile) {
		return <SettingsLoading />;
	}

	return (
		<div className="bg-black min-h-screen text-white">
			<AppHeader />

			<main className="mx-auto p-4 md:p-8 max-w-5xl container">
				<div className="space-y-8">
					{/* Header with Navigation */}
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3">
								<div className="bg-lime-400/10 p-2 rounded-lg">
									<Settings className="w-6 h-6 text-lime-400" />
								</div>
								<div>
									<h1 className="font-bold text-gray-100 text-3xl">Settings</h1>
									<p className="text-gray-400">
										Manage your account and preferences
									</p>
								</div>
							</div>
						</div>

						{hasUnsavedChanges && (
							<div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-lg text-amber-400 text-sm">
								<div className="bg-amber-400 rounded-full w-2 h-2 animate-pulse"></div>
								Unsaved changes
							</div>
						)}
					</div>

					<div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
						{/* Main Settings */}
						<div className="space-y-6 lg:col-span-2">
							{/* Profile Settings */}
							<Card className="bg-zinc-950/80 shadow-xl border-zinc-800">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-gray-100">
										<div className="bg-blue-500/10 p-2 rounded-lg">
											<UserCog className="w-5 h-5 text-blue-400" />
										</div>
										Profile Information
									</CardTitle>
									<CardDescription className="text-gray-400">
										Update your personal information and how others see you
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="gap-6 grid grid-cols-1 md:grid-cols-2">
										<div className="space-y-3">
											<Label
												htmlFor="displayName"
												className="flex items-center gap-2 font-medium text-gray-300"
											>
												<User className="w-4 h-4 text-gray-400" />
												Display Name
											</Label>
											<Input
												id="displayName"
												type="text"
												value={displayName}
												onChange={(e) => setDisplayName(e.target.value)}
												placeholder="Enter your display name"
												className="bg-zinc-900/50 border-zinc-700 focus:border-lime-400 focus:ring-lime-400/20 text-white transition-colors placeholder-gray-500"
											/>
											<p className="text-gray-500 text-xs">
												This is how your name appears to other users
											</p>
										</div>

										<div className="space-y-3">
											<Label
												htmlFor="email"
												className="flex items-center gap-2 font-medium text-gray-300"
											>
												<Mail className="w-4 h-4 text-gray-400" />
												Email Address
											</Label>
											<div className="relative">
												<Input
													id="email"
													type="email"
													value={email}
													disabled
													className="bg-zinc-800/50 pr-10 border-zinc-700 text-gray-400 cursor-not-allowed"
												/>
												<Shield className="top-1/2 right-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2 transform" />
											</div>
											<p className="flex items-center gap-1 text-gray-500 text-xs">
												<HelpCircle className="w-3 h-3" />
												Email cannot be changed here. Contact support for
												assistance.
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3 pt-4 border-zinc-800 border-t">
										<Button
											onClick={handleUpdateProfile}
											disabled={isLoading || !hasUnsavedChanges}
											className="bg-lime-400 hover:bg-lime-500 disabled:opacity-50 font-semibold text-black transition-all duration-200"
										>
											{isLoading ? (
												<>
													<Loader2 className="mr-2 w-4 h-4 animate-spin" />
													Saving...
												</>
											) : (
												<>
													<Save className="mr-2 w-4 h-4" />
													Save Changes
												</>
											)}
										</Button>

										{hasUnsavedChanges && (
											<Button
												variant="outline"
												onClick={handleDiscardChanges}
												className="hover:bg-zinc-800 border-zinc-700 text-gray-300 hover:text-white"
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
							<Card className="bg-zinc-950/80 shadow-xl border-zinc-800">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-gray-100 text-lg">
										<Check className="w-5 h-5 text-green-400" />
										Account Status
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-400 text-sm">Status</span>
											<span className="font-medium text-green-400 text-sm">
												Active
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400 text-sm">Plan</span>
											<span className="text-gray-300 text-sm">Free</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400 text-sm">
												Member since
											</span>
											<span className="text-gray-300 text-sm">Recently</span>
										</div>
									</div>

									<Separator className="bg-zinc-800" />

									<Button
										onClick={() => router.push(ROUTES.PRICING)}
										variant="outline"
										className="hover:bg-lime-400/20 bg-gradient-to-r from-lime-400/10 to-lime-500/10 border-lime-400/20 w-full text-lime-400 hover:text-lime-300"
									>
										Upgrade Plan
									</Button>
								</CardContent>
							</Card>

							{/* Danger Zone */}
							<Card className="bg-red-950/20 shadow-xl border-red-800/50">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-red-400 text-lg">
										<LogOut className="w-5 h-5" />
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
										className="bg-transparent hover:bg-red-900/30 border-red-800/50 hover:border-red-600 w-full text-red-400 hover:text-red-300"
									>
										<LogOut className="mr-2 w-4 h-4" />
										Sign Out
									</Button>

									<div className="pt-3 border-t border-red-800/30">
										<p className="mb-3 text-red-300/70 text-xs">
											Need help? Get in touch with our support team.
										</p>
										<div className="flex flex-col gap-2">
											<Button
												variant="link"
												className="justify-start p-0 h-auto text-red-400 hover:text-red-300 text-sm"
												onClick={() =>
													window.open("mailto:support@anzii.app", "_blank")
												}
											>
												📧 Contact Support
											</Button>
											<Button
												variant="link"
												className="justify-start p-0 h-auto text-red-400 hover:text-red-300 text-sm"
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
