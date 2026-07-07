# FedEMR COO Operating System Schema Notes

Version 0.1 uses simple object stores in IndexedDB. Each object store maps to one core module.

## Object stores

- tasks
- readinessItems
- governmentReadinessItems
- customers
- meetings
- advisorRecommendations
- risks
- fundingNeeds
- roadmapItems
- settings
- activityLog

## Shared fields

Most core records include:

```text
id
createdAt
updatedAt
title or name
status
priority
owner
notes
blocked
waitingOn
evidenceLink
reviewCadence
linkedTasks
linkedRisks
linkedCustomers
linkedMeetings
linkedReadinessItems
linkedRoadmapItems
```

## tasks

Tracks immediate execution work.

Additional fields:

```text
category
dueDate
```

## readinessItems

Tracks commercial readiness across legal, corporate, insurance, cybersecurity, privacy, procurement, infrastructure, sales, marketing, operations, finance, hiring, regulatory, and technology.

Additional fields:

```text
category
description
completionPercentage
estimatedCost
dependency
blockingIssue
```

Readiness should answer:

```text
Can we sell?
Can we contract?
Can we deploy?
Can we get paid?
Can we prove ROI?
```

## governmentReadinessItems

Tracks government, health system, university, and research institution readiness.

Additional fields:

```text
organization
category
description
completionPercentage
requiredDocumentation
blockingIssue
```

## customers

Tracks customer and opportunity records.

Additional fields:

```text
organizationName
contactNames
sector
opportunityType
stage
probability
estimatedValue
expectedCloseDate
nextStep
decisionMaker
procurementPath
```

## meetings

Tracks meetings and converts them into action.

Additional fields:

```text
date
attendees
organization
decisions
actionItems
followUpDate
```

## advisorRecommendations

Tracks advisor input as accountable recommendations.

Additional fields:

```text
advisorName
date
recommendation
category
relatedModule
outcome
```

## risks

Tracks serious commercialization risks.

Additional fields:

```text
description
category
probability
impact
severity
mitigationPlan
reviewDate
```

Severity is currently entered manually, but can also be calculated from probability x impact.

## fundingNeeds

Tracks funding tied to specific commercialization blockers.

Additional fields:

```text
fundingNeed
category
amount
purpose
timing
potentialFundingSource
grantMatch
```

## roadmapItems

Tracks milestones.

Additional fields:

```text
milestone
quarter
month
targetDate
dependencies
completionPercentage
```

## activityLog

Tracks major app events.

Fields:

```text
id
createdAt
updatedAt
title
type
notes
```

## Future schema upgrades

Recommended next upgrades:

1. True relationship manager for linked objects.
2. Activity timeline on every record.
3. Saved views and filters.
4. Weekly COO review object.
5. Quarterly planning object.
6. Documents module.
7. Supabase sync adapter.
8. AI intelligence layer.
