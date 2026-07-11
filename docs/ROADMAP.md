# FedEMR COO Operating System Roadmap

## Purpose

This roadmap defines the staged development plan for the FedEMR COO Operating System.

The roadmap is designed to:

- Preserve a working application at every milestone
- Build the correct architecture before adding advanced automation
- Prioritize the features with the greatest operational value to FedEMR
- Protect confidential data
- Maintain clean Git history
- Avoid destructive database changes
- Support future secure AI integration

The project should be developed incrementally.

Every milestone must be tested before the next one begins.

---

# Current Product Position

The application already includes:

- Executive dashboard
- Commercial readiness
- Government readiness
- Tasks
- Customers and opportunities
- Meetings
- Advisor recommendations
- Risks
- Funding needs
- Roadmap
- Global search
- Universal Quick Add
- JSON import and export
- IndexedDB persistence
- Sample FedEMR data
- Readiness scoring
- Pipeline scoring
- Risk scoring
- Activity logging
- Modular JavaScript architecture
- GitHub Pages deployment

The next major objective is Version 0.5.

---

# Version 0.5 Objective

Version 0.5 establishes the working foundation for:

- Executive Intelligence
- People and Organizations
- Funding Intelligence
- Institutional Pathways
- Resource and Execution Planning
- Data classification
- Explainable scoring
- Future model-agnostic AI integration

Version 0.5 is a foundation release.

It does not need to complete every advanced feature.

The priority is to create a stable and extensible architecture without breaking the existing application.

---

# Version 0.5 Development Principles

## 1. Protect the working app

Before each major change:

- Confirm the dashboard loads
- Confirm navigation works
- Check the browser console
- Export a JSON backup
- Confirm Git status
- Work on the `v0.5-foundation` branch
- Commit only working milestones

## 2. One complete change at a time

Preferred implementation methods:

- Full-file replacement
- Complete function replacement
- Controlled patch
- One file at a time
- Immediate testing

## 3. No destructive migrations

Database changes must:

- Preserve existing records
- Add new object stores only
- Preserve record IDs
- Support legacy imports where practical
- Be tested with populated and clean databases

## 4. No confidential repository data

The public repository must not contain:

- Private contact details
- Detailed financials
- Customer-identifying information
- Legal advice
- API keys
- Passwords
- Cap tables
- Sensitive agreements
- Unreleased IP information

---

# Milestone 0: Baseline Protection

## Status

Complete

## Goals

- Verify the current app works
- Check for browser console errors
- Commit a stable checkpoint
- Create the Version 0.5 branch
- Publish the branch to GitHub

## Completion Criteria

- Dashboard loads
- Navigation works
- Search works
- Quick Add works
- Export works
- No red console errors
- Stable checkpoint committed
- `v0.5-foundation` branch published

---

# Milestone 1: Product Blueprint

## Status

In Progress

## Goals

Create the repository documentation required to guide Version 0.5.

## Required Documents

- `MASTER_SPEC.md`
- `DATA_MODEL.md`
- `DECISIONS.md`
- `ROADMAP.md`
- `ARCHITECTURE.md`
- `UI_GUIDELINES.md`
- `CODING_STANDARDS.md`
- `CHANGELOG.md`
- `NEXT_STEPS.md`

## Key Outcomes

- Product pillars documented
- Data domains documented
- Security model documented
- Funding Intelligence documented
- People and Relationships documented
- Institutional Pathways documented
- Resource Planning documented
- AI boundaries documented
- Build order documented

## Acceptance Criteria

- Documentation is committed
- No application code changed
- The app still works
- The branch remains clean after commit

## Recommended Commit Message

```text
Define Version 0.5 product blueprint
```

---

# Milestone 2: Data Model Foundation

## Status

Not Started

## Goals

Extend the existing data model to support the Version 0.5 domains.

## New Collections

- `people`
- `organizations`
- `relationships`
- `interactions`
- `followUps`
- `fundingOpportunities`
- `fundingApplications`
- `institutionalPathways`
- `pathwaySteps`
- `pathwayCases`
- `workPackages`
- `resourceRequirements`
- `documents`
- `evidence`
- `decisions`

## Technical Work

### `sample-data.js`

- Extend the collections list
- Add fictional sample organizations
- Add fictional sample people
- Add fictional sample funding opportunities
- Add initial institutional pathways
- Add initial work packages
- Add resource requirements
- Avoid private or real confidential data

### `storage.js`

- Increase IndexedDB version
- Add missing object stores
- Preserve existing stores
- Preserve existing data
- Confirm migration behavior
- Confirm clean-install behavior

### Import and Export

- Add schema version
- Add application version
- Add export timestamp
- Add missing collections as empty arrays
- Preserve existing IDs
- Validate imports

## Testing

