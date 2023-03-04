# Deployed at

https://foli2023.netlify.app

# Packages

- This file has:
- Styled Components
- Airtable (database)
- Auth0

## Things to add

---CRITICAL---

- Add border radius & focus state to React-Quill in Add Sheet modal.
- Add focus state to all sheets using React-Quill
- add templates
- add rich text editor to new sheet modal
- add warning before deleting a job
- Add general error banner with 3 second timeout and statement arguement
- Make delete Sheet appear only on hover
- Add rename Sheet
- Stop sheets reappearing after edit (May need to add a state in Airtable for this)
- When an account using Auth0 is created, add a record to Airtable profile base that has the members email address

---LOW PRIORITY---

- Add 'Position Details' sheet for each position
- Look into crunchbase for Company Logos: https://data.crunchbase.com/docs/crunchbase-basic-getting-started
- Modify toolbar module to simplify: https://quilljs.com/docs/modules/toolbar/
- When I hover over a table row make it show that it is clickable
- Add (25mi, 50mi, 100mi) miles dropdown to add to a location
- Make numbers required to be 1000 and increment by 1000
- When I open preferences, temp close profile.
- When I click on profile remove active state on nav item
- Convert to next.js

## Post-MVP Features

- Search feature
- Move Delete & Rename

## Done

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
- Addecd React-showdown for sheet markup
