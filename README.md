# Deployed at

https://foli2023.netlify.app

# Packages

- This file has:
- Styled Components
- Airtable (database)
- React Router
- Auth0
- react-cool-onclickoutside (trigger callback when user clicks outside of target component. Used for my location dropdown. May remove)

## Things to add

---CRITICAL---

- Add general error banner with 3 second timeout and statement arguement
- Add delete Sheet
- Stop sheets reappearing after edit
- Add 'Position Details' sheet for each position
- When an account using Auth0 is created, add a record to Airtable profile base that has the members email address

---LOW PRIORITY---

- When I hover over a table row make it show that it is clickable
- Add (25mi, 50mi, 100mi) miles dropdown to add to a location
- Make numbers required to be 1000 and increment by 1000
- Convert to next.js
- When I open preferences, temp close profile.
- When I click on profile remove active state on nav item

## Post-MVP Features

- Search feature
- Move Delete & Rename

## Done

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
