---
id: task-001
title: "feat: AI generation form: add number of cards, description"
status: Done
assignee: []
created_date: "2025-07-16"
updated_date: "2025-07-16"
completed_date: "2025-01-17"
labels: []
dependencies: []
---

## Description

Do not add long and redundant placeholders

## Implementation Details

Added two new fields to the AI deck generator form:

1. **Number of Cards** - Input field with range 5-30, default 15
2. **Description** - Optional textarea for additional context

Changes made:

- Updated `AiDeckGenerator` component form schema and UI
- Modified `createDeckFromAi` function to accept new parameters
- Enhanced `generateDeckFromTopic` AI flow with new input schema
- Updated the AI prompt to use numberOfCards and description
- Updated `useCreateDeckFromAi` hook for new parameter types

All placeholders kept concise as requested.
