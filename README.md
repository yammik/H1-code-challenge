# Lending Club Loan Stats (Front End)

## Usage
1. Clone this repo. There is a [back end](https://github.com/yammik/H1-code-challenge-api), but it's live on Heroku [here](http://hidden-shore-16694.herokuapp.com/api/v1/states/4) so you don't have to clone and run the server locally.
2. `npm install && npm start`
3. Go to [http://localhost:3001/](http://localhost:3001/)

#### Features
###### U.S. State loan pattern
- Which state is the most car-crazy?
- Which state takes the most boujee vacations?
- Debt-heaviest state?

###### Word Frequency in loan descriptions
- which word is said the most for a given loan tier?
- view one state's data on a given loan purpose category at a time

## Rationale
#### USAMap
I looked into d3 first because of its popularity, but ultimately decided d3 would be an overkill for what I wanted to do in this challenge. But it would be really good to learn for a more long-term project.<br />
It takes care of a lot of rendering on its own--no need to map a path to the state's ID or name. Color can be optionally passed in for a specific state, so I assigned a color value based on the total loan amount of applications listed in the respective state.
<br />

#### react-d3-cloud
[d3-cloud](https://github.com/Yoctol/react-d3-cloud) word cloud component. This is a part of the d3 library to visualize word frequency in the descriptions of the loan applications.<br />
It is as minimal as its Readme, and very simple to use.
<br />

## Future features
####
- Definitely can use Redux for this.
- Currently, Word Cloud can be shown only for one state at a time. Because I almost died from trying to load all 51 and parsing 5000+ words for each one. So you have to use the drop menu to select other states to see them (yuck bad UX). Would be cool to have infinite scrolling and load other states' data as a response to a scroll event.
- The total loan sum per state is currently not normalized. Should use each state's population to do that in the future.
