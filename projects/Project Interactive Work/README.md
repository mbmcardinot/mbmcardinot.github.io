# The Price of a Future

## Assignment
Project: Interactive Work (Global, Political, or Societal Relevance)

## Description
The Price of a Future is a one page interactive awareness website about affordable education, rising tuition, and student debt in the United States. It is designed for college bound students, first generation students, current college students, and families who want to understand college costs more clearly.

The project uses storytelling, simplified tuition data, a projection chart, a debt calculator, and action cards to make the issue easier to explore.

## Features
- Sticky one page navigation.
- Hero introduction with subtle animation.
- Problem section with three issue cards.
- Interactive Chart.js tuition explorer.
- Growth-rate slider for 2030 and 2035 tuition projections.
- Automatic debt calculator with interpretation messages.
- Three expandable student persona stories.
- Practical take-action section.
- Source and AI documentation section.
- Responsive layout for desktop and mobile.

## File Structure

```text
  affordable-education-interactive/
  index.html
  style.css
  script.js
  documentation.md
  README.md
  chart.js
  assets/
  affordability-flow.svg
  screenshots/
  README.md
```

## How to Run
Open `index.html` directly in a web browser. No server, build tools, npm, backend, React, or Vue are required.

Chart.js is included as a local `chart.js` file so the site works when opened directly. A Chart.js CDN script is also included in `index.html` for the assignment requirement and online use.

## JavaScript Concepts Used
- `const` and `let`
- Functions
- Arrays and objects
- Event listeners
- DOM selection and updates
- Template-free dynamic content updates
- Number validation
- `Math.pow()` for projections
- `Intl.NumberFormat` for currency formatting
- Chart.js configuration
- `IntersectionObserver` for active navigation highlighting
- ARIA attributes for expandable story cards

## Credits and Sources
- National Center for Education Statistics (NCES): https://nces.ed.gov/programs/digest/d23/tables/dt23_330.10.asp
- Federal Student Aid: https://studentaid.gov/
- Pew Research Center student loans topic page: https://www.pewresearch.org/topic/economy-work/personal-finances/student-loans-1/

The tuition chart uses simplified demonstration data. Replace it with exact current source data if required for final grading.

## Future Improvements
- Replace demonstration tuition values with a fully cited data table.
- Add more student personas.
- Add a comparison tool for multiple schools.
- Add a printable college cost planning checklist.
- Add a second language version for families who prefer it.
