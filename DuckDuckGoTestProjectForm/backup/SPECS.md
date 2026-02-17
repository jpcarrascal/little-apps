# Web Form Specifications

## Original Request

I want you to help me build a web form. It should have 6 free text fields, as defined by numbered items in the Intro and Questions sections of the "questions.md" file. Include all the text from the file in the form. For all the bullet points, add checkboxes, that would help me make sure I have addressed all points.

Each response field must have a word counter, and a copy button---to copy the text data to the clipboard.

Data (checkbox statuses and text responses) should be stored in the browser local storage.

## Additional Requests

- Use only text from questions.md (no added titles or extra content).
- Include the sentence: "Specifically, we would like you to answer the following questions related to that project:"
- Ensure all word-limit sentences from questions.md are included.
- Persist textarea heights in localStorage.
- Add a top-level "Copy All Responses" button that copies all textarea content separated by dashes.

---

## Project Overview

Build a single-page web form that allows users to answer 6 free-text questions with supporting bullet point guidance. The form includes:
- Text input fields with word counters and word limit warnings
- Checkboxes for each bullet point to track completion
- Copy-to-clipboard functionality for each answer and all answers combined
- Automatic persistence to browser localStorage (including textarea heights)
- Plain, simple black and white design

---

## Technical Stack

- **HTML5** - Semantic structure
- **Vanilla CSS** - Minimal styling, black and white theme
- **Vanilla JavaScript** - No frameworks or libraries

---

## Form Structure

### Text Input Fields (6 total)

From questions.md:

0. **Field 0 (Intro)**: "Begin by describing the project..."
   - No word limit
   - 9 bullet points to check off

1. **Field 1 (Question 1)**: "Explain the rationale for the project..."
   - Word limit: 500 words
   - 4 bullet points to check off

2. **Field 2 (Question 2)**: "Talk us through your thought process..."
   - Word limit: 500 words
   - 3 bullet points to check off

3. **Field 3 (Question 3)**: "How did you approach delivery..."
   - Word limit: 350 words
   - 3 bullet points to check off

4. **Field 4 (Question 4)**: "What were your biggest individual learnings..."
   - Word limit: 250 words
   - No bullet points

5. **Field 5 (Question 5)**: "Did you use an LLM..."
   - No word limit
   - No bullet points

---

## Features & Functionality

### Word Counter
- Display current word count in real-time
- Show limit (if applicable) as "X / limit" format
- Warn user visually when word count exceeds limit (warning message with ⚠ symbol displays)
- Hide warning when count is within limit

### Copy Buttons
- **Individual copy buttons**: Located next to each text field
  - Copies only that field's content to clipboard
  - Shows "Copied!" feedback for 2 seconds, then reverts
- **Copy All button**: Located at the top of the form
  - Copies all textarea content combined into one block
  - Separates each response with `---` dashes for clarity
  - Same feedback behavior as individual copy buttons

### Checkboxes
- One checkbox per bullet point
- Checkboxes for questions 4 & 5 are hidden (no bullet points)
- Non-blocking (unchecked doesn't prevent form functionality)
- Each checkbox has a unique ID for localStorage tracking

### Local Storage Persistence
- **Text content**: Saves automatically as user types (`question_X` key)
- **Checkbox states**: Saves automatically when toggled (`checkbox_X_Y` key)
- **Textarea heights**: Saves when user resizes textarea (`height_X` key)
- All data loads on page load
- All data persists across browser sessions

---

## Design Requirements

- **Color Scheme**: Black text on white background
- **Layout**: Single column, centered, max-width 900px
- **Typography**: System fonts, simple and readable
- **Spacing**: Clean, minimal layout with section separators
- **Copy All Button**: Styled consistently with individual copy buttons, positioned at top center
- **No CSS Frameworks**: Plain CSS only

---

## User Interactions

1. User loads page → localStorage data is restored (if any)
2. User types in text field → word counter updates, data autosaves
3. User resizes textarea → height is saved to localStorage
4. User clicks checkbox → checkbox state updates, data autosaves
5. User clicks individual copy button → text copies to clipboard, "Copied!" feedback shown
6. User clicks "Copy All Responses" button → all text combines with dashes, copies to clipboard
7. User navigates away → all data persists in localStorage
8. User returns to page → all previous data and textarea heights are restored

---

## Deliverables

1. `index.html` - Main form page with semantic structure and all content from questions.md
2. `styles.css` - Plain, black and white styling (minimal and clean)
3. `script.js` - Form logic including:
   - localStorage management for text, checkboxes, and heights
   - word counting with limit warnings
   - individual and combined copy functionality with feedback
   - auto-save on input and resize events

---

## Notes

- No form submission button (autosave only)
- No reset/clear all button
- All interactions auto-save to localStorage immediately
- Form is self-contained and requires no backend
- Textarea heights are fully resizable and persistent
- Copy buttons show visual feedback with "Copied!" message for 2 seconds
