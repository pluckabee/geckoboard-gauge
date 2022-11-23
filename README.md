# Geckoboard Gauge

This is to fulfil the geckoboard code task

The task is outlined in [TASK.md](TASK.md)

# Instructions

This was built using create-react-app with --typescript option

Instructions to run the app and test are found in [INSTRUCTIONS.md](INSTRUCTIONS.md)

Once set up, refresh to get new data

# Final structure
These are the most important files:
index.tsx // original boilerplate name
App.tsx // original boilerplate name
Gauge.tsx
helpers.ts
gaugeDataService.ts

Start with src/index.tsx, this sets up the router and Router Provider.
Our service `src/services/gaugeDataService.ts` is passed to the data loader
`App` as the element
A generic div is passed as the error element

Service `src/services/gaugeDataService.ts` validates the data and throws an error on server error or invalid data (`src/helpers/helpers.ts` `validateGaugeData`)

Moving to `src/App.tsx` the `App` component pulls down the gauge data from the router hook and passes this down to child component `Gauge`


`src/components/Gauge.tsx` is the bulk of the work, rendering the indicator and labels. The data is passed in rather than using a hook.
It consists of an SVG that responds to the given values from the API
The SVG has three basic parts:
    The body (the main semi circle)
    The fill indicator
    The lever/needle indicator and base group

There is some maths here to shift the angle of the needle based on the values
There is some maths here to create the fill indicator (we need to know where along the arc we are, this can be done based on the angle we have already calculated)

Most of this logic is written in the `src/helpers/helpers.ts` file and tested

The SVGs paths use some variables to base these calculations on

# Write up

A write up of the process is written up in [PROCESS.md](PROCESS.md)

This document is split up into 4 main sections
- Plans
- Notes
- Decisions
- Improvements

*Plan* is the outline of my initial structure planning. This is purely technical planning. Some parts here may not be indicative of the final result

*Notes* are some considerations around the API and the UI that came up during the planning and development

*Decisions* These are some non exhaustive notes of the decisions made during the process

*Improvements* Some Improvements that could be made to both code and UI