- Test existing populated browser database
- Test fresh browser profile
- Test JSON export
- Test JSON import
- Test old export compatibility
- Check console for errors

## Acceptance Criteria

- Existing records remain intact
- New collections exist
- Clean installs work
- Imports and exports work
- No console errors
- No data loss

## Recommended Commit Message

```text
Add Version 0.5 data foundations
```

---

# Milestone 3: People and Organizations MVP

## Status

Not Started

## Goals

Create a central system for external people and organizations.

## People Features

- Add person
- Edit person
- Archive person
- Search people
- Link to organization
- Store relationship types
- Store focus areas
- Store expertise areas
- Track last interaction
- Track next follow-up
- Assign internal relationship owner
- Store confidentiality classification
- Warn about likely duplicates

## Organization Features

- Add organization
- Edit organization
- Search organizations
- Store organization type
- Store sector
- Store parent organization
- Store website
- Link people
- Link funding opportunities
- Link customer opportunities
- Link institutional pathways

## Duplicate Detection

Primary checks:

- Email
- LinkedIn URL
- Phone number
- Name plus organization

Potential duplicates must be flagged for review.

They must not be merged automatically.

## Cross-Module Rules

A person added from another module must:

1. Match an existing person when possible
2. Create a new central person only when needed
3. Link to the relevant record by ID
4. Preserve one source of truth for contact information

## Acceptance Criteria

- People can be created and edited
- Organizations can be created and edited
- People link to organizations
- Search works
- Duplicate warnings work
- Existing modules still work
- No console errors

## Recommended Commit Message

```text
Add People and Organizations MVP
```

---

# Milestone 4: Funding Intelligence MVP

## Status

Not Started

## Goals

Create a complete workflow for discovering, validating, scoring, and managing funding opportunities.

## Funding Opportunity Stages

- Discovered
- Validate
- Pursue
- Developing
- Internal Review
- Submitted
- Awarded
- Declined
- Watch
- Rejected

## Funding Pathways

- Commercial
- Research
- Hybrid

## Core Fields

- Program name
- Funder organization
- Program contact
- Pathway
- Status
- Amount
- Currency
- Deadline
- Internal deadline
- Repayable status
- Matching requirement
- Eligibility summary
- TRL requirements
- Geographic restrictions
- Required partners
- Required approvals
- Required documents
- Eligible expenses
- Ineligible expenses
- Strategic purpose
- Application effort
- Probability of success
- Source URLs
- Verification status
- Last verified date
- Confidence
- Unknowns
- Eligibility risks

## Fit Scoring

Initial weighting:

- Eligibility: 25%
- Strategic alignment: 20%
- Impact: 15%
- Funding amount versus effort: 15%
- Probability of success: 10%
- Timing: 10%
- Partner readiness: 5%

## UI Requirements

- Funding opportunity list
- Add opportunity
- Edit opportunity
- Status filter
- Pathway filter
- Deadline view
- Fit score
- Component scores
- Verification badge
- Source link
- Unknowns
- Risks
- Decision status

## Dashboard Widgets

- Best funding matches
- Deadlines in 30 days
- Applications in progress
- Missing requirements
- Total requested funding
- Probability-weighted funding pipeline
- Commercial versus research mix
- Unfunded work packages

## Acceptance Criteria

- Opportunities can be created and edited
- Fit scores calculate correctly
- Score components are visible
- Verification metadata is visible
- Contacts link to People
- Funders link to Organizations
- Deadlines appear correctly
- No console errors

## Recommended Commit Message

```text
Add Funding Intelligence MVP
```

---

# Milestone 5: Funding Applications Workspace

## Status

Not Started

## Goals

Create a workspace for selected opportunities that move into active application development.

## Application Stages

- Planning
- Drafting
- Waiting on Information
- Internal Review
- Institutional Review
- Partner Review
- Ready to Submit
- Submitted
- Awarded
- Declined
- Withdrawn

## Core Capabilities

- Create application from funding opportunity
- Link lead organization
- Link partners
- Assign lead person
- Assign contributors
- Track requested amount
- Track total budget
- Track matching amount
- Track internal deadline
- Track funder deadline
- Track required sections
- Track required documents
- Track approvals
- Track comments
- Track submission confirmation
- Track outcome

## Drafting Areas

- Executive summary
- Problem statement
- Proposed solution
- Commercialization plan
- Research plan
- Work plan
- Impact statement
- ROI statement
- Budget justification

## Acceptance Criteria

- Application can be created from an opportunity
- Required sections are visible
- Contributors can be linked
- Approval requirements can be tracked
- Budget fields work
- Status changes work
- No console errors

## Recommended Commit Message

```text
Add Funding Applications workspace
```

---

# Milestone 6: Executive Intelligence Upgrade

## Status

Not Started

## Goals

Transform the dashboard from a reporting page into an executive decision-support system.

## Executive Brief

The brief should summarize:

