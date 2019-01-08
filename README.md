# Lending Club Loan Stats

1. Analyze borrower-provided description of loans and plot
  - which word is said the most for a given loan tier?
  -
2. Correlate Geo-data (state) to amount borrowed per category
  - How much loan do NJ people take out for car?
  - Which state borrows the most money for home improvement?
  - Which state borrows the most money for debt consolidation?
3. Old-timers loan needs?

SPA.
A Tab per viz
1. Word map
2. US State map


Give user option.
For (2), allow detailed view of selected state (dropmenu component) with a presentational component:
  container with state,
  dropmenu changes that state,
  presentational component displays its props

  Also allow page-wide scrolling through different loan purposes


For (1), use different parameters to filter the loans and get desc from them.
  Use those desc to visualize
  dropmenu containers with parameters to filter by
  presentational component
