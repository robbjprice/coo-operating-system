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
- Maintain a source of truth for the FedEMR product, market messaging, evidence, presentations, use cases, and claims

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
- Version 0.5 operating-data collections
- People and Organizations MVP interface
- Grouped navigation foundation
- Data classification fields
- Non-destructive IndexedDB migration from version 1 to version 2

The next major objective is to complete Version 0.5 with the new Product and Market Intelligence pillar.

---

# Version 0.5 Objective

Version 0.5 establishes the working foundation for:

- Executive Intelligence
- People and Organizations
- Product and Market Intelligence
- Funding Intelligence
- Institutional Pathways
- Resource and Execution Planning
- Data classification
- Explainable scoring
- Evidence-backed product claims
- Audience-specific content
- Presentation management
- Use-case and case-study management
- Future model-agnostic AI integration

Version 0.5 is a foundation release.

It does not need to complete every advanced feature.

The priority is to create a stable, connected, and extensible architecture without breaking the existing application.

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
- Preserve unknown fields
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
- Confidential product vulnerabilities
- Unpublished case-study results
- Confidential presentations
- Restricted customer claims

## 5. Product claims must remain controlled

The application must distinguish between:

- Available capabilities
- Planned capabilities
- Experimental capabilities
- Research-only capabilities
- Commercially supported capabilities
- Demonstrated results
- Published results
- Internal measurements
- Hypothetical examples
- Composite examples
- Completed real-world case studies

The system must never present planned or hypothetical information as proven commercial performance.

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

- Seven product pillars documented
- Operating data domains documented
- Product and Market data domains documented
- Security model documented
- Funding Intelligence documented
- People and Relationships documented
- Product Versions documented
- Product Capabilities documented
- Audience Content documented
- Presentations documented
- Use Cases documented
- Case Studies documented
- Approved Claims documented
- Institutional Pathways documented
- Resource Planning documented
- AI boundaries documented
- Build order documented

## Acceptance Criteria

- Documentation is committed
- Product and Market pillar is included
- No application code is unintentionally changed
- The app still works
- The branch remains clean after commit

## Recommended Commit Message

```text
Expand Version 0.5 Product and Market blueprint
```

---

# Milestone 2: Operating Data Model Foundation

## Status

Complete

## Goals

Extend the existing data model to support the Version 0.5 operating domains.

## Added Collections

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

## Technical Work Completed

### `sample-data.js`

- Extended the collections list
- Added fictional sample organizations
- Added fictional sample people
- Added fictional sample funding opportunities
- Added initial institutional pathways
- Added initial work packages
- Added resource requirements
- Avoided private or real confidential data

### `storage.js`

- Increased IndexedDB version from 1 to 2
- Added missing object stores
- Preserved existing stores
- Preserved existing data
- Seeded newly created stores
- Added blocked-upgrade warning
- Added database information support

## Acceptance Criteria

- Existing records remain intact
- New collections exist
- Clean installs work
- Navigation works
- Imports and exports work
- No console errors
- No data loss

## Commit

```text
Add Version 0.5 data model foundation
```

---

# Milestone 3: People and Organizations MVP

## Status

In Progress

## Goals

Create a central system for external people and organizations.

## People Features

- Add person
- Edit person
- Search people
- Link to organization
- Store relationship types
- Store focus areas
- Store expertise areas
- Track next follow-up
- Assign internal relationship owner
- Store confidentiality classification
- Display relationship strength
- Display influence level
- Display decision authority

## Organization Features

- Add organization
- Edit organization
- Search organizations
- Store organization type
- Store sector
- Store country
- Store website
- Link people
- Display linked people
- Store confidentiality classification

## Completed UI Work

- Grouped sidebar navigation
- Relationships section
- People page
- Organizations page
- Specialized person forms
- Specialized organization forms
- Directory cards
- Organization-linked people display
- Two-column form layout
- Relationship tags and metadata
- Generic record preservation in `app.js`

## Remaining Work

- Confirm final CSS styling
- Complete regression testing
- Verify person editing
- Verify organization editing
- Verify search
- Verify Quick Add behavior
- Confirm no console errors
- Commit and sync

## Future Enhancements

