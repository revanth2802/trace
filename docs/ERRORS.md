# Findings and review concerns

These checks use the supplied fictional packet, not external tax-law assertions. Confirmed discrepancies are distinguished from matters needing accountant judgment. Engine diagnostics are separately labeled in the app.

## Swedish interest uses a prior-year rate

SEK 18,450 divided by 10.56 gives $1,747. The packet’s 2025 average rate is 9.86, giving approximately $1,871.

Evidence: SchB.1.6, D36, ref:fx.SEK.2025_average. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Mileage sheet counted twice

May–August appears on pages 2 and 3. Unique page totals are 2,600 + 3,700 + 1,800 = 8,100 miles. Review the engine’s mileage expense.

Evidence: SchC.9, D23. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## RSU sales carry zero cost basis

Three RSU lots show zero basis. Compare brokerage sales to the stock-plan supplemental statement before accepting capital gains.

Evidence: F8949.B.N1, F8949.B.N3, F8949.E.N4, D11, D28. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Corrected brokerage supplemental sale omitted

D31 page 32 contains M18: proceeds $250, basis $310, short-term loss $60. No M18 return line exists. The missing proceeds also explain the $250 summary/detail mismatch.

Evidence: D31, ev-0703. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Dependent identity conflicts with Social Security card

Theo’s household SSN differs from the printed Social Security card. Confirm the card before e-file; preserve the client entry and correction.

Evidence: D71, household:theo. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Matching Northlake interest needs reconciliation

The composite statement and standalone 1099-INT both contribute $1,840. Determine whether they describe the same bank sweep interest.

Evidence: SchB.1.1, SchB.1.2, D28, D29. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Estimated payments exceed IRS transcript

The engine claims 13,000 in estimated payments; the March transcript totals 12,000. The client guessed $4,000 for January, while IRS records show $3,000.

Evidence: F1040.26, qa-41, agency:/irs_account_transcript_2025/0, D67, D69. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Full family utilities deducted

The engine deducts $3,480. The client call reports 70% business use of the $2,160 mobile plan and 50% of the $1,320 internet service, totaling $2,172.

Evidence: SchC.25, D15, call-01. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Personal subscription remains in business expenses

The $6,850 software balance includes $216 Spotify Family, confirmed personal in the client call. Review a $216 exclusion.

Evidence: SchC.27a.1, D15, call-01. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## California wages follow stale payroll coding

The employer retained California coding through September, although the household moved July 15. Compare D73 year-to-date CA taxable wages with W-2 totals; determine a supported resident/nonresident wage allocation.

Evidence: SchCA540NR.1.E, D09, D73, qa-02. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Vehicle gift uses donor estimate instead of sale record

The engine uses the client’s $6,000 valuation. Form 1098-C documents a sale for $2,900. Record a supported deduction decision rather than accepting the donor estimate.

Evidence: F8283.A1.vehicle, D66, qa-39. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Whole HVAC replacement treated as repairs

D47 and the client call describe an $11,000 complete replacement. Review capitalization, service date and depreciation instead of accepting the repairs mapping.

Evidence: SchE.14A, D47, call-01. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Partnership outside basis is not documented

Prior records show a capital account but outside basis was never computed. Record the reconstruction and supporting evidence; capital account alone does not complete the basis history.

Evidence: D37, py:/basis_records/partnership_ridgeline. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Business receipts need a books reconciliation

Atlas receipts include $12,400 processed by Paywell. Reconcile books, 1099-NEC and 1099-K; do not add overlapping reports blindly.

Evidence: SchC.1, D14, D15, D17, D21. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Source verification required: C6 cost basis

Pipeline read null with 60% confidence. Inspect the printed source and record verification.

Evidence: ev-0919. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Source verification required: Cash gift amount

Pipeline read 1500 with 41% confidence. Inspect the printed source and record verification.

Evidence: ev-1049. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D07

Narrative workpaper export; its content is reproduced as structured data in prior_years.prior_preparer_workpaper.

Evidence: D07. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D30

Page 32 ('Additional transactions') was not read by the pipeline.

Evidence: D30. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D31

Page 32 ('Additional transactions') was not read by the pipeline.

Evidence: D31. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D69

Agency transcript; reproduced as structured data in tax_agency_records.irs_account_transcript_2025.

Evidence: D69. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D70

Resolved prior-year notice; summarized in tax_agency_records.notices.

Evidence: D70. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Incomplete extraction: D72

Examination letter received after filing; summarized in tax_agency_records.notices.

Evidence: D72. The review queue opens the exact linked figure or document; resolutions require a saved explanation.

## Important correctly handled items

The latest version counts the duplicated Halvorsen W-2 once. The 2023 S-corporation K-1 is linked in v3 and its $2,300 beginning basis agrees with reconstruction from $21,300 in 2022, +$14,100 −$20,000 in 2023, +$16,900 −$30,000 in 2024. These should not be reported as new errors. The low-confidence parish receipt is not an assumed $7,500 correction: the packet includes a later client confirmation of $1,500, which should be reviewed as evidence at the appropriate point in season replay.
