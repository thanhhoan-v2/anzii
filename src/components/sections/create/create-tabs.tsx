"use client";

import { Bot, FileText, PlusCircle, Upload } from "lucide-react";

import AiTopicTab from "@/components/sections/create/ai-topic-tab";
import ImportTab from "@/components/sections/create/import-tab";
import ManualCreationTab from "@/components/sections/create/manual-creation-tab";
import MarkdownTab from "@/components/sections/create/markdown-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateTabs() {
	return (
		<Tabs defaultValue="manual" className="w-full">
			<TabsList className="grid grid-cols-4 w-full">
				<TabsTrigger value="manual" className="flex items-center gap-2">
					<PlusCircle className="w-4 h-4" />
					Manual
				</TabsTrigger>
				<TabsTrigger value="ai" className="flex items-center gap-2">
					<Bot className="w-4 h-4" />
					AI Topic
				</TabsTrigger>
				<TabsTrigger value="markdown" className="flex items-center gap-2">
					<FileText className="w-4 h-4" />
					Markdown
				</TabsTrigger>
				<TabsTrigger value="import" className="flex items-center gap-2">
					<Upload className="w-4 h-4" />
					Import
				</TabsTrigger>
			</TabsList>

			<TabsContent value="manual" className="space-y-6">
				<ManualCreationTab />
			</TabsContent>

			<TabsContent value="ai" className="space-y-6">
				<AiTopicTab />
			</TabsContent>

			<TabsContent value="markdown" className="space-y-6">
				<MarkdownTab />
			</TabsContent>

			<TabsContent value="import" className="space-y-6">
				<ImportTab />
			</TabsContent>
		</Tabs>
	);
}
