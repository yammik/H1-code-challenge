# Lending Club Loan Stats

### Feature
1. Correlate Geo-data (state) to amount borrowed per category
  - Which state is the most car-crazy?
  - Which state has the most boujee vaca?
  - Debt-heaviest state?

(coming soon in v2)
2. Analyze borrower-provided description of loans and plot
  - which word is said the most for a given loan tier?


Give user option.
For (1), allow detailed view of selected state (dropmenu component) with a presentational component:
  container with state,
  dropmenu changes that state,
  presentational component displays its props

  Also allow page-wide scrolling through different loan purposes


For (2), use different parameters to filter the loans and get desc from them.
  Use those desc to visualize
  dropmenu containers with parameters to filter by
  presentational component