- Archive instead of delete
- Duplicate detection
- Interaction history
- Follow-up queue
- Relationship timeline
- Contextual role links
- Person-to-presentation links
- Product-feedback tracking

## Acceptance Criteria

- People can be created and edited
- Organizations can be created and edited
- People link to organizations
- Linked people appear on organization cards
- Search works
- Existing modules still work
- No console errors

## Recommended Commit Message

```text
Add People and Organizations MVP
```

---

# Milestone 4: Product and Market Data Foundation

## Status

Not Started

## Goals

Extend the IndexedDB schema to support the Product and Market Intelligence pillar.

## New Collections

- `products`
- `productVersions`
- `productCapabilities`
- `audiences`
- `contentAssets`
- `presentations`
- `useCases`
- `caseStudies`
- `approvedClaims`

## Technical Work

### `sample-data.js`

- Add the nine Product and Market collections
- Add one approved high-level FedEMR product record
- Add a generalized current product version
- Add a planned FedEMR V2 record
- Add generalized product capabilities
- Add initial audience profiles
- Add safe sample content assets
- Add safe sample presentations
- Add generalized use cases
- Add hypothetical or composite case-study examples
- Add draft sample claims
- Avoid confidential or unpublished information

### `storage.js`

- Increase IndexedDB version from 2 to 3
- Add the nine new object stores
- Preserve every existing object store
- Preserve every existing record
- Seed only newly created stores
- Retain blocked-upgrade handling
- Preserve legacy import support

### Import and Export

- Include all Product and Market collections
- Preserve schema version
- Preserve application version
- Add missing collections as empty arrays
- Preserve unknown fields
- Validate malformed imports
- Warn before destructive import behavior

## Testing

- Close duplicate application tabs before upgrade
- Test migration using the existing populated browser database
- Confirm People and Organizations survive
- Confirm existing tasks and risks survive
- Confirm new Product and Market stores contain sample records
- Test clean installation
- Test JSON export
- Test JSON import
- Check console for errors

## Acceptance Criteria

- IndexedDB upgrades to version 3
- Existing records survive
- Nine new stores exist
- Safe sample records are added
- Import and export work
- No console errors
- No confidential sample data is committed

## Recommended Commit Message

```text
Add Product and Market data foundation
```

---

# Milestone 5: Product Overview MVP

## Status

Not Started

## Goals

Create a single source of truth for the FedEMR product.

## Product Overview Fields

- Product name
- Short name
- Product category
- Product type
- Summary
- Description
- Current value proposition
- Commercial positioning
- Research positioning
- Primary markets
- Primary users
- Current maturity
- Current TRL
- Deployment model
- Privacy model
- Data-handling summary
- Differentiators
- Known limitations
- Supported environments
- Product owner
- Technical owner
- Commercial owner
- Current product version
- Next product version

## UI Requirements

- Product Overview page
- Current-version card
- Next-version card
- Product positioning section
- Deployment and privacy summary
- Differentiator list
- Known-limitations list
- Product owners
- Linked roadmap items
- Linked risks
- Linked work packages
- Linked funding opportunities

## Acceptance Criteria

- Product overview loads
- Product record can be edited
- Current version is visible
- Next version is visible
- Product description and positioning persist
- Privacy and deployment information persist
- No console errors

## Recommended Commit Message

```text
Add Product Overview MVP
```

---

# Milestone 6: Product Versions and Releases MVP

## Status

Not Started

## Goals

Track what version of FedEMR exists today, what is being built next, and what must happen before release.

## Version Fields

- Version name
- Version number
- Release type
- Status
- Planned release date
- Actual release date
- Release objective
- Product environment
- Improvements over the previous version
- Capabilities included
- Known limitations
- Technical dependencies
- Security changes
- Privacy changes
- Deployment changes
- Integration changes
- User-experience changes
- Customer requests addressed
- Research requests addressed
- Technical debt addressed
- Documentation status
- Training status
- Support readiness
- Commercial readiness
- Deployment readiness
- Product Readiness score
- Release blockers
- Release risks
- Decisions required

## Version Statuses

- Concept
- Planned
- In Development
- Testing
- Pilot
- Released
- Supported
- Maintenance
- Retired

