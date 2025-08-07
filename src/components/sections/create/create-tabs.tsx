"use client";

import { FileText, PlusCircle, SparklesIcon, Upload } from "lucide-react";

import AiTopicTab from "@/components/sections/create/ai-topic-tab";
import ImportTab from "@/components/sections/create/import-tab";
import ManualCreationTab from "@/components/sections/create/manual-creation-tab";
import MarkdownTab from "@/components/sections/create/markdown-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateTabs() {
	return (
		<Tabs defaultValue="ai" className="w-full">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="ai" className="flex items-center gap-2">
					<SparklesIcon className="h-4 w-4" />
					AI
				</TabsTrigger>
				<TabsTrigger value="manual" className="flex items-center gap-2">
					<PlusCircle className="h-4 w-4" />
					Manual
				</TabsTrigger>
				<TabsTrigger value="markdown" className="flex items-center gap-2">
					<FileText className="h-4 w-4" />
					Markdown
				</TabsTrigger>
				<TabsTrigger value="import" className="flex items-center gap-2">
					<Upload className="h-4 w-4" />
					Import
				</TabsTrigger>
			</TabsList>

			<TabsContent value="ai" className="space-y-6">
				<AiTopicTab />
			</TabsContent>

			<TabsContent value="manual" className="space-y-6">
				<ManualCreationTab />
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
