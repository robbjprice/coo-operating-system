# FedEMR COO Operating System Architecture Decisions

## Purpose

This document records important product, technical, security, and workflow decisions for the FedEMR COO Operating System.

These decisions are intended to prevent the project from drifting, mixing incompatible architectures, or relying on chat history as the source of truth.

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

FedEMR information may include confidential business information, contact details, funding strategy, institutional processes, and financial estimates.

## Decision

The application will remain local-first during the prototype and Version 0.5 stages.

Core functionality must work without a permanent cloud connection.

## Consequences

- IndexedDB remains the primary data store for the prototype.
- JSON export remains the primary backup and transfer mechanism.
- Cloud synchronization may be added later but must not be required for core operation.
- Real multi-user deployment will require a secure backend, authentication, permissions, encryption, and audit controls.
- Local-first does not mean security is complete; it only defines the current storage model.

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

The project is growing and will involve interconnected modules, data migrations, and scoring logic.

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

Some goals require many connected tasks, roles, approvals, expenses, and funding sources.

A single task cannot represent the full scope of work such as cybersecurity readiness or first-customer deployment.

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

The system should not recommend students for work requiring regulated, legal, executive, or specialist accountability without appropriate supervision.

---

# Decision 014: The System Uses a Privacy-First Bounded Agent Model

**Date:** July 2026  
**Status:** Accepted

## Context

The platform may eventually use AI to research public information, analyze private records, create documents, and propose updates.

The system may contain confidential contacts, finances, legal information, institutional strategy, and commercialization plans.

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

### Internal

- General operating tasks
- Non-sensitive work estimates
- Internal planning

### Confidential

- Contact details
- Customer discussions
- Advisor notes
- Funding strategy
- Institutional cases

### Restricted

- Detailed finances
- Cap tables
- Legal strategy
- Security secrets
- Authentication credentials
- Highly sensitive agreements

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
- Grant drafting
- Pitch development
- Presentation creation
- Budget creation
- Record-update proposals
- Decision support
- Scenario planning

---

# Decision 019: External Research Uses Minimum Necessary Context

**Date:** July 2026  
**Status:** Accepted

## Context

Funding discovery and policy research do not require full access to FedEMR’s confidential records.

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

It should not automatically receive:

- Detailed financial statements
- Customer discussions
- Cap table
- Private contact information
- Legal strategy
- Internal forecasts
- Unreleased commercialization plans

---

# Decision 020: AI Changes Require Approval and Audit

**Date:** July 2026  
**Status:** Accepted

## Context

AI may eventually identify opportunities, generate records, suggest changes, and create documents.

Silent or irreversible changes would create risk.

## Decision

AI-supported changes will use explicit approval and audit controls.

## Consequences

Every material AI action should record:

- Model or provider
- Task requested
- Sources consulted
- Data classification
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
- Decisions, documents, contacts, funding records, pathways, and work plans should live in the platform.

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
- Source URLs
- Last verification date

The system must never invent deadlines, eligibility criteria, eligible expenses, or matching requirements.

---

# Decision 023: Funding Discovery and Private Fit Analysis Are Separate

**Date:** July 2026  
**Status:** Accepted

## Context

Public discovery can be performed safely with a general FedEMR profile.

Detailed fit analysis may require confidential financial, staffing, customer, or strategic information.

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
5. Test with populated data.
6. Test with a clean browser profile.
7. Confirm import and export.
8. Preserve IDs.
9. Log errors.
10. Back up data before destructive changes.

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
- Funding Intelligence
- Institutional Pathways
- Resource Planning
- Data classification
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

The priority is a stable, extensible foundation.

---

# Decision 027: Version 0.5 Build Order

**Date:** July 2026  
**Status:** Accepted

## Decision

Development will proceed in this order:

1. Protect and verify the working application.
2. Update repository documentation.
3. Extend the data model.
4. Implement People.
5. Implement Organizations.
6. Implement Funding Opportunities.
7. Implement funding fit scoring.
8. Upgrade Executive Intelligence.
9. Add Institutional Pathways.
10. Add Work Packages.
11. Add Resource Requirements.
12. Test import, export, and migration.
13. Update the changelog.
14. Merge only after acceptance testing.

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