- Company Health
- Largest blocker
- Highest-priority task
- Best funding match
- Highest-value active opportunity
- Critical risk
- People requiring follow-up
- External dependencies
- Upcoming milestone
- Resource gap
- Funding gap

## Decision Queue

Each decision should display:

- Decision required
- Why it matters
- Required-by date
- Options
- Recommendation
- Impact
- Risks
- Evidence

## Additional Widgets

- Best funding matches
- Funding deadlines
- People requiring follow-up
- Decisions required
- Waiting on external parties
- Unfunded work packages
- Resource capacity
- Student-suitable work
- Institutional blockers
- Recent activity

## Future Widget Capabilities

- Movable widgets
- Resizable widgets
- Saved layouts
- Role-specific dashboards
- Trend charts
- Drill-down views

## Acceptance Criteria

- Executive Brief uses real data
- No hard-coded status claims
- Top blockers are explainable
- Funding and people data appear
- Decision queue works
- Existing scorecards still work
- No console errors

## Recommended Commit Message

```text
Add dynamic Executive Intelligence
```

---

# Milestone 7: Institutional Pathways Foundation

## Status

Not Started

## Goals

Create the reusable Institutional Pathways Navigator.

## Initial Pathways

1. Conflict-of-interest review
2. University/company commercial boundary
3. Legal agreement or shareholder agreement review
4. Technology licensing
5. Institutional grant approval
6. Sole-source justification

## Pathway Fields

- Title
- Institution
- Category
- Trigger
- Intended outcome
- Description
- Departments
- Contact roles
- Required documents
- Required approvals
- Decision points
- Dependencies
- Parallel steps
- Common delays
- Escalation routes
- Estimated duration
- Sources
- Last verified date
- Verified by
- Verification status
- Confidence
- Known exceptions
- Open questions

## Active Cases

Create one initial case:

```text
FedEMR University/Company Commercial Boundary
```

## Trust Rules

Every pathway must show:

- Source
- Verification date
- Confidence
- Open questions
- Known exceptions
- Escalation route

## Acceptance Criteria

- Pathways can be created and edited
- Steps can be ordered
- Active cases can be created
- Current step is visible
- Blockers are visible
- Contacts link to People
- Departments link to Organizations
- Verification metadata is visible
- No console errors

## Recommended Commit Message

```text
Add Institutional Pathways foundation
```

---

# Milestone 8: Work Packages and Resource Planning

## Status

Not Started

## Goals

Determine what is required to complete grouped business outcomes.

## Initial Work Packages

1. Cybersecurity and procurement package
2. First-customer deployment readiness
3. Funding application development
4. University/company legal clarification
5. Commercial pricing package
6. ROI evidence package

## Work Package Fields

- Outcome
- Description
- Pathway
- Status
- Priority
- Owner
- Start date
- Target date
- Internal hours
- External hours
- Duration
- Internal cost
- External cost
- Total cost
- Required roles
- Student-suitable tasks
- Undergraduate suitability
- Graduate-student suitability
- Consultant requirement
- Contractor requirement
- Vendor requirement
- Dependencies
- Approvals
- Funding requirement
- Funding gap
- Confidence

## Resource Requirement Fields

- Requirement type
- Role
- Expertise
- Company or research side
- Resource source
- Student suitability
- Estimated hours
- Hourly rate
- Fixed cost
- Assigned person
- Assigned organization
- Funding requirement
- Potential funding matches
- Confidence
- Status

## Acceptance Criteria

- Work packages can be created
- Resource requirements can be added
- Hours and costs roll up
- Student-suitable work is visible
- Funding gaps are visible
- Funding opportunities can link to work packages
- No console errors

## Recommended Commit Message

```text
Add Resource Planning foundation
```

---

# Milestone 9: Documents, Evidence, and Decisions

## Status

Not Started

## Goals

Create the supporting trust and decision layer.

## Documents

Track:

- Agreements
- Policies
- Funding guidelines
- Grant materials
- Presentations
- Budgets
- Legal documents
- Security documents
- Privacy documents
- Procurement documents
- Research documents
- Reports
- Letters of support

## Evidence

Track evidence supporting:

- Claims
- Scores
- Pathways
- Funding eligibility
- Customer value
- Commercialization statements
- Decisions

## Decisions

Track:

- Decision question
- Owner
- Required-by date
- Options
- Recommendation
- Final decision
- Rationale
- Risks
- Assumptions
- Unknowns
- Evidence

## Acceptance Criteria

- Documents can be linked
- Evidence can support records
- Decisions can be created and resolved
- Decision history remains visible
- No console errors

## Recommended Commit Message

```text
Add Documents Evidence and Decisions
```

---

# Milestone 10: Security and Privacy Foundation

## Status

Not Started

## Goals

Apply privacy and security controls across the application.

## Required Controls

