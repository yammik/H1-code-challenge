# Lending Club Loan Stats
Readme
  Description of the problem and solution.
  Whether the solution focuses on back-end, front-end or if it's full stack.
  Reasoning behind your technical choices, including architectural.
  Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

  Clarity: does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
  Correctness: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
  Technical choices: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

## Aim of this app
#### U.S. State loan pattern
- Which state is the most car-crazy?
- Which state takes the most boujee vacations?
- Debt-heaviest state?

#### Word Frequency in loan descriptions
- which word is said the most for a given loan tier?
- currently, dictionary is too heavy

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
- Definitely could have used Redux for this.
