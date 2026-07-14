# FedEMR COO Operating System Architecture Decisions

## Purpose

This document records important product, technical, security, data, content, and workflow decisions for the FedEMR COO Operating System.

These decisions are intended to prevent the project from drifting, mixing incompatible architectures, relying on chat history as the source of truth, or presenting product information without appropriate evidence and classification.

Each decision should include:

- Date
- Status
- Context
- Decision
- Consequences
- Future review conditions

---

# Decision 001: The Repository Is the Source of Truth

**Date:** July 2026  
**Status:** Accepted

## Context

Chat history and AI memory are useful but incomplete and unreliable as permanent project documentation.

The project requires a durable source of truth that can be reviewed by Robb, collaborators, developers, and future AI sessions.

## Decision

The GitHub repository will contain the authoritative project documentation.

Core documents include:

- `MASTER_SPEC.md`
- `PRODUCT_VISION.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `UI_GUIDELINES.md`
- `CODING_STANDARDS.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `DECISIONS.md`
- `NEXT_STEPS.md`

## Consequences

- Major product decisions must be recorded in the repository.
- AI-generated recommendations are not considered final until reflected in the repository.
- Future development sessions should review the relevant documentation before changing code.
- ChatGPT memory may assist the workflow but must not be treated as the canonical project record.

---

# Decision 002: Preserve the Existing ES-Module Architecture

**Date:** July 2026  
**Status:** Accepted

## Context

The application already uses:

- JavaScript ES modules
- `import` and `export`
- IndexedDB
- Separate storage, scoring, UI, utility, and application modules
- JSON import and export
- Modular dashboard rendering

A simplified global-script architecture was temporarily introduced and caused conflicts.

## Decision

The application will retain the existing ES-module architecture.

The project will not mix global `window` objects with module-based imports unless there is a clearly documented reason.

## Consequences

- JavaScript files should use consistent `import` and `export` syntax.
- `index.html` must load the main application using `type="module"`.
- New functionality should be added within the existing module structure.
- Architectural consistency takes priority over tutorial-style simplicity.

---

# Decision 003: The Application Remains Local-First

**Date:** July 2026  
**Status:** Accepted

## Context

The current prototype stores operational data locally using IndexedDB.

FedEMR information may include confidential business information, contact details, product strategy, funding strategy, institutional processes, unpublished content, case studies, and financial estimates.

## Decision

The application will remain local-first during the prototype and Version 0.5 stages.

Core functionality must work without a permanent cloud connection.

## Consequences

- IndexedDB remains the primary data store for the prototype.
- JSON export remains the primary backup and transfer mechanism.
- Cloud synchronization may be added later but must not be required for core operation.
- Real multi-user deployment will require a secure backend, authentication, permissions, encryption, and audit controls.
- Local-first does not mean security is complete. It defines the current storage model only.

---

# Decision 004: Use Git Branches for Major Development Work

**Date:** July 2026  
**Status:** Accepted

## Context

The application must remain usable while significant Version 0.5 features are developed.

## Decision

Major development work will occur on feature or milestone branches.

The current Version 0.5 branch is:

```text
v0.5-foundation
```

## Consequences

- `main` should remain the most stable branch.
- Significant changes should be developed and tested before merging.
- Every stable milestone should be committed.
- Broken or incomplete work should not be merged into `main`.
- Git becomes the rollback system for development mistakes.

---

# Decision 005: Use Full-File Replacements or Controlled Patches

**Date:** July 2026  
**Status:** Accepted

## Context

Instructions such as “find this line and paste below it” caused confusion and accidental code corruption.

Robb is working with ChatGPT Desktop and Visual Studio Code side by side.

## Decision

Development instructions should use one of the following methods:

1. Full-file replacement
2. Complete function replacement with exact boundaries
3. Downloadable replacement file
4. Clean patch or diff
5. Small, clearly numbered changes made one file at a time

## Consequences

Each coding change should include:

1. Exact file to open
2. Backup or Git status check
3. Replacement instructions
4. Save step
5. Live Server test
6. Browser console check
7. Acceptance test
8. Commit step

Small code scavenger hunts have been retired with cause.

---

# Decision 006: Every Commit Must Leave the Application Working

**Date:** July 2026  
**Status:** Accepted

## Context

The project is growing and will involve interconnected modules, data migrations, product records, content libraries, and scoring logic.

## Decision

Every committed milestone should leave the application in a working and testable state.

## Consequences

Before committing:

- The dashboard must load.
- Navigation must work.
- The changed feature must be tested.
- The browser console must have no new red errors.
- Existing data must remain accessible.
- Import and export must be tested when storage changes.
- The changelog should be updated for meaningful milestones.

---

# Decision 007: People and Organizations Are Central Shared Records

**Date:** July 2026  
**Status:** Accepted

## Context

The same person may appear as:

- Advisor
- Funder contact
- University contact
- Research collaborator
- Customer contact
- Decision-maker
- Government contact
- Legal contact
- Product reviewer
- Presentation audience member
- Case-study participant
- Claims approver

Duplicating their information across modules would create inconsistent and outdated records.

## Decision

People and organizations will be stored centrally.

Other modules will link to them using stable IDs.

## Consequences

- A person added from Funding Intelligence also appears in People and Relationships.
- Contact information should not be copied into multiple records.
- Roles should be contextual and may change over time.
- Reassigning a role should preserve historical assignments.
- Duplicate detection should use email, LinkedIn URL, phone number, and name plus organization.
- Potential duplicates should be reviewed rather than merged automatically.

---

# Decision 008: Funding Needs, Opportunities, and Applications Are Separate

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR needs to distinguish between:

- What the organization needs money for
- Which external programs may fund the work
- The actual application submitted to a program

## Decision

The system will maintain three separate concepts:

### Funding Need

What FedEMR needs funding to accomplish.

### Funding Opportunity

A possible external funding source.

### Funding Application

The actual proposal, budget, approvals, documents, and submission workflow.

## Consequences

- One funding need may link to several opportunities.
- One opportunity may support several work packages.
- An opportunity becomes an application only after a pursue decision.
- Funding dashboards can show unmet needs separately from the application pipeline.
- Repayable contributions, loans, equity, and non-repayable grants must be clearly distinguished.

---

# Decision 009: Funding Intelligence Supports Three Pathways

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR funding may be pursued through the company, the University of Calgary research side, or a combined model.

Eligibility, approvals, budgets, and application requirements vary significantly.

## Decision

Funding opportunities will be classified as:

- Commercial
- Research
- Hybrid

## Consequences

- Company and University eligibility must not be treated as interchangeable.
- Institutional approvals must be tracked for research and hybrid applications.
- Research funding may require PI eligibility, signatures, indirect costs, partner approvals, or internal deadlines.
- Company funding may include repayable terms, matching funds, customer requirements, or commercialization milestones.
- Hybrid opportunities must explicitly define roles, budget ownership, IP, and contracting boundaries.

---

# Decision 010: Institutional Pathways Use Definitions and Active Cases

**Date:** July 2026  
**Status:** Accepted

## Context

University and institutional processes are confusing, change over time, and often depend on the situation.

A static knowledge page cannot adequately track an active FedEMR process.

## Decision

The Institutional Pathways Navigator will separate:

### Pathway Definition

The reusable map of a process.

### Pathway Case

A real FedEMR matter moving through that process.

## Consequences

A pathway definition may include:

- Trigger
- Intended outcome
- Steps
- Departments
- Contact roles
- Required documents
- Approvals
- Dependencies
- Sources
- Verification status

A pathway case may include:

- Current stage
- Assigned owner
- Actual contacts
- Submitted documents
- Open questions
- Blockers
- Waiting-on status
- Related decisions
- Completion history

---

# Decision 011: Institutional Knowledge Must Show Uncertainty

**Date:** July 2026  
**Status:** Accepted

## Context

University procedures may be undocumented, outdated, situational, or based on informal institutional knowledge.

Presenting uncertain processes as confirmed facts would undermine trust.

## Decision

Every institutional pathway must support verification and confidence metadata.

Allowed statuses include:

- Confirmed
- Likely
- Uncertain
- Outdated
- Needs Verification

## Consequences

Pathways should include:

- Source URLs
- Last verified date
- Verified by
- Open questions
- Known exceptions
- Escalation route
- Confidence level

The system must make uncertainty visible rather than burying it behind a confident percentage.

---

# Decision 012: Work Is Planned Through Tasks and Work Packages

**Date:** July 2026  
**Status:** Accepted

## Context

Some goals require many connected tasks, roles, approvals, expenses, product dependencies, content assets, and funding sources.

A single task cannot represent the full scope of work such as cybersecurity readiness, product release preparation, or first-customer deployment.

## Decision

The system will support:

### Tasks

Individual actions.

### Work Packages

Grouped work required to achieve an outcome.

## Consequences

A work package may include:

