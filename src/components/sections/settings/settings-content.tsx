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
	Type,
	User,
	UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FontGrid } from "@/components/common/font-grid";
import { SettingsCardHeader } from "@/components/common/settings-card-header";
import { ThemeGrid } from "@/components/common/theme-grid";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFont } from "@/hooks/use-font";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";

import SettingsLoading from "./settings-loading";

export default function SettingsContent() {
	const user = useUser();
	const router = useRouter();
	const { toast } = useToast();
	const { font, setFont } = useFont();
	const { colorScheme, setColorScheme } = useColorScheme();

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [originalPreferences, setOriginalPreferences] = useState({
		displayName: "",
		theme: "",
		font: "",
	});

	// Redirect to sign-in if not authenticated
	useEffect(() => {
		if (user === null) {
			router.push(ROUTES.SIGN_IN);
		} else if (user) {
			const loadUserPreferences = async () => {
				try {
					const response = await fetch("/api/user/preferences");
					if (response.ok) {
						const preferences = await response.json();
						const displayNameValue =
							preferences.displayName || user.displayName || "";
						setDisplayName(displayNameValue);
						setOriginalPreferences({
							displayName: displayNameValue,
							theme: preferences.theme || "space-grotesk",
							font: preferences.font || "space-grotesk",
						});
					} else {
						const displayNameValue = user.displayName || "";
						setDisplayName(displayNameValue);
						setOriginalPreferences({
							displayName: displayNameValue,
							theme: "space-grotesk",
							font: "space-grotesk",
						});
					}
				} catch (error) {
					console.error("Error loading user preferences:", error);
					const displayNameValue = user.displayName || "";
					setDisplayName(displayNameValue);
					setOriginalPreferences({
						displayName: displayNameValue,
						theme: "space-grotesk",
						font: "space-grotesk",
					});
				}
				setEmail(user.primaryEmail || "");
				setIsLoadingProfile(false);
			};

			loadUserPreferences();
		}
	}, [user, router]);

	// Track changes for unsaved indicator
	useEffect(() => {
		if (user && !isLoadingProfile) {
			// Compare with the original preferences
			const currentDisplayName = displayName.trim();
			const hasDisplayNameChanges =
				currentDisplayName !== originalPreferences.displayName;

			const hasFontChanges = font !== originalPreferences.font;
			const hasThemeChanges = colorScheme !== originalPreferences.theme;

			const hasChanges =
				hasDisplayNameChanges || hasFontChanges || hasThemeChanges;
			setHasUnsavedChanges(hasChanges);
		}
	}, [
		displayName,
		originalPreferences,
		user,
		isLoadingProfile,
		font,
		colorScheme,
	]);

	const handleUpdateProfile = async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			// Update Stack Auth user
			await user.update({
				displayName: displayName.trim() || undefined,
			});

			// Update database preferences
			await fetch("/api/user/preferences", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					displayName: displayName.trim() || undefined,
				}),
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
			setDisplayName(originalPreferences.displayName);
			// Reset font and theme to original values
			setFont(originalPreferences.font);
			setColorScheme(originalPreferences.theme);
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
							<div className="flex items-center gap-3">
								{/* <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-lg text-amber-400 text-sm">
									<div className="bg-amber-400 rounded-full w-2 h-2 animate-pulse"></div>
									Unsaved changes
								</div> */}
								<Button
									onClick={handleUpdateProfile}
									disabled={isLoading}
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
								<Button
									variant="outline"
									onClick={handleDiscardChanges}
									className="border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white"
								>
									Discard
								</Button>
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 gap-8">
						{/* Main Settings */}
						<div className="space-y-6 lg:col-span-2">
							{/* Profile Settings */}
							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<SettingsCardHeader
									title="Profile Information"
									description="Update your personal information and how others see you"
									icon={UserCog}
									iconColor="text-blue-400"
									iconBgColor="bg-blue-500/10"
								/>
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
								</CardContent>
							</Card>

							{/* Font Settings */}
							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<SettingsCardHeader
									title="Typography"
									description="Choose your preferred font for better readability"
									icon={Type}
									iconColor="text-purple-400"
									iconBgColor="bg-purple-500/10"
								/>
								<CardContent className="space-y-4">
									<FontGrid />
								</CardContent>
							</Card>

							{/* Appearance Settings */}

							<Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
								<SettingsCardHeader
									title="Appearance"
									description="Customize the look and feel of your experience"
									icon={PaletteIcon}
									iconColor="text-primary"
									iconBgColor="bg-primary/10"
								/>
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