## UI Requirements

- Version list
- Current-version badge
- Next-version badge
- Add version
- Edit version
- Release timeline
- Improvements section
- Release-blocker section
- Readiness section
- Linked capabilities
- Linked risks
- Linked work packages
- Linked funding opportunities
- Linked roadmap items

## Dashboard Widgets

- Current product version
- Next planned release
- Days until planned release
- Release blockers
- Product Readiness
- Critical version risks

## Acceptance Criteria

- Versions can be created and edited
- Current and next versions are visible
- Improvements persist
- Release blockers persist
- Known limitations persist
- Version status is visible
- Product Readiness data is visible
- No console errors

## Recommended Commit Message

```text
Add Product Versions and Releases MVP
```

---

# Milestone 7: Product Capabilities MVP

## Status

Not Started

## Goals

Create a structured source of truth for what FedEMR can do.

## Initial Capability Areas

- Federated model training
- Federated analytics
- Multi-site orchestration
- Local data control
- No patient-level data transfer
- Zero-code workflows
- Site onboarding
- Model development
- Model validation
- External validation
- Model deployment
- Model monitoring
- Cohort discovery
- Cohort selection
- Common data model support
- Auditability
- Reproducible workflows
- Privacy-preserving computation
- Cross-platform deployment
- Research collaboration support
- Pharmaceutical research support

## Capability Fields

- Name
- Category
- Description
- Technical description
- User description
- Availability status
- Research-only status
- Commercial support status
- Experimental status
- First available version
- Supported versions
- Planned versions
- Required infrastructure
- Dependencies
- Supported environments
- Known limitations
- Security considerations
- Privacy considerations
- Evidence status
- Demonstration status
- Validation status
- Customer value
- Research value
- Technical value
- Operational value

## Capability Statuses

- Available
- In Development
- Planned
- Experimental
- Research-Only
- Pilot-Only
- Commercially Supported
- Deprecated

## UI Requirements

- Capability catalogue
- Status filters
- Category filters
- Research-only badge
- Commercial support badge
- Experimental badge
- Version links
- Limitation display
- Evidence status
- Linked use cases
- Linked claims

## Acceptance Criteria

- Capabilities can be created and edited
- Statuses are clear
- Planned capabilities are not shown as available
- Research-only capabilities are clearly labelled
- Commercially supported capabilities are clearly labelled
- Version links work
- No console errors

## Recommended Commit Message

```text
Add Product Capabilities MVP
```

---

# Milestone 8: Audience Intelligence Foundation

## Status

Not Started

## Goals

Create reusable audience profiles that guide how FedEMR is explained and presented.

## Initial Audiences

- Clinical physicians
- Researchers
- Data scientists
- Health-system executives
- Government and policymakers
- Privacy teams
- Legal teams
- Information security teams
- Procurement teams
- Pharmaceutical companies
- Medical device companies
- Hospitals and health systems
- Universities
- Research networks
- Funders
- Investors
- Patients and the public
- Technical implementation teams
- Potential partners
- Students and trainees
- Media and communications teams

## Audience Fields

- Audience name
- Audience type
- Description
- Knowledge level
- Primary goals
- Primary concerns
- Common objections
- Common questions
- Preferred terminology
- Terms to avoid
- Desired technical depth
- Preferred evidence
- Typical call to action
- Privacy concerns
- Security concerns
- Clinical concerns
- Research concerns
- Commercial concerns
- Procurement concerns
- Decision criteria
- Success measures

## UI Requirements

- Audience directory
- Add audience
- Edit audience
- Audience cards
- Technical-depth badge
- Concern list
- Objection list
- Preferred-terminology list
- Linked content
- Linked presentations
- Linked use cases
- Linked claims

## Acceptance Criteria

- Audiences can be created and edited
- Audience concerns persist
- Preferred terminology persists
- Technical depth persists
- Linked content and presentations are visible
- No console errors

## Recommended Commit Message

```text
Add Audience Intelligence foundation
```

---

# Milestone 9: Audience Content Library

## Status

Not Started

## Goals

Store reusable content tailored to specific audiences.

## Content Types