- Required roles
- Internal and external hours
- Company or research ownership
- Student suitability
- Consultant or vendor needs
- Costs
- Duration
- Dependencies
- Approvals
- Funding gaps
- Linked funding opportunities
- Product versions
- Product capabilities
- Presentations
- Content assets
- Use cases
- Case studies
- Related tasks
- Risks
- Customers
- Roadmap milestones

---

# Decision 013: Resource Planning Must Include Student Options

**Date:** July 2026  
**Status:** Accepted

## Context

Some FedEMR work may be appropriately completed by:

- Undergraduate students
- Graduate students
- Research assistants
- Interns
- Contractors
- Consultants
- Company hires
- University personnel

## Decision

Resource requirements will explicitly identify the type of resource needed and whether student support is appropriate.

## Consequences

Resource planning should capture:

- Required expertise
- Required role
- Company or research side
- Internal or external source
- Student suitability
- Undergraduate suitability
- Graduate-student suitability
- Estimated hours
- Estimated cost
- Funding requirement
- Potential funding match
- Confidence level

The system should not recommend students for work requiring regulated, legal, executive, clinical, security, or specialist accountability without appropriate supervision.

---

# Decision 014: The System Uses a Privacy-First Bounded Agent Model

**Date:** July 2026  
**Status:** Accepted

## Context

The platform may eventually use AI to research public information, analyze private records, create documents, generate presentations, assess product gaps, and propose updates.

The system may contain confidential contacts, finances, legal information, unpublished case studies, institutional strategy, and commercialization plans.

Broad access to the computer or unrestricted external transmission is unacceptable.

## Decision

Future AI capabilities will use a bounded, privacy-first architecture.

The system will not have unrestricted access to the user’s computer.

## Consequences

The architecture will separate:

### Public Research Zone

May search approved public sources using sanitized context.

### Private Intelligence Zone

May analyze internal records without automatically transmitting them externally.

### Controlled Action Zone

May draft or apply approved changes with explicit user authorization.

Actions should follow:

- Read
- Draft
- Approve
- Execute
- Audit

---

# Decision 015: Data Classification Is Mandatory

**Date:** July 2026  
**Status:** Accepted

## Context

Different information carries different confidentiality and risk levels.

## Decision

Records will support these classifications:

- Public
- Internal
- Confidential
- Restricted

## Consequences

Examples:

### Public

- Public funding deadline
- Public program information
- Public institutional policy
- Approved public product description
- Approved public claim
- Published public case study

### Internal

- General operating tasks
- Non-sensitive work estimates
- Internal planning
- Draft audience content
- Generalized product records

### Confidential

- Contact details
- Customer discussions
- Advisor notes
- Funding strategy
- Institutional cases
- Unreleased product versions
- Draft presentations
- Unpublished case studies

### Restricted

- Detailed finances
- Cap tables
- Legal strategy
- Security secrets
- Authentication credentials
- Highly sensitive agreements
- Confidential vulnerabilities
- Restricted customer information

Restricted information must never be provided to external research tools without explicit approval and a defined need.

---

# Decision 016: No API Keys in Browser Code

**Date:** July 2026  
**Status:** Accepted

## Context

The current application is hosted as a static browser application.

Any secret included in browser JavaScript can be inspected by users and should be considered exposed.

## Decision

No LLM, database, email, cloud, or external-service API key may be stored in:

- JavaScript source files
- HTML
- CSS
- Public GitHub files
- Browser local storage
- IndexedDB application settings

## Consequences

Real AI integration will require:

- A secure backend
- A controlled local service
- Secure secret storage
- Server-side authorization
- Request logging
- Permission checks
- Data redaction
- Approval gates

The static GitHub Pages application will not directly hold production secrets.

---

# Decision 017: The System Is Model-Agnostic

**Date:** July 2026  
**Status:** Accepted

## Context

AI models, providers, pricing, capabilities, and policies change quickly.

The platform should not depend permanently on one model.

## Decision

Future AI functionality will use a provider abstraction layer.

## Consequences

The system may eventually support:

- OpenAI models
- Other hosted models
- Local models
- Specialized models for classification, drafting, coding, or analysis

The platform remains the source of truth.

Models are replaceable tools.

---

# Decision 018: The System Is More Than RAG

**Date:** July 2026  
**Status:** Accepted

## Context

Retrieval-augmented generation can help find relevant documents, but it does not provide a complete operating system.

## Decision

The future intelligence architecture will combine:

- Structured application data
- Document retrieval
- Public research
- Workflow reasoning
- Resource estimation
- Product reasoning
- Claims validation
- Scoring
- Draft generation
- Approved actions
- Artifact generation

