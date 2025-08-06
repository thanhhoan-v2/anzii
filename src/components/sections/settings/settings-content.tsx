"use client";

import { useUser } from "@stackframe/stack";
import {
	HelpCircle,
	Loader2,
	Mail,
	PaletteIcon,
	Save,
	Settings,
	Shield,
	User,
	UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeGrid } from "@/components/common/theme-grid";
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
		<div className="min-h-screen">
			<AppHeader />

			<main className="container mx-auto p-4 md:p-8">
				<div className="space-y-8">
					{/* Header with Navigation */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3">
								<div className="rounded-lg bg-primary/10 p-2">
									<Settings className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Settings</h1>
									<p className="text-muted-foreground">
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

					<div className="grid grid-cols-1 gap-8">
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
												className="bg-zinc-900/50 text-white"
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
											className="bg-primary font-semibold text-black transition-all duration-200 hover:bg-primary/50 disabled:opacity-50"
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

							{/* Appearance Settings */}

							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-2 text-lg text-gray-100">
										<PaletteIcon className="h-5 w-5 text-primary" />
										Appearance
									</CardTitle>
									<CardDescription className="text-gray-400">
										Customize the look and feel of your experience
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<ThemeGrid />
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
