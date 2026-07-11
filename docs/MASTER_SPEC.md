# FedEMR COO Operating System Master Specification

## 1. Purpose

The FedEMR COO Operating System is the source of truth for managing the commercialization, institutional navigation, funding, relationships, readiness, delivery, and executive operations of FedEMR Technologies Inc.

The system is not a generic task manager.

It is an executive decision-support and operating platform designed to help FedEMR move from university-developed health AI technology at approximately TRL 7 to repeatable government, research, health-system, and enterprise revenue.

The system should continuously help answer:

> What is preventing the next customer, partner, funder, or institution from moving forward with FedEMR today?

Every workflow, score, recommendation, record, and dashboard should contribute to answering that question.

---

## 2. Product Mission

Build a secure, connected, local-first executive operating system that enables leadership to:

- Understand company status in under 30 seconds.
- Identify the highest-impact next actions.
- Track commercialization and government readiness.
- Navigate University of Calgary processes.
- Discover and manage funding opportunities.
- Manage external relationships.
- Plan the people, time, expertise, and funding required to complete work.
- Connect tasks, meetings, risks, customers, funding, pathways, documents, and decisions.
- Generate clear evidence-backed recommendations.
- Prepare grants, pitches, presentations, budgets, and reports.
- Maintain control over confidential data.

---

## 3. Core Operating Principles

### 3.1 Local-first

The application must remain functional without a permanent cloud connection.

Core records are stored locally during the prototype stage using IndexedDB.

Future secure synchronization may be added, but cloud functionality must not be required for core operation.

### 3.2 Executive-focused

The system should organize information around decisions, blockers, dependencies, opportunities, and outcomes.

It should not force executives to interpret a wall of disconnected task records.

### 3.3 Connected

Every important object should be linkable to other relevant objects.

Examples:

- A funding opportunity links to people, organizations, tasks, budgets, documents, pathways, and work packages.
- A customer opportunity links to meetings, risks, procurement requirements, decision-makers, funding, and deployment work.
- An institutional pathway links to contacts, departments, steps, evidence, cases, and approvals.

### 3.4 Actionable

Every screen should help answer:

- What matters?
- What is blocked?
- What is next?
- Who owns it?
- What does it cost?
- What does it unlock?
- What evidence supports the recommendation?

### 3.5 Evidence-based

Scores, recommendations, pathways, eligibility decisions, and funding fit assessments must be explainable.

The system must distinguish between:

- Confirmed facts
- Verified requirements
- Estimates
- Assumptions
- Unknowns
- Outdated information

### 3.6 Privacy-first

Confidential data must remain under user control.

External research must receive only the minimum information required.

No confidential information may be sent externally without explicit approval.

### 3.7 Model-agnostic

The system should be designed so that different language models or AI providers can be connected later without rebuilding the application.

The COO Operating System remains the source of truth.

Models are replaceable reasoning and drafting tools.

---

## 4. Version 0.5 Product Pillars

Version 0.5 is organized around six major pillars.

### 4.1 Executive Intelligence

Purpose:

Provide leadership with a fast, evidence-backed summary of company status and recommended priorities.

Core capabilities:

- Executive Brief
- Company Health score
- Commercial Readiness score
- Government Readiness score
- Funding Readiness score
- Pipeline score
- Risk score
- Top blockers
- Priority actions
- Decisions required
- External dependencies
- Upcoming milestones
- People requiring follow-up
- Opportunity and revenue unlocks
- Resource and funding gaps

### 4.2 Commercial and Government Readiness

Purpose:

Track everything required for FedEMR to legally, operationally, technically, and commercially sell, contract, deploy, get paid, and prove value.

Core areas:

- Legal
- Corporate governance
- University/company boundary
- Licensing
- Privacy
- Cybersecurity
- Procurement
- Vendor registration
- Insurance
- Deployment
- Support
- Pricing
- Contracting
- ROI evidence
- Paid pilot conversion
- Customer success

### 4.3 Funding Intelligence

Purpose:

Discover, store, validate, score, pursue, and manage funding opportunities for both the commercial company and the research or University of Calgary side.

Funding pathways:

- FedEMR Technologies Inc.
- University of Calgary research
- Hybrid company/research opportunities

Core capabilities:

- Opportunity discovery
- Eligibility validation
- Source verification
- Fit scoring
- Deadline tracking
- Application effort estimates
- Matching requirement tracking
- Repayable versus non-repayable classification
- Partner requirements
- Internal approval requirements
- Application workspaces
- Budget development
- Grant and pitch drafting
- Presentation generation
- Submission tracking
- Outcome tracking
- Probability-weighted funding pipeline

Funding stages:

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

### 4.4 People and Relationships

Purpose:

Maintain a central, dynamic relationship intelligence system for everyone who touches FedEMR externally.

This is broader than a customer CRM.

People may include:

- Advisors
- Funders
- University contacts
- Research collaborators
- Government contacts
- Procurement contacts
- Legal counsel
- Privacy and security experts
- Investors
- Potential customers
- Champions
- Decision-makers
- Introducers
- Subject-matter experts

Core capabilities:

- Central people directory
- Organization directory
- Contextual roles
- Relationship types
- Focus areas
- Follow-up tracking
- Interaction history
- Commitments
- Introductions
- Relationship owner
- Last interaction
- Next follow-up
- Duplicate detection
- Cross-module linking

A person added from any module must automatically link to the central people directory rather than creating a disconnected duplicate.

### 4.5 Institutional Pathways Navigator

Purpose:

Map and manage confusing institutional processes, initially focused on the University of Calgary commercialization ecosystem.

The system should help users understand:

- What process applies?
- What happens next?
- Who owns each step?
- What documents are required?
- What approvals are required?
- What can run in parallel?
- What is blocking progress?
- When was the pathway last verified?

Initial pathway areas:

- Company formation
- University spinout processes
- IP disclosure and ownership
- Technology licensing
- Shareholder agreements
- Conflict of interest
- Conflict of commitment
- Faculty participation in companies
- Research versus commercial agreements
- Sponsored research
- Legal review
- Sole-source justification
- Procurement
- Privacy review
- Security review
- Grants requiring institutional approval
- Innovate Calgary
- Cumming School of Medicine
- University legal
- Hunter Hub
- Alberta Innovates connections
- Research Services
- Institutional signatures
- Branding and University-name use

The system must distinguish between:

- Reusable pathway definitions
- Active FedEMR pathway cases

Every pathway must include source evidence, verification status, last verified date, confidence level, and escalation path.

### 4.6 Resource and Execution Planning

Purpose:

Determine what is required to complete every workflow, task, pathway, work package, funding application, or deployment.

Each work item should support:

- Required expertise
- Required roles
- Company-side or research-side work
- Internal or external resource
- Student suitability
- Undergraduate suitability
- Graduate student suitability
- Contractor or consultant requirement
- Estimated hours
- Estimated duration
- Direct costs
- Vendor costs
- Legal costs
- Audit costs
- Software costs
- Travel costs
- Dependencies
- Approval requirements
- Funding requirement
- Potential funding matches
- Confidence level

The system should support individual tasks and grouped work packages.

Example work packages:

- Cybersecurity and procurement package
- First-customer deployment readiness
- Funding application development
- University/company legal clarification
- Commercial pricing package
- ROI evidence package

---

## 5. Core Data Domains

The system must support the following major data domains.

### Existing domains

- Tasks
- Commercial Readiness
- Government Readiness
- Customers and Opportunities
- Meetings
- Advisor Recommendations
- Risks
- Funding Needs
- Roadmap
- Settings
- Activity Log

### Version 0.5 domains

- People
- Organizations
- Relationships
- Interactions
- Follow-ups
- Funding Opportunities
- Funding Applications
- Institutional Pathways
- Pathway Cases
- Pathway Steps
- Work Packages
- Resource Requirements
- Documents
- Evidence
- Decisions

---

## 6. Relationship Model

The platform should evolve from isolated records toward a connected relationship model.

Important relationships include:

- Person to organization
- Person to funding opportunity
- Person to customer
- Person to pathway
- Person to meeting
- Person to follow-up
- Organization to customer
- Organization to funding opportunity
- Organization to institutional pathway
- Funding opportunity to application
- Funding opportunity to work package
- Funding opportunity to commercialization blocker
- Pathway to pathway case
- Pathway case to tasks
- Pathway case to people
- Pathway case to documents
- Work package to resources
- Work package to funding opportunities
- Customer to risks
- Customer to meetings
- Customer to procurement requirements
- Customer to roadmap items
- Decision to evidence
- Score to supporting records

The system should store relationships using IDs rather than duplicating names and contact details across modules.

---

## 7. Executive Dashboard Requirements

The dashboard should provide an executive-level view, not a raw project-management view.

Required dashboard elements:

- Executive Brief
- Company Health
- Commercial Readiness
- Government Readiness
- Funding Readiness
- Pipeline Score
- Risk Severity
- Top Priorities
- Critical Risks
- Active Opportunities
- Funding Matches
- Funding Deadlines
- Upcoming Milestones
- Decisions Required
- Waiting On
- People Requiring Follow-up
- Resource Gaps
- Unfunded Work Packages
- Recent Activity
- Advisor Recommendations

Future dashboard capabilities:

- Movable widgets
- Resizable widgets
- Saved layouts
- Role-specific dashboards
- Trend charts
- Drill-down views
- Board view
- Timeline view
- Roadmap view
- Relationship view

---

## 8. Funding Fit Scoring

Funding opportunities should use a transparent weighted scoring model.

Initial weighting:

