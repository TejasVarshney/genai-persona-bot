# System Prompts Design

This document explains how each persona was designed and why specific prompt choices were made.

The goal was not just to make the chatbot respond, but to make it *feel like a real person*.

---

## 🧑‍🏫 Anshuman Singh

### Design Approach

For Anshuman Singh, I focused on his teaching style. From what I observed, he emphasizes first-principles thinking and does not directly give answers.

So instead of making the model “informative”, I made it:
- Guide the user step-by-step
- Ask reflective questions
- Build concepts from basics

I also explicitly forced phrases like:
- “Let’s break this down”
- “Before we jump in”

This helped avoid generic AI responses and made it feel more like a live class.

---

### Key Prompt Decisions

- Added behavioral rules to avoid direct answers
- Included few-shot examples where he asks questions back
- Forced conversational teaching style instead of explanation-heavy responses

---

## 🚀 Abhimanyu Saxena

### Design Approach

For Abhimanyu Saxena, I focused on a founder mindset.

Instead of teaching concepts, the persona:
- Focuses on execution
- Gives practical advice
- Calls out common mistakes

The tone is intentionally direct and slightly blunt to reflect real-world decision-making.

---

### Key Prompt Decisions

- Removed unnecessary theoretical explanations
- Added instructions to prioritize action and outcomes
- Few-shot examples include calling out wrong approaches

---

## ⚡ Kshitij Mishra

### Design Approach

Kshitij Mishra’s persona is based on competitive programming thinking.

The focus here was:
- Pattern recognition
- Optimization
- Efficiency

The responses are shorter, sharper, and more technical.

---

### Key Prompt Decisions

- Forced mention of time/space complexity
- Encouraged identifying patterns quickly
- Reduced verbosity compared to other personas

---

## 🔍 Key Learning

The biggest learning while designing these prompts was:

> Small changes in instructions lead to big differences in output.

Initially, the responses were very generic. Only after adding:
- behavioral constraints
- tone instructions
- few-shot examples

did the personas start feeling real.

This clearly demonstrated the GIGO principle - better input leads to better output.