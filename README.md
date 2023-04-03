# Deployed at

https://foli2023.netlify.app

## Things to add

---CRITICAL---

-   Add delete sheet button in the sidebar
-   Add edit to a job when on the jobs screen
-   Add show all hide all button to sidebar sheet list
-   Sm, Md, Lg, Letter style format of sheet (printer friendly version?)
-   "target" role, salary, etc...
-   Sticky survey at bottom
    -   What do you like, what's missing, what to chat about it?
-   Add template to prep for initial interview screening (questions to ask and info to get)
-   Add template for interview notes during / after interview.
-   Add templates for different types of interviews (portfolio, group, negotiation, etc.)

---LOW PRIORITY---

-   Open/Close Sheets bar
-   Animate table row when adding a job
-   Add focus state to all sheets using React-Quill

## Post-MVP Features

-   ChatGPT API
    -   Make job description persistant and automatic on job creation (will make future GPT links easier).
    -   Sidebar
    -   Prompts dropdown to start off with
    -   Settings button that shows what info is prefilled from preferences
    -   Add sheet from GPT button
-   Spaces
    -   Document Space (MVP)
    -   Negotiation Space
    -   Interview Space
-   Bugdgeting Tool
    -   Set all budgeting info for account
    -   Simple vs advanced. What is minimal and what can be added?
-   Add contacts (May go over sheets sidebar)
    -   Name, Role, Notes
-   Duplicate Job
-   Highlight Skills (Skills API)
-   Add (25mi, 50mi, 100mi) miles dropdown to add to a location
    -Mobile
    -   Build mobile interface
    -   See OurGroceries app for a good reference of what I want to do with sheets.

## UX Issues

-   Adding more sheets than visible in UI sidebar are hidden
-   User didn't realize adding a blank sheet added another page offscreen
-   User thought there was a dashboard beyond the Jobs page and got confused on how to get back to it

## Bugs

-   Adding locations to profile while onboarding the user didn't know locations were added until they pressed save. But when you are in the website it works and you can see the lcoations you type in
-   Position details default sheet sometimes doesnt appear when the button shows visible