- Product explanation
- Elevator pitch
- One-minute pitch
- Three-minute pitch
- Problem statement
- Value proposition
- Website copy
- Brochure copy
- Grant language
- Proposal language
- Government briefing language
- Clinical explanation
- Research explanation
- Technical explanation
- Privacy explanation
- Security explanation
- Procurement explanation
- FAQ
- Objection response
- Email language
- Social media copy
- Speaker notes
- Demo script
- Training content
- Executive summary
- Partner brief
- Product-release summary

## Core Fields

- Title
- Audience
- Content type
- Purpose
- Product version
- Technical depth
- Core message
- Problem statement
- Product explanation
- Benefits
- Proof points
- Privacy wording
- Security wording
- Objections and responses
- Frequently asked questions
- Call to action
- Body content
- Short version
- Long version
- Draft status
- Approval status
- Owner
- Reviewers
- Approved by
- Last reviewed date
- Next review date
- Approved claims
- Evidence
- Confidentiality

## UI Requirements

- Content library
- Audience filter
- Content-type filter
- Product-version filter
- Draft-status filter
- Approval-status filter
- Full content editor
- Short and long variants
- Review-date warning
- Approved-claim links
- Evidence links

## Acceptance Criteria

- Content assets can be created and edited
- Audience links work
- Product-version links work
- Approval status persists
- Review dates persist
- Approved claims and evidence can be linked
- No console errors

## Recommended Commit Message

```text
Add Audience Content library
```

---

# Milestone 10: Presentation Library

## Status

Not Started

## Goals

Store presentations by audience, purpose, product version, and use rather than treating decks as isolated files.

## Presentation Types

- One-minute pitch
- Three-minute pitch
- Government briefing
- Funder pitch
- Investor pitch
- Research collaboration deck
- Hospital executive presentation
- Clinical physician presentation
- Technical architecture presentation
- Privacy presentation
- Security presentation
- Procurement presentation
- Pharmaceutical use-case deck
- Conference presentation
- Conference poster
- Partner onboarding deck
- Product demonstration
- Training presentation
- Board presentation
- Product-release briefing

## Core Fields

- Title
- Presentation type
- Purpose
- Primary audience
- Additional audiences
- Product version
- Duration
- Format
- Status
- Approval status
- File reference
- Storage location
- Outline
- Core messages
- Speaker notes
- Call to action
- Approved claims
- Evidence
- Use cases
- Case studies
- Content assets
- Product capabilities
- Last presented date
- Presentation history
- Feedback
- Required revisions
- Owner
- Confidentiality

## Presentation Variants

- Government version
- Clinical version
- Researcher version
- Technical version
- Pharmaceutical version
- Funder version
- Five-minute version
- Twenty-minute version
- Public version
- Confidential version

## UI Requirements

- Presentation library
- Add presentation
- Edit presentation
- Audience filter
- Presentation-type filter
- Status filter
- Product-version filter
- Duration display
- File reference
- Presentation history
- Feedback section
- Revision queue
- Linked claims
- Linked evidence
- Linked use cases
- Linked case studies

## Acceptance Criteria

- Presentations can be created and edited
- File references persist
- Audience and product-version links work
- Claims and evidence can be linked
- Presentation history persists
- Required revisions are visible
- No console errors

## Recommended Commit Message

```text
Add Presentation Library MVP
```

---

# Milestone 11: Use Cases MVP

## Status

Not Started

## Goals

Create a structured library of ways FedEMR can be used in different environments and for different purposes.

## Initial Use Cases

- Multi-site clinical prediction model development
- Federated model validation
- External validation across hospitals
- Federated model deployment
- Distributed cohort discovery
- Distributed cohort selection
- Clinical trial feasibility
- Real-world evidence analysis
- Precision medicine
- Sepsis prediction
- Diabetes risk prediction
- Cardiometabolic disease modelling
- Heart-attack risk prediction
- Rare-disease research
- Health-system capacity forecasting
- Treatment-response modelling
- Medical imaging model development
- Algorithmic fairness assessment
- Cross-jurisdiction research
- Privacy-preserving quality improvement
- Model monitoring across institutions
- Local model adaptation
- Federated statistical analysis
- Pharmaceutical evidence generation
- Multi-site research collaboration

