# Plan
## Components
- Service to get data
- Data provider
- Loader
- Container
- Gauge
    - Arc
    - Needle
    - Numbers

## Folder structure
    - components
    - helpers
    - services
    - types

## Libraries
    - Lodash?
    - Something to handle currency units

## Tests
    - Write tests to cover values with currency and without currency
    - Cover the helper functions

## UI
- Container   
    - 100vw
    - 100vh
- Draw a semicircle in the middle
- Draw a needle
- Transform the needle

Using SVG because I know how to handle circles and arcs better there than in canvas

## Helper Functions
- validate data
    - make sure value is within min max range
    - make sure max value is bigger than min value


- Convert angle to %
    - normalise the data
        - subtract min from value and max to get normalised data
    - get value % of normalised max
            `value/max*100`
    - get % of 180
            `1.8*percentVal`
    - use that angle to rotate the needle


## Potential Future stuff
    Move the pointer
        How to move along the arc only?
        Not sure about this one
        ... will have to play with arcs
    Editable numbers
        edit numbers, move the arc

# Notes:
Noticed that the values can be messed up, so will need to validate these so we don't end up with weird or broken UI
Example of broken values I have found
{"min":249,"value":636,"max":88,"format":"currency","unit":"GBP"}
{"min":765,"value":776,"max":91}
{"min":528,"value":54,"max":787}

Will consider the following to be errors:
    - max is less than the min value
    - value is outside the min/max range
    - all three values are the same

API also sometimes spits an error, will throw this back to the UI

*Because of this you may need to refresh a couple fo times to get good data, don't give up on an error!*

Error component is just a div thats says error, this could be improved

Sometimes the numbers have a currency and a unit, support this

## UI Considerations
Are these values editable once they have been pulled down? Which ones?
If the values are editable, is the UI also interactable? Can I grab the gauge indicator and swing it around?
Can I make the the visuals even clearer by using two contrasting colors between the indicator arrow?
Make sure the values are screen readable

# Decisions
Used create-react-app with --typescript
There is a lot of boilerplate here from using the create-react-app method
This sets you up with a `package.json`, `tsconfig.json`, `.gitignore` and `src` folder with an index, App component and some basic test set up

Used react-router and data loader to get going
Using typescript, again for familiarity but also type safety for speed

Decided to use SVG for the components over canvas for the following reasons:
    - personally more familiar with drawing circles/arcs with SVGs
    - In case some elements may need to be interactable, canvas less good for this
    - Didn't want to use multiple methods of drawing shapes for speed and simplicity
    - Could use CSS to style the SVG
    - Could use CSS to animate parts of the image

Used react router for for basic data handling. Could extend this with loader and error components

Used a library ts-money to handle currencies
~~Nicked~~ Borrowed a CurrencyCode enum that would support the backend from a gist
Showing the gauge in two colours:
Full disclosure, I went away and spent a bit of time on circle maths for this. I found a solution that was CSS only that probably would have been less code logic to implement but I was planning on doing this anyway for a personal project so now seemed like a good time to actually do it! 

I did the needle rotation angle method before coming up with dual colours, so thats why they are implemented differently. However, with the needle being a core part of the component, and the extra colour being a complement, I felt it better to keep the simpler implementation here that works, than to rewrite into something more esoteric just to match it up

Made sure the unit tests covered the most important functionality. Would need some visual snapshot testing to test the actual visuals though

I wanted it to be as composable as possible so I pulled out some variables to make this future extensible.

Changing gaugeWidth and gaugeIndicatorExtrusion in gauge.tsx will change the size of the component. The consumer of the component could then use their own methods of either detecting window size to make it responsive or using known breakpoints to limit it to a sensible size

Added a number input to adjust the value if you want (max and min are non adjustable for now, this could be added)

Not including the maths detour and this write up, this took roughly 5 hours

# Improvements
- I have only checked this in chrome and safari!
- It could be prettier, a designer would do a better job but it should be easily fixable
- An Error component
- differentiate between server errors and invalid data errors
- A Loading component
- The Gauge and App abstraction is not really necessary right now, and so Gauge is only covered by the App unit test file, which is kinda inefficient because of the mock router hook. I could consolidate these but as soon as we extend gauge to include any variables outside of the values (such as passing in width) the abstraction becomes useful
- I didn't finish a test for formatGaugeDataValue
- The gauge file could be split out further to prevent rerenders