- Eligibility: 25%
- Strategic alignment: 20%
- Commercial or research impact: 15%
- Funding amount versus effort: 15%
- Probability of success: 10%
- Timing: 10%
- Partner readiness: 5%

The system must display:

- Overall fit score
- Component scores
- Reasons for the score
- Unknowns
- Eligibility risks
- Required actions
- Sources
- Verification date

The system must never invent deadlines, eligibility rules, matching requirements, or permitted expenses.

---

## 9. Institutional Pathway Trust Model

Every institutional pathway must include:

- Source link or policy
- Date last verified
- Verified by
- Confidence level
- Status
- Known exceptions
- Open questions
- Escalation route

Allowed confidence statuses:

- Confirmed
- Likely
- Uncertain
- Outdated
- Needs Verification

The system should clearly display uncertainty rather than presenting assumptions as fact.

---

## 10. Security and Privacy Model

The platform must use a bounded, privacy-first architecture.

### Data classifications

- Public
- Internal
- Confidential
- Restricted

Examples:

- Public funding deadline: Public
- General FedEMR description: Public
- Advisor contact information: Confidential
- Customer discussions: Confidential
- Detailed finances: Restricted
- Legal strategy: Restricted
- Cap table: Restricted

### Security zones

#### Public Research Zone

May search approved public sources for:

- Funding programs
- Government requirements
- University policies
- Procurement pathways
- Public contact information
- Deadlines
- Eligibility requirements

It must not receive confidential internal data.

#### Private Intelligence Zone

May analyze internal company records.

It must not automatically send internal information to external systems.

#### Controlled Action Zone

May prepare or apply approved updates.

Action levels:

- Read
- Draft
- Approve
- Execute
- Audit

### Non-negotiable controls

- No API keys in browser code
- No confidential sample data committed to the public repository
- No unrestricted computer access
- No automatic external transmission of confidential data
- Explicit approval before external actions
- Audit log for AI-supported changes
- Role-based permissions in future multi-user versions
- Encryption and secure backups for production use

---

## 11. AI and Automation Architecture

The platform is not intended to be only a retrieval-augmented generation system.

Future AI capabilities should include:

- Structured data analysis
- Document retrieval
- Funding research
- Eligibility assessment
- Workflow reasoning
- Resource estimation
- Cost estimation
- Draft generation
- Presentation generation
- Budget generation
- Record update proposals
- Recommendation generation
- Scenario planning

The future architecture should include:

### AI Provider Layer

- OpenAI
- Other hosted models
- Local model option

### Policy Layer

- Data classification checks
- Redaction
- Permission checks
- Approval gates
- Source validation

### Tool Layer

- Public funding search
- Institutional policy search
- Internal record analysis
- Document generation
- Presentation generation
- Budget generation
- Approved record updates

The COO Operating System must remain the canonical project memory.

Personal ChatGPT history or memory must not be treated as a guaranteed external data source.

---

## 12. Document and Artifact Generation

The platform should eventually generate:

- Grant applications
- Funding briefs
- Go/no-go recommendations
- Executive summaries
- Commercialization plans
- Research proposal sections
- Work plans
- Milestone plans
- Budgets
- Budget justifications
- Letters of support
- Partner briefs
- Government presentations
- Investor pitches
- Research presentations
- One-page summaries
- Briefing notes
- Reports
- Word documents
- PowerPoint presentations
- PDFs

Generated outputs must use verified platform data and identify missing or uncertain information.

---

## 13. Version 0.5 Scope

Version 0.5 should establish the working foundation for:

- Executive Intelligence
- People and Relationships
- Funding Intelligence
- Institutional Pathways
- Resource and Execution Planning
- Data classification
- Future AI integration

Version 0.5 does not need to complete every advanced feature.

The priority is to create the correct architecture and working MVP modules without breaking the existing application.

---

## 14. Version 0.5 Delivery Order

1. Protect and verify the working application.
2. Update repository documentation.
3. Extend the IndexedDB data model.
4. Add People and Organizations.
5. Add Funding Opportunities.
6. Add Funding fit scoring.
7. Upgrade Executive Intelligence.
8. Add Institutional Pathways foundation.
9. Add Resource Planning foundation.
10. Test all workflows.
11. Update changelog.
12. Commit and publish the stable branch.

---

## 15. Acceptance Criteria

Version 0.5 is successful when:

- The existing dashboard still works.
- Existing records remain intact after the database upgrade.
- People can be added and linked to organizations.
- Funding opportunities can be stored and scored.
- Funding contacts link to the central people directory.
- Institutional pathways can be stored with verification metadata.
- Work packages can estimate roles, hours, costs, and funding needs.
- The Executive Dashboard surfaces useful priorities and blockers.
- Import and export continue to work.
- No browser console errors are introduced.
- No confidential information is committed to the public repository.
- Every working milestone is committed to Git.