# Deployed at

https://foli2023.netlify.app

## Things to add

---CRITICAL---

- Add template preview when clicked in template panel
- Stop sheets reappearing after edit (try local storage for this)

---LOW PRIORITY---

- Add template to prep for initial interview screening (questions to ask and info to get)
  - Other templates can be for different types of interviews (portfolio, group, negotiation, etc.)
  - Add template for interview notes during / after interview.
- Make add sheet a dropdown button to add a sheeet or a template (and put in comments one for contacts)
- Add simple privacy policy page (who can I reference?).
- Fix unique key prop issue with TemplateCard
- Make job description persistant and automatic on job creation (will make future GPT links easier).
- Set nav and top bar to fixed (view on mobile after)
- When I open preferences, temp close profile (Or merge the two).
- Add focus state to all sheets using React-Quill
- When I click on profile remove active state on nav item
- Add (25mi, 50mi, 100mi) miles dropdown to add to a location

## Post-MVP Features

- When an account using Auth0 is created, add a record to Airtable profile base that has the members email address
- Look into crunchbase for Company Logos: https://data.crunchbase.com/docs/crunchbase-basic-getting-started
- Search feature
- Add copy to clipboard to any content field on a sheet on hover.
- Highlight Skills (Skills API)
- Ability to add contacts (May go over sheets)
  - Name, Role, Notes
- Open/Close Sheets bar
- Letter style button to change format of sheet to printer friendly version
- ChatGPT API Right Sidebar
  - Prompts dropdown to start off with
  - Settings button that shows what info is prefilled from preferences
  - Add sheet from GPT button
- Sticky survey at bottom
  - What do you like, what's missing, what to chat about it?
- Budgeting preferences page to set all budgeting info ahead of time.
  - Simple vs advanced. What is minimal and what can be added?
- Interview flash cards (mobile)
- Build mobile interface
- Convert to next.js

## Done

- Add max-width to alerts
- Add 'beta' badge next to foli icon. Make icon default to a normal cursor and not text.
- Modify toolbar module to simplify: https://quilljs.com/docs/modules/toolbar/
- Change job listing link to URL
- Change default ReactQuill headings
- add default content hight rich text editor to add sheet modal
- add warning before deleting a job
- Add rename Sheet
- Move Delete & Rename
- Make delete Sheet appear only on hover
- CSS for setting sheet height (affects React-Quill too)
- Added copy to clipboard button to link in position details
- Add global alerts
- When I hover over a table row make it show that it is clickable
- Add 'Position Details' sheet for each position
- add templates
- Get 'Position Details' sheet to hide from sidebar
- Edit Preferences Modal content to match content pre-filled.
- Get "remote" checkbox value to push to new Job records.
- Add 'remote' choice to job preferences
- Make badges remove locations, but dont save until you hit save button.
- Disable add button if value on locationRef is blank
- Move Profile into nav image
- Make Profile like the Figma profile page.
- Make trash button work while rest of row is clickable
- Click a job to bring user into a single job page (see what we did for Github User project)
- Ability to Add and Delete a job
- Markup conversion in sheets using react-showdown package
- Filter user jobs in table by what is in my account
- Filter user sheets in single job page by what job is being shown
- Added React-showdown for sheet markup
