---
id: task-004
title: "Add multiple choice question (MCQ) card type"
status: "To Do"
assignee: []
created_date: "2025-01-17"
updated_date: "2025-01-17"
labels: ["feature", "card-types", "mcq"]
priority: "High"
estimate: "1w"
---

## Description

Implement multiple choice question card type to provide more variety in study methods. This will allow users to test knowledge recognition rather than just recall, supporting different learning styles.

## Acceptance Criteria

- [ ] MCQ card creation interface with multiple options
- [ ] Support for 2-8 answer choices per question
- [ ] Correct answer marking and validation
- [ ] MCQ card review interface with answer selection
- [ ] Scoring system for MCQ performance
- [ ] AI generation of MCQ cards from topics
- [ ] Import/export support for MCQ cards
- [ ] Analytics tracking for MCQ performance

## Implementation Plan

- Design MCQ data schema and database tables
- Create MCQ card creation and editing UI
- Implement MCQ review interface with answer selection
- Update spaced repetition algorithm for MCQ scoring
- Integrate MCQ generation into AI flows
- Add MCQ support to import/export functions

## Notes & Comments

Consider implementing partial credit for partially correct answers in multi-select scenarios. Research educational best practices for MCQ design and feedback.