## Core Fields

- Title
- Category
- Environment
- Primary user
- Audience
- Problem
- Current workflow
- FedEMR workflow
- Data sources
- Participating-site profile
- Model or analysis type
- Privacy constraints
- Security constraints
- Regulatory constraints
- Deployment model
- Expected outcome
- Economic value
- Clinical value
- Research value
- Operational value
- Technical value
- Technical requirements
- Required capabilities
- Required product versions
- Known limitations
- Dependencies
- Assumptions
- Unknowns
- Evidence status
- Readiness level
- Status
- Confidentiality

## Use-Case Statuses

- Idea
- Hypothetical
- Designed
- Demonstrated
- Validated
- Active
- Completed
- Commercially Available
- Archived

## UI Requirements

- Use-case library
- Category filter
- Environment filter
- Status filter
- Readiness filter
- Hypothetical badge
- Demonstrated badge
- Validated badge
- Commercially available badge
- Required-capabilities section
- Product-version section
- Value summary
- Limitations
- Evidence status

## Acceptance Criteria

- Use cases can be created and edited
- Statuses are clearly labelled
- Hypothetical use cases are visibly distinct
- Capabilities and versions can be linked
- Benefits and limitations persist
- No console errors

## Recommended Commit Message

```text
Add Use Cases MVP
```

---

# Milestone 12: Case Studies MVP

## Status

Not Started

## Goals

Store real, active, demonstrated, hypothetical, and composite FedEMR examples with clear truth controls.

## Case-Study Classifications

- Completed Real-World Case Study
- Active Implementation
- Research Demonstration
- Technical Validation
- Hypothetical Example
- Composite Example

## Publication Statuses

- Private
- Internal
- Draft for Review
- Approved for Limited Use
- Approved for Public Use
- Published
- Retired

## Core Fields

- Title
- Classification
- Publication status
- Situation
- Challenge
- Environment
- Participating organizations
- Centralized-analysis barrier
- FedEMR approach
- Product version
- Capabilities used
- Implementation steps
- Duration
- Results
- Model performance
- Operational benefit
- Clinical benefit
- Research benefit
- Economic benefit
- Privacy outcome
- Security outcome
- Lessons learned
- Testimonial
- Evidence documents
- Approved claims
- Confidentiality restrictions
- Permission status
- External-use permission
- Review date

## UI Requirements

- Case-study library
- Classification filter
- Publication-status filter
- Public-use badge
- Confidentiality badge
- Hypothetical badge
- Composite badge
- Real-world badge
- Evidence section
- Permissions section
- Linked use cases
- Linked presentations
- Linked claims

## Acceptance Criteria

- Case studies can be created and edited
- Classification is always visible
- Hypothetical and composite examples cannot be confused with real deployments
- External-use permission is visible
- Evidence and claims can be linked
- No console errors

## Recommended Commit Message

```text
Add Case Studies MVP
```

---

# Milestone 13: Approved Claims Library

## Status

Not Started

## Goals

Create an evidence-linked claims library for external and internal communication.

## Claim Categories

- Product capability
- Privacy
- Security
- Performance
- Efficiency
- Research value
- Clinical value
- Commercial value
- Deployment
- Integration
- Time savings
- Cost savings
- Scalability
- Differentiation
- Compliance
- Evidence statement

## Claim Statuses

- Draft
- Under Review
- Approved
- Approved with Qualification
- Internal Only
- Rejected
- Retired
- Needs Reverification

## Core Fields

- Claim text
- Short claim
- Claim category
- Audience
- Product version
- Product capability
- Evidence
- Evidence strength
- Evidence summary
- Approval status
- Approved by
- Approval date
- Review date
- Expiry date
- Permitted contexts
- Prohibited contexts
- Required qualifier
- Usage notes
- Public-use permission
- Confidentiality

## UI Requirements

- Claims library
- Approval-status filter
- Audience filter
- Product-version filter
- Capability filter
- Evidence-strength badge
- Review-date warning
- Expired-claim warning
- Required-qualifier display
- Permitted-context display
- Prohibited-context display

