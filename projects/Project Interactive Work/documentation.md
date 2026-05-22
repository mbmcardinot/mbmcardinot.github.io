# The Price of a Future: An Interactive Guide to Affordable Education
Mella Cardinot
May 19th, 2026

## Project Title
The Price of a Future: An Interactive Guide to Affordable Education

## Assignment
Project: Interactive Work (Global, Political, or Societal Relevance)

## Topic
Affordable education and the rising cost of higher education in the United States.

## Why This Topic Has Societal Relevance
College is often described as a doorway to opportunity, but for many students, me included, that doorway comes with a price tag that feels impossible before they even step through it. The cost of tuition, housing, books, and fees can shape whether a student applies, enrolls, transfers, works while studying, or graduates with debt. Because higher education affects career access, family finances, civic participation, and long-term mobility, college affordability is a societal issue, not only an individual budget problem.

## Target Audience
The primary audience is college bound high school students, first generation college students, current college students, and families in the United States who are trying to understand college affordability. The project is especially intended for students aged 16 to 25 who are comparing college options and worrying about debt.

## How the Project Connects With the Target Audience
The project connects with students through interactive tools, simple explanations, and relatable student stories. Instead of presenting college affordability as abstract policy, it shows how costs affect individual choices: where to apply, whether to transfer, whether to work while studying, and how much debt may follow after graduation. The tuition explorer turns a long-term trend into something users can adjust, while the debt calculator helps families test realistic cost scenarios.

## Problem Statement
Higher education can create long-term opportunity, but rising tuition and student debt can limit access for students from lower income families, first generation students, and students without strong financial support. If the problem is not addressed, many students may delay college, choose programs based only on cost, or graduate with debt that affects housing, career choices, and financial stability.

## Evidence and Research
This project uses credible research sources to frame the issue. The site labels the chart values as approximate/simplified project demo data. The demonstration values are intended for learning and interaction, not as exact current tuition claims. Replace the values in `script.js` with exact current research numbers if the final submission needs verified numeric precision.

Research sources:

1. National Center for Education Statistics (NCES), Digest of Education Statistics, Table 330.10. This source provides historical college cost data for tuition, fees, room, and board: https://nces.ed.gov/programs/digest/d23/tables/dt23_330.10.asp
2. Federal Student Aid, U.S. Department of Education. This source explains FAFSA, grants, loans, work-study, and repayment information: https://studentaid.gov/
3. Pew Research Center, Student Loans topic page. This source provides context about student loan debt and personal finance: https://www.pewresearch.org/topic/economy-work/personal-finances/student-loans-1/

## Executive Summary
This interactive website helps users understand the cost of higher education through a tuition trend chart, a debt calculator, and student persona stories. The goal is not only to explain the problem, but to help students think critically about college costs and take practical steps, such as comparing net price, applying for financial aid, researching scholarships, asking colleges about grants, and advocating for public education funding. The final impression should be clear: affordable education matters because it affects who gets access to opportunity and how much financial pressure follows students into adulthood.

## Prototype Flow

```text
[Hero / Introduction]
User sees the main issue and clicks "Explore Costs."

-> scrolls to

[The Problem]
User reads three short statistic cards about tuition growth, debt, and unequal access.

-> scrolls to

[Tuition Explorer]
User adjusts a growth-rate slider and watches the projected tuition chart update.

-> scrolls to

[Debt Calculator]
User enters tuition, aid, living expenses, and years enrolled.
The site calculates an estimated total cost and gives an interpretation message.

-> scrolls to

[Student Stories]
User reads three expandable student personas showing how affordability affects real decisions.

-> scrolls to

[Take Action]
User sees practical steps and civic actions.

-> scrolls to

[Sources / Credits]
User can review sources, credits, and AI documentation.
```

## Prototype / Architecture Plan
- `index.html`: page structure, sections, accessible labels, source links, and project content.
- `style.css`: visual identity, responsive layout, animation, cards, navigation, and accessibility states.
- `script.js`: smooth navigation, active nav highlighting, Chart.js tuition chart, projection slider, debt calculator, expandable story cards, and formatting helpers.
- `assets/`: supporting media, including the affordability flow visual.
- `screenshots/`: final website screenshots.

## Interaction List
- Sticky navigation scrolls to each section.
- Navigation links highlight on hover, focus, and active scroll position.
- Hero call to action scrolls to the Tuition Explorer.
- Animated hero cost cards provide motion without overwhelming the page.
- Chart.js line chart compares public and private tuition demo data.
- Growth-rate slider updates 2030 and 2035 tuition projections.
- Debt calculator automatically updates when users change tuition, years, aid, or living expenses.
- Calculator prevents negative totals by treating invalid negative entries as the minimum allowed value.
- Student story buttons expand and collapse additional details.
- Source links open credible research references.

## Media / Visuals List
- Animated hero cards.
- Three issue statistic cards.
- `assets/affordability-flow.svg` showing sticker price, aid, net price, and college decision flow.
- Chart.js tuition line chart.
- Projection summary values.
- Result card in the debt calculator.
- Student persona cards.
- Action cards.

## AI Use Documentation
AI Tool Used: ChatGPT

Prompt Used: Analyzing these plain HTML, CSS, and JavaScript interactive website files about affordable education, prompt me with more interactive ideas brainstorming to improve the site's usability.

Full Response Summary: Drafted different simulations for future college applicants based on family socioeconomic status and/or background, and what attitudes can be adhered to approach their opportunities in the best way.