# Lending Club Loan Stats (Front End)

## Usage
1. Clone this repo. There is a [back end](https://github.com/yammik/H1-code-challenge-api), but it's live on Heroku [here](http://hidden-shore-16694.herokuapp.com/api/v1/states/4) so you don't have to clone and run the server locally.
2. Run `npm install && npm start`
3. Go to [http://localhost:3001/](http://localhost:3001/)

## Features
#### U.S. State loan pattern
Provides a visual overview of the total loan sum per state.
- Which state is the most car-crazy?
- Which states do not care that the wedding industry is a scam?

#### Word Frequency in loan descriptions
Generates a word cloud based on the loan applicants' description.
- Which word is said the most in a category?
- Unsurprisingly, loan applicants talk about paying off loans a lot
- And a lot of gratitude words in there :)

## Rationale
#### USAMap
I looked into d3 first because of its popularity, but ultimately decided d3 would be an overkill for what I wanted to do in this challenge. But it would be really good to learn for a more long-term project.
It takes care of a lot of rendering on its own--no need to map a path to the state's ID or name. Color can be optionally passed in for a specific state, so I assigned a color value based on the total loan amount of applications listed in the respective state.

#### react-d3-cloud
[d3-cloud](https://github.com/Yoctol/react-d3-cloud) is a word cloud component. This is a part of the d3 library to visualize word frequency in the descriptions of the loan applications.
It is as minimal as its Readme, and very simple to use.

#### react-bootstrap
[react-bootstrap](https://react-bootstrap.github.io) just makes life easy. I prefer custom CSS when I have the leisure, but bootstrap just makes the layout so much easier.

#### react-tooltip
When I realized that d3 would have made it easier to implement Tooltip on hovering over paths, I almost decided to go back to the d3 route, but after 2 seconds of Googling, I found that there was a package for it already: [react-tooltip](https://github.com/wwayne/react-tooltip).
Changing display via mouseover/mouseleave events can be annoying, but this tool simplified a lot of that. 

## Structure
```
App 
 |
 |___ Controller
 |___ Tabs
        |
        |___ FormatMap
        |         |___ StatesMap
        |         |       |___ USAMap
        |         |       |___ ReactToolTip
        |         |___ Legend
        |                 |___ LegendElement(s)
        |___ WordCompute
                  |___ WordMap
                          |___ WordCloud
                  
```

- M : 
  App component stores the bulk of the data, and talks to Controller component
- V : 
  StatesMap and WordMap components display received data.
- C : 
  Controller component takes inputs from user and relates those to the data in the App component.<br/>
  FormatMap and WordCompute components take the data and format them into the shape the view components can use.

- `src/lib/Api.js` handles all of the API calls, using Axios. It's also where the base url for the endpoint can be changed.


## Future features
- Definitely can use Redux for this.
- Currently, Word Cloud can be shown only for one state at a time. Because I almost died from trying to load all 51 and parsing 5000+ words for each one. So you have to use the drop menu to select other states to see them (yuck bad UX). Would be cool to have infinite scrolling and load other states' data as a response to a scroll event.
- The total loan sum per state is currently not normalized. Should use each state's population to do that in the future.
- The loading bar for the word cloud menu is weak--it doesn't actually show the state of the progress. Should count the number of words to parse through. Since it is only loading one state at a time, it's relatively fast enough, but still would be nice to have a progress bar anyways.
- The features only show graphical overview of the subset of data, but doesn't offer any real statistics or solid nuggets of insight. Should do that.