## Consequences

The system should eventually support:

- Funding discovery
- Eligibility analysis
- Institutional pathway guidance
- Resource planning
- Cost estimation
- Product-gap analysis
- Release-readiness analysis
- Audience-content drafting
- Grant drafting
- Pitch development
- Presentation creation
- Case-study development
- Claims review
- Budget creation
- Record-update proposals
- Decision support
- Scenario planning

---

# Decision 019: External Research Uses Minimum Necessary Context

**Date:** July 2026  
**Status:** Accepted

## Context

Funding discovery, product research, and policy research do not require full access to FedEMR’s confidential records.

## Decision

External research tools will receive a sanitized profile containing only the information required for the task.

## Consequences

A public funding search may receive:

- Sector
- Location
- Organization type
- TRL
- Research affiliation
- Broad funding purpose
- Approved public product description

It should not automatically receive:

- Detailed financial statements
- Customer discussions
- Cap table
- Private contact information
- Legal strategy
- Internal forecasts
- Unreleased commercialization plans
- Confidential product roadmap
- Unpublished case studies
- Restricted claims or evidence

---

# Decision 020: AI Changes Require Approval and Audit

**Date:** July 2026  
**Status:** Accepted

## Context

AI may eventually identify opportunities, generate records, suggest changes, create documents, develop presentations, and draft claims.

Silent or irreversible changes would create risk.

## Decision

AI-supported changes will use explicit approval and audit controls.

## Consequences

Every material AI action should record:

- Model or provider
- Task requested
- Sources consulted
- Data classification
- Product version used
- Audience used
- Proposed action
- User approval
- Records changed
- Previous value
- New value
- Timestamp
- Outcome
- Error information

The system should default to drafting rather than executing.

---

# Decision 021: The COO OS Owns Canonical Project Memory

**Date:** July 2026  
**Status:** Accepted

## Context

Robb uses ChatGPT extensively and has valuable project context in previous conversations.

A custom application cannot assume unrestricted or permanent access to personal ChatGPT memory or complete chat history.

## Decision

Important project information must be stored in the COO Operating System itself.

## Consequences

- ChatGPT may assist with analysis, drafting, and imports.
- Relevant prior content may be manually imported or connected through approved integrations.
- The platform must not depend on personal ChatGPT memory for critical operations.
- Decisions, documents, contacts, product records, content assets, presentations, claims, funding records, pathways, and work plans should live in the platform.

---

# Decision 022: Funding Fit Scores Must Be Explainable

**Date:** July 2026  
**Status:** Accepted

## Context

A single percentage without an explanation would create false confidence.

## Decision

Funding fit scoring will use visible weighted components.

Initial weighting:

- Eligibility: 25%
- Strategic alignment: 20%
- Impact: 15%
- Funding amount versus effort: 15%
- Probability of success: 10%
- Timing: 10%
- Partner readiness: 5%

## Consequences

The system must show:

- Component scores
- Weighting
- Overall score
- Score explanation
- Eligibility risks
- Unknowns
- Missing partners
- Missing documents
- Product versions supported
- Capabilities supported
- Use cases supported
- Source URLs
- Last verification date

The system must never invent deadlines, eligibility criteria, eligible expenses, or matching requirements.

---

# Decision 023: Funding Discovery and Private Fit Analysis Are Separate

**Date:** July 2026  
**Status:** Accepted

## Context

Public discovery can be performed safely with a general FedEMR profile.

Detailed fit analysis may require confidential financial, staffing, product, customer, or strategic information.

## Decision

Funding discovery and private fit analysis will be treated as separate stages.

## Consequences

### Discovery stage

Uses public or sanitized information.

### Private validation stage

Uses approved internal data to assess:

- Matching capacity
- Budget fit
- Resource capacity
- Internal timing
- Strategic value
- Product alignment
- Capability alignment
- Customer relevance
- Research relevance
- Financial feasibility

Private information should not automatically be included in public searches.

---

# Decision 024: The Public Repository Must Not Contain Confidential Data

**Date:** July 2026  
**Status:** Accepted

## Context

The current repository is public.

Sample data and source code are visible to anyone.

## Decision

Only fictional, public, generalized, or explicitly approved information may be committed.

## Consequences

Do not commit:

- Private email addresses
- Private phone numbers
- Detailed finances
- Customer-identifying information
- Confidential legal advice
- Cap tables
- Passwords
- API keys
- Private agreements
- Sensitive institutional discussions
- Unreleased IP details
- Confidential product limitations
- Unpublished performance results
- Restricted presentations
- Unapproved external claims
- Named confidential case studies