## Acceptance Criteria

- Claims can be created and edited
- Evidence can be linked
- Approval status is visible
- Required qualifiers are visible
- Expired or unverified claims are clearly flagged
- Public-use permission is visible
- No console errors

## Recommended Commit Message

```text
Add Approved Claims library
```

---

# Milestone 14: Funding Intelligence MVP

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
- Product versions supported
- Product capabilities supported
- Use cases supported
- Work packages funded

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
- Product alignment
- Use-case alignment
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
- Product releases requiring funding

## Acceptance Criteria

- Opportunities can be created and edited
- Fit scores calculate correctly
- Score components are visible
- Verification metadata is visible
- Contacts link to People
- Funders link to Organizations
- Product versions and capabilities can be linked
- Deadlines appear correctly
- No console errors

## Recommended Commit Message

```text
Add Funding Intelligence MVP
```

---

# Milestone 15: Funding Applications Workspace

## Status

Not Started

## Goals

Create a workspace for opportunities that move into active application development.

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
- Link product versions
- Link product capabilities
- Link use cases
- Link case studies
- Link presentations
- Link approved claims

## Drafting Areas

- Executive summary
- Problem statement
- Proposed solution
- Commercialization plan
- Research plan
- Product-development plan
- Work plan
- Impact statement
- ROI statement
- Budget justification

## Acceptance Criteria

- Application can be created from an opportunity
- Required sections are visible
- Contributors can be linked
- Product and use-case links work
- Approval requirements can be tracked
- Budget fields work
- Status changes work
- No console errors

## Recommended Commit Message

```text
Add Funding Applications workspace
```

---

# Milestone 16: Executive Intelligence Upgrade

## Status

Not Started

## Goals

Transform the dashboard from a reporting page into an executive decision-support system.

## Executive Brief

The brief should summarize:

- Company Health
- Product Readiness
- Current product version
- Next product release
- Largest blocker
- Highest-priority task
- Best funding match
- Highest-value active opportunity
- Critical risk
- People requiring follow-up
- External dependencies
- Upcoming milestone
- Release blocker
- Capability gap
- Resource gap
- Funding gap
- Presentation requiring update
- Claim requiring verification

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
- Current product version
- Next release
- Product Readiness
- Release blockers
- Capability gaps
- Content needing review
- Presentations needing updates
- Claims needing reverification
- Recent activity

## Acceptance Criteria

- Executive Brief uses real data
- No hard-coded status claims
- Product status appears
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

# Milestone 17: Institutional Pathways Foundation

## Status

Not Started

## Goals

Create the reusable Institutional Pathways Navigator.

## Initial Pathways

1. Conflict-of-interest review
2. University/company commercial boundary
3. Legal or shareholder agreement review
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
- Linked product versions
- Linked product capabilities

## Active Cases

Create one initial case:

```text
FedEMR University and Company Commercial Boundary
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
- Product links work
- Verification metadata is visible
- No console errors

## Recommended Commit Message

```text
Add Institutional Pathways foundation
```

---

# Milestone 18: Work Packages and Resource Planning

## Status

Not Started

## Goals

Determine what is required to complete grouped business, product, content, funding, and deployment outcomes.

## Initial Work Packages

1. Cybersecurity and procurement package
2. First-customer deployment readiness
3. Funding application development
4. University/company legal clarification
5. Commercial pricing package
6. ROI evidence package
7. Product release preparation
8. Clinical audience content package
9. Government presentation package
10. Case-study development

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
- Linked product versions
- Linked capabilities
- Linked audiences
- Linked content
- Linked presentations
- Linked use cases
- Linked case studies

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
- Product and content links work
- Funding opportunities can link to work packages
- No console errors

## Recommended Commit Message

```text
Add Resource Planning foundation
```

---

# Milestone 19: Documents, Evidence, and Decisions

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
- Product specifications
- Release notes
- Training materials
- Case-study sources
- Claims evidence

## Evidence

Track evidence supporting:

- Claims
- Scores
- Pathways
- Funding eligibility
- Customer value
- Product capabilities
- Product performance
- Case-study results
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
- Product impact
- Release impact
- Market impact

## Acceptance Criteria

- Documents can be linked
- Evidence can support claims and product records
- Decisions can be created and resolved
- Decision history remains visible
- No console errors

## Recommended Commit Message

```text
Add Documents Evidence and Decisions
```

---

# Milestone 20: Security and Privacy Foundation

## Status

Not Started

## Goals

Apply privacy, security, and claims controls across the application.

## Required Controls

- Data classification field
- Public
- Internal
- Confidential
- Restricted
- Visible classification badges
- Export warnings
- Restricted-data warnings
- Claims approval status
- Hypothetical-example labels
- Composite-example labels
- Research-only labels
- Planned-capability labels
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
- Approval workflows
- Claims-governance workflow
- External-publication controls

## Acceptance Criteria

- Records can be classified
- Restricted records are visibly marked
- Hypothetical and composite records are visibly marked
- Planned capabilities are visibly marked
- Claims approval status is visible
- Exports preserve classification
- No secrets are committed
- No console errors

## Recommended Commit Message

```text
Add data classification and claims controls
```

---

# Milestone 21: Version 0.5 Acceptance Testing

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
- Product Overview
- Product Versions
- Product Capabilities
- Audiences
- Audience Content
- Presentations
- Use Cases
- Case Studies
- Approved Claims
- Funding Opportunities
- Funding Applications
- Institutional Pathways
- Work Packages
- Documents
- Evidence
- Decisions
- Import
- Export
- IndexedDB version 2 migration
- IndexedDB version 3 migration
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
- Planned capabilities remain clearly labelled
- Hypothetical examples remain clearly labelled
- Claims retain evidence links
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

# Milestone 22: Merge Version 0.5

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
6. Review sample product data for unpublished or sensitive information.
7. Review sample claims for unsupported statements.
8. Update `CHANGELOG.md`.
9. Update `NEXT_STEPS.md`.
10. Push the branch.
11. Merge into `main`.
12. Confirm GitHub Pages deployment.
13. Test the deployed application.
14. Create a stable tag.

## Suggested Tag

```text
v0.5
```

## Acceptance Criteria

- `main` contains the tested release
- GitHub Pages deploys successfully
- Deployed app works
- No confidential information is exposed
- Unsupported claims are not exposed
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
- Product-feedback history
- Presentation history
- Cross-module relationship view

---

# Version 0.7: Product and Market Intelligence

Planned capabilities:

- Product-release timeline
- Capability dependency mapping
- Product-gap analysis
- Customer-request prioritization
- Audience messaging comparison
- Content reuse engine
- Presentation-variant generation
- Case-study maturity tracking
- Claims approval workflow
- Market-segment analysis
- Competitive positioning
- Product evidence map

---

# Version 0.8: Knowledge Graph

Planned capabilities:

- Visual relationship graph
- Record-to-record links
- Customer ecosystem view
- Funding ecosystem view
- Institutional pathway graph
- Product capability graph
- Product-version dependency graph
- Audience-to-content graph
- Claim-to-evidence graph
- Use-case-to-case-study graph
- Impact propagation
- Dependency visualization
- Orphaned record detection
- Broken-link detection

---

# Version 0.9: Advanced Executive Intelligence

Planned capabilities:

- Score history
- Trend analysis
- Weekly comparison
- Monthly comparison
- Forecasting
- Scenario planning
- Revenue unlock analysis
- Product-release forecasting
- Capability-gap forecasting
- Content-readiness scoring
- Claims-risk analysis
- Capacity planning
- Funding runway
- Resource bottlenecks
- Decision recommendations

---

# Version 1.0: Secure AI Foundation

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
- Product-version validation
- Capability-status validation
- Claims validation
- Audience controls
- Confidentiality controls

This version must not include unrestricted desktop access.

---

# Version 1.1: AI-Assisted COO Operating System

Planned capabilities:

- Daily Executive Brief
- Funding discovery
- Funding validation
- Institutional pathway guidance
- Resource estimation
- Cost estimation
- Product-gap analysis
- Release-readiness analysis
- Audience-content drafting
- Grant drafting
- Pitch drafting
- Presentation generation
- Case-study drafting
- Use-case development
- Claims verification support
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