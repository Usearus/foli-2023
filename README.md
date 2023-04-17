# Deployed at

https://foli2023.netlify.app

## Things to add

---CRITICAL---

-   Templates need to be rewritten in Font Size to be picked up by new px.
-   Sticky survey at bottom
    What do you like, what's missing, what to chat about it?


---LOW PRIORITY---
-   Sidebar with templates pre-chosen based on stage.
-   AddSheetModal missing title count & limitation. (May use context for this)
-   Add Google Analytics
-   Filter on top of the jobs list, but only for stage.
-   Make sheets a sidebar on mobile
-   Animate table row when adding a job

## Post-MVP Features

-   ChatGPT API
    -   Make job description persistant and automatic on job creation (will make future GPT links easier).
    -   Sidebar
    -   Prompts dropdown to start off with
    -   Settings button that shows what info is prefilled from preferences
    -   Add sheet from GPT button
-   ADHD Tools
-   Spaces
    -   Document Space (MVP)
    -   Negotiation Space
    -   Interview Space
-   Bugdgeting Tool
    -   Set all budgeting info for account
    -   Simple vs advanced. What is minimal and what can be added?
-   Add contacts (May go over sheets sidebar)
    -   Name, Role, Notes
-   Highlight Skills (Skills API)

## Non-priority

-   Add location info
-   Add (25mi, 50mi, 100mi) miles dropdown to add to a location
-   Add focus state to all sheets using React-Quill

## UX Issues

-   Adding more sheets than visible in UI sidebar are hidden
-   User didn't realize adding a blank sheet added another page offscreen
-   User thought there was a dashboard beyond the Jobs page and got confused on how to get back to it

## Bugs

-   Adding locations to profile while onboarding the user didn't know locations were added until they pressed save. But when you are in the website it works and you can see the lcoations you type in
-   Position details default sheet sometimes doesnt appear when the button shows visible