Real prototype data should remain in local IndexedDB and secure backups.

---

# Decision 025: IndexedDB Migrations Must Be Non-Destructive

**Date:** July 2026  
**Status:** Accepted

## Context

Version 0.5 introduces new collections and data structures.

A database upgrade must not erase existing operational data.

## Decision

IndexedDB migrations must preserve existing object stores and records.

## Consequences

Every migration must:

1. Increase the database version.
2. Add missing stores in `onupgradeneeded`.
3. Avoid deleting existing stores.
4. Avoid clearing records.
5. Seed only newly created stores.
6. Test with populated data.
7. Test with a clean browser profile.
8. Confirm import and export.
9. Preserve IDs.
10. Preserve unknown fields.
11. Log errors.
12. Back up data before destructive changes.
13. Close duplicate application tabs before upgrades.

---

# Decision 026: Version 0.5 Is a Foundation Release

**Date:** July 2026  
**Status:** Accepted

## Context

The planned product contains many advanced capabilities.

Attempting to fully complete all modules in one release would create unnecessary complexity.

## Decision

Version 0.5 will establish the architecture and MVP foundations for:

- Executive Intelligence
- People and Organizations
- Product and Market Intelligence
- Funding Intelligence
- Institutional Pathways
- Resource Planning
- Data classification
- Product-version tracking
- Capability tracking
- Audience-specific content
- Presentations
- Use cases
- Case studies
- Approved claims
- Future AI integration

## Consequences

Version 0.5 does not need:

- Full multi-user support
- Production authentication
- Cloud synchronization
- Live external AI integration
- Full relationship graph visualization
- Automated email or calendar access
- Unrestricted agent actions
- Complete University of Calgary pathway coverage
- Automated claims approval
- Automated public publishing

The priority is a stable, extensible foundation.

---

# Decision 027: Version 0.5 Build Order

**Date:** July 2026  
**Status:** Accepted

## Decision

Development will proceed in this order:

1. Protect and verify the working application.
2. Update repository documentation.
3. Extend the operating data model.
4. Implement People.
5. Implement Organizations.
6. Add Product and Market data collections.
7. Implement Product Overview.
8. Implement Product Versions.
9. Implement Product Capabilities.
10. Implement Audiences.
11. Implement Audience Content.
12. Implement Presentations.
13. Implement Use Cases.
14. Implement Case Studies.
15. Implement Approved Claims.
16. Implement Funding Opportunities.
17. Implement funding fit scoring.
18. Upgrade Executive Intelligence.
19. Add Institutional Pathways.
20. Add Work Packages.
21. Add Resource Requirements.
22. Test import, export, and migration.
23. Update the changelog.
24. Merge only after acceptance testing.

---

# Decision 028: Current Development Workflow

**Date:** July 2026  
**Status:** Accepted

## Context

Robb is developing with:

- ChatGPT Desktop on one side of the screen
- Visual Studio Code on the other side
- Live Server for testing
- Git and GitHub for version control

## Decision

This remains the primary Version 0.5 workflow.

## Consequences

Each development step should be:

1. Explained clearly
2. Performed one file at a time
3. Tested immediately
4. Checked in the browser console
5. Committed only when working
6. Documented when architecturally significant

A more automated coding workflow may be introduced later after the repository structure, tests, and permissions are mature.

---

# Decision 029: Product Records Are the Source of Truth for FedEMR

**Date:** July 2026  
**Status:** Accepted

## Context

The system tracks commercialization work, but it also needs a structured source of truth for the product being commercialized.

Product information currently risks being scattered across presentations, grants, emails, notes, and memory.

## Decision

The `products`, `productVersions`, and `productCapabilities` collections will be the authoritative structured records for FedEMR product information.

## Consequences

- Product descriptions should link back to the central product record.
- Presentations should identify the product version they describe.
- Funding applications should identify the product versions and capabilities they support.
- Use cases should identify the product capabilities they require.
- Claims should identify the applicable product version.
- Content should not independently redefine product availability.
- Conflicting product descriptions should be reviewed and reconciled.

---

# Decision 030: Product Versions Must Be Explicitly Tracked

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR has current, planned, research, pilot, and future product states.

Without explicit version tracking, content and claims may mix current functionality with future plans.

## Decision

Each meaningful FedEMR release or product state will be represented as a product-version record.

## Consequences

Each version should identify:

- Version name
- Version number
- Status
- Planned and actual release dates
- Improvements
- Capabilities included
- Known limitations
- Dependencies
- Release blockers
- Readiness
- Support status
- Documentation status
- Linked evidence
- Linked claims

Content and presentations must not describe future-version capabilities as available in the current version.

---

# Decision 031: Product Capability Status Must Be Truthful and Visible

**Date:** July 2026  
**Status:** Accepted

## Context

A capability may be available, planned, experimental, research-only, pilot-only, or commercially supported.

These are materially different states.

## Decision

Every product capability must have an explicit availability and support status.

## Consequences

Allowed capability statuses include:

- Available
- In Development
- Planned
- Experimental
- Research-Only
- Pilot-Only
- Commercially Supported
- Deprecated

The interface must clearly display these statuses.

A planned capability may not be described as available.

A research-only capability may not be described as commercially supported without explicit approval.

---

# Decision 032: Product Readiness Is Separate From Commercial Readiness

**Date:** July 2026  
**Status:** Accepted

## Context

A company may be commercially prepared while a particular product release remains technically incomplete.

Likewise, a technically strong product may still lack legal, procurement, pricing, or support readiness.

## Decision

Product Readiness and Commercial Readiness will be treated as separate but connected concepts.

## Consequences

Product Readiness may include:

- Capability completeness
- Stability
- Deployment readiness
- Security readiness
- Privacy readiness
- Documentation
- Training
- Support
- Integration readiness
- Evidence strength
- Release blockers

Commercial Readiness may include:

- Legal
- Procurement
- Insurance
- Contracting
- Pricing
- Customer success
- Sales readiness
- Vendor requirements

Neither score should imply regulatory, clinical, procurement, or security approval unless explicitly documented.

---

# Decision 033: Audiences Are Reusable Shared Records

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR must be explained differently to clinicians, researchers, government, privacy teams, procurement teams, technical teams, funders, and pharmaceutical companies.

Repeatedly redefining the audience inside each document would create inconsistent messaging.

## Decision

Audiences will be stored centrally in the `audiences` collection.

## Consequences

Audience records may include:

- Knowledge level
- Goals
- Concerns
- Objections
- Preferred terminology
- Terms to avoid
- Technical depth
- Preferred evidence
- Call to action
- Decision criteria

Content, presentations, claims, use cases, and case studies should link to audience records by ID.

---

# Decision 034: Audience-Specific Content May Change Framing but Not Facts

**Date:** July 2026  
**Status:** Accepted

## Context

Different audiences require different levels of detail and different explanations.

Tailoring language must not create contradictory facts.

## Decision

Audience-specific content may change:

- Terminology
- Level of technical detail
- Ordering
- Examples
- Benefits emphasized
- Call to action

It may not change:

- Product capability status
- Product version
- Evidence strength
- Privacy facts
- Security facts
- Deployment facts
- Results
- Limitations
- Approved qualifiers

## Consequences

- Clinician content may focus on clinical relevance.
- Government content may focus on system value and capacity.
- Researcher content may focus on methodology and collaboration.
- Technical content may focus on architecture and deployment.
- All versions must remain grounded in the same product, evidence, and claims records.

---

# Decision 035: Content Assets Are Modular and Reusable

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR messaging appears in websites, brochures, grants, decks, emails, reports, and demonstrations.

Copying entire passages into every artifact creates version drift.

## Decision

Reusable content will be stored in the `contentAssets` collection.

## Consequences

Content assets should support:

- Audience
- Content type
- Product version
- Technical depth
- Core message
- Short and long variants
- Approval status
- Review date
- Approved claims
- Evidence
- Linked presentations

Content may be reused across artifacts while retaining a single source of truth.

---

# Decision 036: Presentations Are Structured Records, Not Only Files

**Date:** July 2026  
**Status:** Accepted

## Context

A presentation is more than a PowerPoint file.

It has an audience, purpose, duration, product version, claims, evidence, feedback, history, and required revisions.

## Decision

Presentations will be stored as structured records in the `presentations` collection.

## Consequences

Presentation records should include:

- Title
- Type
- Audience
- Purpose
- Product version
- Duration
- File reference
- Outline
- Speaker notes
- Claims
- Evidence
- Use cases
- Case studies
- Presentation history
- Feedback
- Required revisions
- Approval status
- Confidentiality

The file remains an artifact linked to the structured record.

---

# Decision 037: Presentation Variants Must Share a Common Source

**Date:** July 2026  
**Status:** Accepted

## Context

FedEMR may need government, clinical, research, technical, pharmaceutical, funder, short, long, public, and confidential variants of the same core presentation.