- Data classification field
- Public
- Internal
- Confidential
- Restricted
- Visible classification badges
- Export warnings
- Restricted-data warnings
- Audit logging
- No API keys in browser code
- No private sample data
- No unrestricted computer access
- No automatic external transmission

## Future Production Controls

- Authentication
- Role-based access
- Encryption at rest
- Encryption in transit
- Secure backups
- Tenant isolation
- Secret management
- Data retention
- Audit trails
- Session controls
- Production hosting review

## Acceptance Criteria

- Records can be classified
- Restricted records are visibly marked
- Exports preserve classification
- No secrets are committed
- No console errors

## Recommended Commit Message

```text
Add data classification foundation
```

---

# Milestone 11: Version 0.5 Acceptance Testing

## Status

Not Started

## Full Regression Test

Test:

- Dashboard
- Navigation
- Search
- Quick Add
- Tasks
- Commercial Readiness
- Government Readiness
- Customers
- Meetings
- Advisors
- Risks
- Funding Needs
- Roadmap
- People
- Organizations
- Funding Opportunities
- Funding Applications
- Institutional Pathways
- Work Packages
- Import
- Export
- IndexedDB migration
- Fresh install
- Existing install
- Browser console
- Responsive layout

## Data Integrity Test

Confirm:

- Existing records remain
- New collections exist
- IDs are preserved
- Links work
- No duplicate people are created silently
- Imports do not execute code
- Exports include schema version
- Confidentiality fields persist

## Acceptance Criteria

- No red console errors
- No data loss
- All critical workflows work
- Documentation is updated
- Changelog is complete
- Stable branch is published

## Recommended Commit Message

```text
Complete Version 0.5 acceptance testing
```

---

# Milestone 12: Merge Version 0.5

## Status

Not Started

## Goals

Prepare the stable Version 0.5 branch for merge into `main`.

## Steps

1. Confirm branch is clean.
2. Confirm latest backup exists.
3. Confirm acceptance tests pass.
4. Review commit history.
5. Review public repository for confidential information.
6. Update `CHANGELOG.md`.
7. Update `NEXT_STEPS.md`.
8. Push the branch.
9. Merge into `main`.
10. Confirm GitHub Pages deployment.
11. Test the deployed application.
12. Create a stable tag.

## Suggested Tag

```text
v0.5
```

## Acceptance Criteria

- `main` contains the tested release
- GitHub Pages deploys successfully
- Deployed app works
- No confidential information is exposed
- Version tag is created

---

# Post-Version 0.5 Roadmap

# Version 0.6: Relationship Intelligence

Planned capabilities:

- Full person profiles
- Organization profiles
- Interaction timeline
- Follow-up queue
- Relationship strength
- Introductions
- Relationship ownership
- Contextual assignments
- Duplicate merge workflow
- Cross-module relationship view

---

# Version 0.7: Knowledge Graph

Planned capabilities:

- Visual relationship graph
- Record-to-record links
- Customer ecosystem view
- Funding ecosystem view
- Institutional pathway graph
- Impact propagation
- Dependency visualization
- Orphaned record detection
- Broken-link detection

---

# Version 0.8: Advanced Executive Intelligence

Planned capabilities:

- Score history
- Trend analysis
- Weekly comparison
- Monthly comparison
- Forecasting
- Scenario planning
- Revenue unlock analysis
- Capacity planning
- Funding runway
- Resource bottlenecks
- Decision recommendations

---

# Version 0.9: Secure AI Foundation

Planned capabilities:

- AI provider abstraction
- Policy layer
- Data classification enforcement
- Redaction
- Permission checks
- Approval gates
- Prompt-injection protection
- Public research tools
- Private analysis tools
- Structured outputs
- AI audit log

This version must not include unrestricted desktop access.

---

# Version 1.0: AI-Assisted COO Operating System

Planned capabilities:

- Daily Executive Brief
- Funding discovery
- Funding validation
- Institutional pathway guidance
- Resource estimation
- Cost estimation
- Grant drafting
- Pitch drafting
- Presentation generation
- Budget generation
- Record-update proposals
- Decision support
- Scenario planning
- Approved action execution
- Full audit history

---

# Long-Term Product Vision

The FedEMR COO Operating System may eventually become a commercial platform for:

- Health AI companies
- University spinouts
- Deep-tech startups
- Research commercialization teams
- Technology-transfer offices
- Innovation hubs
- Health-system innovation teams
- Government commercialization programs

FedEMR remains the first and primary use case.

The architecture should preserve future product potential without distracting from FedEMR’s immediate operating needs.

---

# Definition of Done for Any Milestone

A milestone is complete only when:

- The feature works
- The browser console has no new red errors
- Existing data remains intact
- Relevant documentation is updated
- The changelog is updated
- The change is committed
- The branch is pushed
- The acceptance test passes
