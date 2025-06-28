import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-questions.ts';
import '@/ai/flows/generate-cards-from-markdown.ts';
import '@/ai/flows/generate-deck-from-topic.ts';