Independent copies will drift.

## Decision

Presentation variants should share linked source content, claims, evidence, use cases, and product records.

## Consequences

- A government version may emphasize public value.
- A clinical version may emphasize patient and workflow impact.
- A technical version may include more architecture detail.
- A public version must exclude confidential content.
- Variant-specific edits should not silently alter shared facts.
- Updates to core approved claims should identify presentations requiring review.

---

# Decision 038: Use Cases and Case Studies Are Separate Concepts

**Date:** July 2026  
**Status:** Accepted

## Context

A potential application of FedEMR is not the same as a completed implementation.

Mixing them could create misleading claims.

## Decision

The system will maintain separate collections:

### Use Case

What FedEMR could do, is designed to do, or is being evaluated to do.

### Case Study

What FedEMR has actually done or a clearly labelled illustrative example.

## Consequences

- A use case may exist without a case study.
- A case study may demonstrate one or more use cases.
- Presentations may use both, but must label them correctly.
- Hypothetical use cases may not be presented as completed customer outcomes.

---

# Decision 039: Use Cases Require Maturity Status

**Date:** July 2026  
**Status:** Accepted

## Context

Use cases progress from ideas to designs, demonstrations, validation, active implementation, and commercial availability.

## Decision

Every use case must include a visible status.

Allowed statuses include:

- Idea
- Hypothetical
- Designed
- Demonstrated
- Validated
- Active
- Completed
- Commercially Available
- Archived

## Consequences

- Status must appear on use-case cards and detail screens.
- A hypothetical use case must remain clearly labelled.
- Commercial availability should require corresponding product capability and version support.
- Status changes should be supported by evidence or a documented decision.

---

# Decision 040: Case Studies Require Classification and Permission Status

**Date:** July 2026  
**Status:** Accepted

## Context

A case study may be a completed deployment, active implementation, research demonstration, technical validation, hypothetical example, or composite example.

Public use may require permission.

## Decision

Every case study must include:

- Classification
- Publication status
- Confidentiality
- Permission status
- External-use permission
- Evidence
- Review date

## Consequences

Allowed classifications include:

- Completed Real-World Case Study
- Active Implementation
- Research Demonstration
- Technical Validation
- Hypothetical Example
- Composite Example

Hypothetical and composite records must be visibly labelled.

Private or unapproved records must not be used in public presentations or content.

---

# Decision 041: Approved Claims Are Separate From General Content

**Date:** July 2026  
**Status:** Accepted

## Context

A sentence used in a draft brochure is not automatically an approved external claim.

Claims may require evidence, qualifiers, approval, and periodic review.

## Decision

Claims will be stored in a dedicated `approvedClaims` collection.

## Consequences

Each claim should include:

- Claim text
- Category
- Audience
- Product version
- Capability
- Evidence
- Evidence strength
- Approval status
- Required qualifier
- Permitted contexts
- Prohibited contexts
- Review date
- Public-use permission
- Confidentiality

Content and presentations should link to claim records rather than treating any draft sentence as approved.

---

# Decision 042: Claims Must Be Linked to Evidence

**Date:** July 2026  
**Status:** Accepted

## Context

Unsupported claims create legal, reputational, scientific, and commercial risk.

## Decision

Externally usable claims must be linked to supporting evidence.

## Consequences

Evidence may include:

- Published research
- Technical benchmark
- Internal measurement
- Product demonstration
- Deployment result
- Customer-approved statement
- Security assessment
- Privacy analysis
- Operational measurement

The system must record evidence strength and any required qualifier.

A missing or expired evidence link should trigger review.

---

# Decision 043: Claims Are Product-Version Specific Where Necessary

**Date:** July 2026  
**Status:** Accepted

## Context

A claim may be true for one FedEMR version and false for another.

## Decision

Claims must identify applicable product versions when the claim depends on version-specific functionality or performance.

## Consequences

- A V2 capability claim must not automatically apply to the current product.
- Retired versions may retain historical claims.
- Presentations must use claims valid for the version being presented.
- Version changes may trigger claim reverification.

---

# Decision 044: Evidence Strength Must Be Visible

**Date:** July 2026  
**Status:** Accepted

## Context

Not all supporting evidence is equally strong.

A published peer-reviewed result differs from an estimate or internal observation.

## Decision

Evidence and claims should support an explicit evidence-strength classification.

## Consequences

Possible levels may include:

- Strong
- Moderate
- Limited
- Preliminary
- Estimated
- Unknown

