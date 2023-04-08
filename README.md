# Deployed at

https://foli2023.netlify.app

## Things to add

---CRITICAL---

-   Onboarding isnt working
-   Error logging into new account
    "nonIterableRest.js:2 Uncaught (in promise) TypeError: Invalid attempt to destructure non-iterable instance.
    In order to be iterable, non-array objects must have a [Symbol.iterator]() method."
-   Template isn't resetting on close
-   Remove all location stuff for profile only. (But fix issue first!)

-   Add instruction on how to use app during onboarding

    -   Add a new sheet
    -   Scroll horizontally to see all sheets
    -   Add your profile info
    -   Grab the end of the job description sheet and make it smaller
    -   Delete this sheet when done

-   Add show all hide all button to sidebar sheet list
-   "target" role, salary, etc...
-   Sticky survey at bottom
    -   What do you like, what's missing, what to chat about it?
-   Add company research template
    -   How large is the company?
    -   Who is the hiring manager?
    -   Interesting facts?
    -   When was the company established?
    -   Why do you like this job?
-   Add template to prep for initial interview screening (questions to ask and info to get)
-   Add template for interview notes during / after interview.
-   Add templates for different types of interviews (portfolio, group, negotiation, etc.)

---LOW PRIORITY---

-   Get VH to work on mobile with address bar
-   Add Google Analytics
-   Filter on top of the jobs list, but only for status.
-   Open/Close Sheets bar
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