The interface should not display all claims as equally proven.

---

# Decision 045: Product and Market Records Must Be Connected to Execution

**Date:** July 2026  
**Status:** Accepted

## Context

Product records should not become a disconnected documentation library.

Product strategy must connect to actual work.

## Decision

Products, versions, capabilities, audiences, content, presentations, use cases, case studies, and claims must support links to operational records.

## Consequences

They may link to:

- Tasks
- Risks
- Roadmap items
- Work packages
- Resource requirements
- Funding opportunities
- Funding applications
- Customers
- Meetings
- People
- Organizations
- Decisions
- Documents
- Evidence
- Institutional pathways

This enables the COO OS to show what product gap is blocked, who owns it, what it costs, and which opportunity it unlocks.

---

# Decision 046: Real Files Remain Artifacts Linked to Structured Records

**Date:** July 2026  
**Status:** Accepted

## Context

Presentations, posters, reports, documents, and case-study materials may exist as PowerPoint, PDF, Word, image, or external files.

The browser application may not store the full file directly.

## Decision

The structured record will store metadata and references to the real artifact.

## Consequences

A record may include:

- File name
- File URL
- Storage location
- Document ID
- Version
- Status
- Owner
- Confidentiality

Future secure file storage may be added without redesigning the structured record.

---

# Decision 047: Product Sample Data Must Be Generalized and Safe

**Date:** July 2026  
**Status:** Accepted

## Context

The public repository needs sample data to demonstrate Product and Market features.

Real product data may include unpublished capabilities, limitations, performance, and strategy.

## Decision

Repository sample data must use:

- Approved high-level FedEMR information
- Fictional records
- Safely generalized records
- Clearly labelled hypothetical examples
- Draft sample claims without unsupported external approval

## Consequences

Do not include:

- Unpublished performance metrics
- Customer-identifying deployments
- Confidential technical weaknesses
- Restricted architecture details
- Unapproved claims
- Private presentations
- Sensitive roadmap dates unless approved
- Confidential implementation details

---

# Decision 048: Product and Market IndexedDB Migration Uses Version 3

**Date:** July 2026  
**Status:** Accepted

## Context

The current database is version 2 and contains operating collections.

The Product and Market pillar requires nine additional object stores.

## Decision

The Product and Market data migration will increase IndexedDB to version 3.

New stores:

```text
products
productVersions
productCapabilities
audiences
contentAssets
presentations
useCases
caseStudies
approvedClaims
```

## Consequences

- Existing version 2 stores must remain intact.
- Existing records must remain intact.
- Only newly created stores should be seeded.
- Duplicate browser tabs should be closed before upgrade.
- Import and export must be retested.
- A fresh installation must also be tested.
- The migration must be committed only after successful regression testing.

---

# Decision 049: Product and Market Navigation Is a Major Sidebar Section

**Date:** July 2026  
**Status:** Accepted

## Context

Product and Market Intelligence is a major operating pillar, not a minor document category.

## Decision

The sidebar will include a dedicated Product and Market section.

Recommended navigation:

- Product Overview
- Versions and Releases
- Capabilities
- Audiences
- Audience Content
- Presentations
- Use Cases
- Case Studies
- Approved Claims

## Consequences

The section should be visually grouped and easy to distinguish from:

- Execution
- Relationships
- Commercialization
- Funding
- Institutional
- Knowledge

---

# Decision 050: The Executive Dashboard Must Surface Product Status

**Date:** July 2026  
**Status:** Accepted

## Context

The dashboard currently emphasizes tasks and risks.

Leadership also needs a fast view of the product being commercialized.

## Decision

The Executive Dashboard will eventually surface:

- Current product version
- Next planned version
- Product Readiness
- Release blockers
- Capability gaps
- Presentations requiring updates
- Content requiring review
- Claims requiring reverification

## Consequences

Dashboard summaries must use real structured records rather than hard-coded text.

Product status should be explainable and linked to supporting records.

---

# Decision Template

Use this template for future decisions:

```markdown
# Decision XXX: Title

**Date:**  
**Status:** Proposed | Accepted | Superseded | Rejected

## Context

Explain the problem, constraint, or opportunity.

## Decision

State the decision clearly.

## Consequences

List the practical effects, trade-offs, and follow-up work.

## Review Conditions

Describe when this decision should be reconsidered.
```

---

# Decision Status Definitions

## Proposed

The decision is under consideration.

## Accepted

The decision is currently active.

## Superseded

A newer decision has replaced it.

## Rejected

The option was considered and intentionally not selected.