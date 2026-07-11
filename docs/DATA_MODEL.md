# FedEMR COO Operating System Data Model

## 1. Purpose

This document defines the data model for the FedEMR COO Operating System.

The model supports:

- Executive intelligence
- Commercial readiness
- Government readiness
- Funding intelligence
- People and relationships
- Institutional pathways
- Resource and execution planning
- Customers and opportunities
- Tasks
- Risks
- Meetings
- Roadmap management
- Documents
- Evidence
- Decisions
- Future AI-supported workflows

The system should avoid duplicating names, organizations, contact information, and relationships across modules.

Records should be connected using stable IDs.

---

## 2. Data Model Principles

### 2.1 Shared record structure

Most operational records should include:

- `id`
- `createdAt`
- `updatedAt`
- `status`
- `priority`
- `owner`
- `notes`
- `blocked`
- `waitingOn`
- `reviewCadence`
- `confidentiality`
- `sourceUrls`
- `evidenceIds`
- Relevant linked-record IDs

### 2.2 Stable identifiers

Every record must have a unique ID.

Relationships should store record IDs rather than copied names.

Example:

```javascript
{
  personId: "person_001",
  organizationId: "org_001"
}
```

Contact details should not be duplicated inside funding, customer, pathway, or meeting records.

### 2.3 Data classification

Every record should support one of these classifications:

- `Public`
- `Internal`
- `Confidential`
- `Restricted`

### 2.4 Verification metadata

Records based on external rules, funding programs, institutional processes, or policies should include:

- `sourceUrls`
- `lastVerifiedDate`
- `verifiedBy`
- `verificationStatus`
- `confidence`
- `openQuestions`

### 2.5 Explainable scoring

Any calculated score should retain:

- Component scores
- Weighting
- Source records
- Calculation date
- Explanation
- Unknowns

---

## 3. Core Collections

### Existing collections

```text
tasks
readinessItems
governmentReadinessItems
customers
meetings
advisorRecommendations
risks
fundingNeeds
roadmapItems
settings
activityLog
```

### Version 0.5 collections

```text
people
organizations
relationships
interactions
followUps
fundingOpportunities
fundingApplications
institutionalPathways
pathwayCases
pathwaySteps
workPackages
resourceRequirements
documents
evidence
decisions
```

---

## 4. Shared Base Record

Most operational records should inherit or support the following fields:

```javascript
{
  id: "",
  createdAt: "",
  updatedAt: "",

  status: "Not Started",
  priority: "Medium",
  owner: "",

  notes: "",
  blocked: false,
  waitingOn: "",
  reviewCadence: "Weekly",

  confidentiality: "Internal",

  sourceUrls: [],
  evidenceIds: [],

  linkedTaskIds: [],
  linkedRiskIds: [],
  linkedCustomerIds: [],
  linkedMeetingIds: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedRoadmapItemIds: [],
  linkedDecisionIds: []
}
```

Not every collection must use every field.

Unused fields should be omitted when practical rather than stored as meaningless empty values.

---

## 5. People

### Collection

```text
people
```

### Purpose

Store every external person who touches FedEMR.

Examples include:

- Advisors
- Funders
- University contacts
- Research collaborators
- Government contacts
- Legal counsel
- Privacy contacts
- Security contacts
- Procurement officers
- Investors
- Potential customers
- Champions
- Decision-makers
- Introducers
- Subject-matter experts

### Schema

```javascript
{
  id: "person_001",

  firstName: "",
  lastName: "",
  displayName: "",

  title: "",
  department: "",

  primaryOrganizationId: "",
  additionalOrganizationIds: [],

  email: "",
  secondaryEmails: [],
  phone: "",
  mobilePhone: "",

  city: "",
  provinceState: "",
  country: "",
  timezone: "",

  linkedinUrl: "",
  profileUrl: "",

  relationshipTypes: [],
  focusAreas: [],
  expertiseAreas: [],

  influenceLevel: "Unknown",
  decisionAuthority: "Unknown",
  relationshipStrength: "Unknown",

  internalRelationshipOwner: "",
  preferredCommunicationMethod: "",

  lastInteractionDate: "",
  nextFollowUpDate: "",

  active: true,
  confidentiality: "Confidential",

  notes: "",

  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedFundingApplicationIds: [],
  linkedCustomerIds: [],
  linkedMeetingIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedTaskIds: [],
  linkedFollowUpIds: [],
  linkedInteractionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Duplicate detection

Primary duplicate checks:

1. Email address
2. LinkedIn URL
3. Name plus organization
4. Phone number

Potential duplicates should be flagged for manual review rather than merged automatically.

---

## 6. Organizations

### Collection

```text
organizations
```

### Purpose

Store institutions, companies, funders, government departments, research networks, legal firms, health systems, customers, vendors, and partners.

### Schema

```javascript
{
  id: "org_001",

  name: "",
  legalName: "",
  shortName: "",

  organizationType: "",
  sector: "",
  parentOrganizationId: "",

  websiteUrl: "",
  publicProfileUrl: "",

  streetAddress: "",
  city: "",
  provinceState: "",
  postalCode: "",
  country: "",

  relationshipOwner: "",
  relationshipStrength: "Unknown",

  active: true,
  confidentiality: "Internal",

  notes: "",

  linkedPersonIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedFundingApplicationIds: [],
  linkedMeetingIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedTaskIds: [],
  linkedRiskIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Organization types

- University
- Health system
- Government
- Funder
- Research network
- Legal firm
- Consulting firm
- Customer
- Potential customer
- Investor
- Industry partner
- Vendor
- Non-profit
- Foundation
- Technology-transfer organization
- Accelerator
- Incubator

---

## 7. Relationships

### Collection

```text
relationships
```

### Purpose

Store contextual relationships between records.

A person may have multiple roles across different modules.

### Schema

```javascript
{
  id: "relationship_001",

  fromType: "person",
  fromId: "person_001",

  toType: "fundingOpportunity",
  toId: "funding_001",

  relationshipType: "Program Officer",

  startDate: "",
  endDate: "",

  active: true,
  primary: false,

  notes: "",
  confidentiality: "Internal",

  createdAt: "",
  updatedAt: ""
}
```

### Relationship types

- Program Officer
- Advisor
- Decision-maker
- Champion
- Collaborator
- Legal Counsel
- Procurement Contact
- Research Lead
- Principal Investigator
- Introducer
- Reviewer
- Executive Sponsor
- Technical Contact
- Institutional Approver
- Funder Contact
- Customer Contact
- Government Contact
- University Contact
- Privacy Contact
- Security Contact

---

## 8. Interactions

### Collection

```text
interactions
```

### Purpose

Track meetings, calls, emails, introductions, commitments, and relationship activity.

### Schema

```javascript
{
  id: "interaction_001",

  interactionType: "Meeting",

  date: "",
  subject: "",

  personIds: [],
  organizationIds: [],

  summary: "",
  decisions: "",

  commitmentsMadeByFedEMR: [],
  commitmentsMadeByOthers: [],

  followUpRequired: false,
  followUpDate: "",

  owner: "",
  confidentiality: "Confidential",

  linkedMeetingId: "",
  linkedTaskIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Interaction types

- Meeting
- Email
- Phone call
- Video call
- Introduction
- Conference interaction
- Informal conversation
- Document exchange
- Decision
- Follow-up

---

## 9. Follow-Ups

### Collection

```text
followUps
```

### Purpose

Track relationship-driven actions, outstanding commitments, and overdue responses.

### Schema

```javascript
{
  id: "followup_001",

  title: "",
  description: "",

  dueDate: "",
  status: "Open",
  priority: "Medium",

  owner: "",

  personIds: [],
  organizationIds: [],

  linkedInteractionId: "",
  linkedTaskId: "",
  linkedCustomerId: "",
  linkedFundingOpportunityId: "",
  linkedPathwayCaseId: "",

  waitingOn: "",
  completedDate: "",

  confidentiality: "Internal",

  createdAt: "",
  updatedAt: ""
}
```

---

## 10. Funding Opportunities

### Collection

```text
fundingOpportunities
```

### Purpose

Discover, validate, score, and manage potential external funding opportunities.

### Schema

```javascript
{
  id: "funding_001",

  title: "",
  programName: "",

  funderOrganizationId: "",
  programContactPersonIds: [],

  pathway: "Commercial",
  status: "Discovered",

  amountMin: 0,
  amountMax: 0,
  currency: "CAD",

  deadline: "",
  internalDeadline: "",

  applicationOpenDate: "",
  decisionDateEstimate: "",
  projectStartDateEstimate: "",

  repayable: false,
  repaymentDetails: "",

  matchingRequired: false,
  matchingPercentage: 0,
  matchingDetails: "",

  eligibilitySummary: "",
  eligibilityConfirmed: false,

  trlMinimum: null,
  trlMaximum: null,

  geographicRestrictions: [],
  organizationTypeRestrictions: [],
  sectorRestrictions: [],

  requiredPartners: [],
  requiredApprovals: [],
  requiredDocuments: [],

  eligibleExpenses: [],
  ineligibleExpenses: [],

  strategicPurpose: "",
  commercializationBlockersAddressed: [],
  researchGoalsAddressed: [],

  applicationEffortHours: 0,
  applicationComplexity: "Unknown",

  probabilityOfSuccess: 0,

  eligibilityScore: 0,
  strategicAlignmentScore: 0,
  impactScore: 0,
  fundingVsEffortScore: 0,
  probabilityScore: 0,
  timingScore: 0,
  partnerReadinessScore: 0,
  overallFitScore: 0,

  scoreExplanation: "",
  eligibilityRisks: [],
  unknowns: [],

  sourceUrls: [],
  lastVerifiedDate: "",
  verifiedBy: "",
  verificationStatus: "Unverified",
  confidence: "Unknown",

  confidentiality: "Internal",

  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedApplicationIds: [],
  linkedWorkPackageIds: [],
  linkedTaskIds: [],
  linkedRiskIds: [],
  linkedPathwayIds: [],
  linkedDocumentIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Funding pathways

- Commercial
- Research
- Hybrid

### Funding statuses

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

---

## 11. Funding Applications

### Collection

```text
fundingApplications
```

### Purpose

Manage the actual development, review, submission, and outcome of a selected funding opportunity.

### Schema

```javascript
{
  id: "application_001",

  fundingOpportunityId: "",

  title: "",
  status: "Planning",

  leadOrganizationId: "",
  partnerOrganizationIds: [],

  leadPersonId: "",
  contributorPersonIds: [],

  requestedAmount: 0,
  totalProjectBudget: 0,
  matchingAmount: 0,

  internalDeadline: "",
  funderDeadline: "",

  executiveSummary: "",
  problemStatement: "",
  proposedSolution: "",
  commercializationPlan: "",
  researchPlan: "",
  workPlan: "",
  impactStatement: "",
  roiStatement: "",
  budgetJustification: "",

  requiredSections: [],
  completedSections: [],

  requiredDocuments: [],
  uploadedDocumentIds: [],

  requiredApprovals: [],
  completedApprovals: [],

  reviewComments: [],
  submissionConfirmation: "",

  outcome: "",
  awardAmount: 0,

  confidentiality: "Confidential",

  linkedTaskIds: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedWorkPackageIds: [],
  linkedPathwayCaseIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Application statuses

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

---

## 12. Institutional Pathways

### Collection

```text
institutionalPathways
```

### Purpose

Store reusable institutional process maps.

Initial focus is the University of Calgary ecosystem.

### Schema

```javascript
{
  id: "pathway_001",

  title: "",
  institutionOrganizationId: "",

  category: "",
  trigger: "",
  intendedOutcome: "",

  description: "",

  departmentOrganizationIds: [],
  contactRoleRequirements: [],

  requiredDocuments: [],
  requiredApprovals: [],

  decisionPoints: [],
  dependencies: [],
  parallelSteps: [],
  commonDelays: [],
  escalationRoutes: [],

  estimatedDurationDays: null,

  sourceUrls: [],
  lastVerifiedDate: "",
  verifiedByPersonId: "",

  verificationStatus: "Needs Verification",
  confidence: "Unknown",

  knownExceptions: [],
  openQuestions: [],

  active: true,
  confidentiality: "Internal",

  linkedStepIds: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedCaseIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Verification statuses

- Confirmed
- Likely
- Uncertain
- Outdated
- Needs Verification

### Initial pathway categories

- Company formation
- University spinout
- IP disclosure
- IP ownership
- Technology licensing
- Shareholder agreement
- Conflict of interest
- Conflict of commitment
- Faculty participation in company
- Research agreement
- Commercial agreement
- Sponsored research
- Legal review
- Sole-source justification
- Procurement
- Privacy review
- Security review
- Institutional grant approval
- Innovate Calgary
- Cumming School of Medicine
- University legal
- Hunter Hub
- Alberta Innovates
- Research Services
- Institutional signature
- University branding

---

## 13. Pathway Steps

### Collection

```text
pathwaySteps
```

### Purpose

Store the ordered steps inside an institutional pathway.

### Schema

```javascript
{
  id: "pathway_step_001",

  pathwayId: "",

  sequenceNumber: 1,
  title: "",
  description: "",

  responsibleDepartmentOrganizationId: "",
  responsibleContactRole: "",

  requiredDocumentIds: [],
  requiredEvidenceIds: [],

  approvalRequired: false,
  approvalType: "",

  dependencyStepIds: [],
  parallelStepIds: [],

  estimatedHours: 0,
  estimatedDurationDays: 0,

  escalationInstruction: "",

  sourceUrls: [],
  lastVerifiedDate: "",
  confidence: "Unknown",

  createdAt: "",
  updatedAt: ""
}
```

---

## 14. Pathway Cases

### Collection

```text
pathwayCases
```

### Purpose

Track an actual FedEMR situation moving through an institutional pathway.

The pathway is the reusable map.

The pathway case is the real active situation.

### Schema

```javascript
{
  id: "pathway_case_001",

  pathwayId: "",

  title: "",
  description: "",

  status: "Not Started",
  currentStepId: "",

  owner: "",
  priority: "Medium",

  startDate: "",
  targetCompletionDate: "",
  actualCompletionDate: "",

  organizationIds: [],
  personIds: [],

  submittedDocumentIds: [],
  requiredDocumentIds: [],

  completedStepIds: [],
  blockedStepIds: [],

  decisionsRequired: [],
  openQuestions: [],

  waitingOn: "",
  blockerSummary: "",

  confidentiality: "Confidential",

  linkedTaskIds: [],
  linkedRiskIds: [],
  linkedFundingOpportunityIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  linkedEvidenceIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Pathway case statuses

- Not Started
- Discovery
- In Progress
- Waiting on Internal
- Waiting on External
- At Risk
- Blocked
- Complete
- Cancelled

---

## 15. Work Packages

### Collection

```text
workPackages
```

### Purpose

Group related tasks and estimate what is required to achieve a business outcome.

### Schema

```javascript
{
  id: "workpackage_001",

  title: "",
  outcome: "",
  description: "",

  pathway: "Company",

  status: "Not Started",
  priority: "Medium",
  owner: "",

  startDate: "",
  targetCompletionDate: "",

  estimatedInternalHours: 0,
  estimatedExternalHours: 0,
  estimatedDurationWeeks: 0,

  estimatedInternalCost: 0,
  estimatedExternalCost: 0,
  estimatedTotalCost: 0,

  currency: "CAD",

  requiredRoles: [],
  studentSuitableTasks: [],

  undergraduateSuitable: false,
  graduateStudentSuitable: false,

  consultantRequired: false,
  contractorRequired: false,
  externalVendorRequired: false,

  dependencies: [],
  approvalRequirements: [],

  fundingRequired: false,
  fundingGap: 0,

  confidence: "Estimated",

  confidentiality: "Internal",

  linkedTaskIds: [],
  linkedResourceRequirementIds: [],
  linkedFundingOpportunityIds: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedCustomerIds: [],
  linkedPathwayCaseIds: [],
  linkedRiskIds: [],
  linkedRoadmapItemIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Work-package pathways

- Company
- Research
- Hybrid

### Initial work packages

- Cybersecurity and procurement package
- First-customer deployment readiness
- Funding application development
- University/company legal clarification
- Commercial pricing package
- ROI evidence package

---

## 16. Resource Requirements

### Collection

```text
resourceRequirements
```

### Purpose

Store the labour, expertise, vendor, funding, and capacity requirements for a work package or task.

### Schema

```javascript
{
  id: "resource_001",

  workPackageId: "",

  requirementType: "Role",

  title: "",
  description: "",

  requiredExpertise: [],
  requiredRole: "",

  companyOrResearchSide: "Company",
  resourceSource: "Internal",

  studentSuitable: false,
  undergraduateSuitable: false,
  graduateStudentSuitable: false,

  estimatedHours: 0,
  estimatedHourlyRate: 0,
  estimatedFixedCost: 0,

  currency: "CAD",

  estimatedStartDate: "",
  estimatedEndDate: "",

  assignedPersonId: "",
  assignedOrganizationId: "",

  fundingRequired: false,
  linkedFundingOpportunityIds: [],

  confidence: "Estimated",
  status: "Unassigned",

  createdAt: "",
  updatedAt: ""
}
```

### Requirement types

- Role
- Person
- Consultant
- Contractor
- Student
- Vendor
- Software
- Legal
- Audit
- Travel
- Equipment
- Data
- Approval

### Resource sources

- Internal
- University
- Company hire
- Undergraduate student
- Graduate student
- Contractor
- Consultant
- External vendor
- Partner organization

---

## 17. Documents

### Collection

```text
documents
```

### Purpose

Track files, links, agreements, policies, grant materials, presentations, and evidence documents.

### Schema

```javascript
{
  id: "document_001",

  title: "",
  documentType: "",

  fileName: "",
  fileUrl: "",
  storageLocation: "",

  version: "",
  status: "Draft",

  owner: "",

  effectiveDate: "",
  expiryDate: "",

  confidentiality: "Confidential",

  sourceOrganizationId: "",
  sourcePersonId: "",

  linkedTaskIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedFundingApplicationIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  linkedEvidenceIds: [],

  notes: "",

  createdAt: "",
  updatedAt: ""
}
```

### Document types

- Agreement
- Policy
- Procedure
- Funding guideline
- Grant application
- Presentation
- Budget
- Legal document
- Security document
- Privacy document
- Procurement document
- Insurance document
- Research document
- Customer document
- Meeting document
- Evidence package
- Report
- Letter of support
- Briefing note

---

## 18. Evidence

### Collection

```text
evidence
```

### Purpose

Store the evidence supporting claims, scores, decisions, pathways, and commercialization statements.

### Schema

```javascript
{
  id: "evidence_001",

  title: "",
  evidenceType: "",

  claimSupported: "",
  description: "",

  sourceUrl: "",
  sourceDocumentId: "",

  verified: false,
  verificationDate: "",
  verifiedBy: "",

  confidence: "Unknown",

  confidentiality: "Internal",

  linkedFundingOpportunityIds: [],
  linkedCustomerIds: [],
  linkedReadinessItemIds: [],
  linkedPathwayIds: [],
  linkedDecisionIds: [],
  linkedScoreIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Evidence types

- Policy
- Contract
- Research paper
- Customer statement
- Case study
- Benchmark
- Financial model
- Legal opinion
- Funding guideline
- Institutional process
- Meeting confirmation
- Email confirmation
- Government source
- University source
- Audit result
- Security result
- Procurement requirement

---

## 19. Decisions

### Collection

```text
decisions
```

### Purpose

Track important executive and operational decisions.

### Schema

```javascript
{
  id: "decision_001",

  title: "",
  question: "",

  status: "Open",

  decisionOwner: "",
  requiredByDate: "",

  options: [],
  recommendation: "",

  decision: "",
  decisionDate: "",

  rationale: "",
  impactSummary: "",

  risks: [],
  assumptions: [],
  unknowns: [],

  evidenceIds: [],

  confidentiality: "Confidential",

  linkedTaskIds: [],
  linkedRiskIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Decision statuses

- Open
- Analysis Required
- Waiting on Information
- Ready for Decision
- Decided
- Deferred
- Cancelled

---

## 20. Existing Collection Enhancements

The existing collections should be gradually updated to link to shared Version 0.5 records.

### Tasks

Add support for:

```javascript
{
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  confidentiality: "Internal"
}
```

### Customers

Add support for:

```javascript
{
  primaryOrganizationId: "",
  contactPersonIds: [],
  decisionMakerPersonIds: [],
  championPersonIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  confidentiality: "Confidential"
}
```

### Meetings

Add support for:

```javascript
{
  attendeePersonIds: [],
  organizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  confidentiality: "Confidential"
}
```

### Risks

Add support for:

```javascript
{
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  confidentiality: "Confidential"
}
```

### Funding Needs

Funding Needs should remain separate from Funding Opportunities.

- A Funding Need describes what FedEMR requires.
- A Funding Opportunity describes a possible external source.
- A Funding Application describes the submission effort.

Add support for:

```javascript
{
  linkedFundingOpportunityIds: [],
  linkedWorkPackageIds: [],
  linkedResourceRequirementIds: [],
  linkedDecisionIds: []
}
```

### Advisor Recommendations

Add support for:

```javascript
{
  advisorPersonId: "",
  advisorOrganizationId: "",
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  confidentiality: "Confidential"
}
```

### Roadmap Items

Add support for:

```javascript
{
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: []
}
```

---

## 21. Funding Fit Scoring

Funding opportunities should use a transparent weighted score.

### Weighting

- Eligibility: 25%
- Strategic alignment: 20%
- Commercial or research impact: 15%
- Funding amount versus effort: 15%
- Probability of success: 10%
- Timing: 10%
- Partner readiness: 5%

### Score record

```javascript
{
  eligibilityScore: 0,
  strategicAlignmentScore: 0,
  impactScore: 0,
  fundingVsEffortScore: 0,
  probabilityScore: 0,
  timingScore: 0,
  partnerReadinessScore: 0,

  overallFitScore: 0,

  explanation: "",
  eligibilityRisks: [],
  unknowns: [],

  calculatedAt: ""
}
```

### Score rules

The system must:

- Show component scores
- Show the weighting
- Explain the final score
- Identify unknowns
- Identify eligibility risks
- Identify missing partners
- Identify missing evidence
- Show the source and verification date
- Never invent funding rules or deadlines

---

## 22. Executive Score Records

Future versions should preserve score history.

### Schema

```javascript
{
  id: "score_snapshot_001",

  scoreType: "Company Health",
  score: 0,

  componentScores: [],
  explanation: "",

  sourceRecordIds: [],

  calculatedAt: "",

  previousScore: null,
  changeSincePrevious: null
}
```

### Score types

- Company Health
- Commercial Readiness
- Government Readiness
- Funding Readiness
- Risk Severity
- Pipeline Score
- Deployment Readiness
- Security Readiness
- Procurement Readiness
- Legal Readiness

---

## 23. Confidentiality Rules

### Public

May include:

- Public funding deadlines
- Public program information
- Public government requirements
- Public institutional policies
- Public website links
- Public contact information

### Internal

May include:

- Internal tasks
- General operating notes
- Non-sensitive planning
- High-level work estimates
- Internal readiness information

### Confidential

May include:

- Private contacts
- Customer discussions
- Advisor discussions
- Funding strategy
- Institutional cases
- Legal-process notes
- Internal budgets
- Private meeting notes

### Restricted

May include:

- Detailed finances
- Cap tables
- Legal strategy
- Shareholder information
- Sensitive commercial agreements
- Highly sensitive personal information
- Security credentials
- Authentication secrets

Restricted data must never be sent to external research tools without explicit approval and a defined purpose.

---

## 24. IndexedDB Migration Requirements

When new collections are implemented:

1. Increase the IndexedDB version.
2. Add missing object stores during `onupgradeneeded`.
3. Do not delete existing object stores.
4. Do not clear existing records.
5. Test migration using an existing populated browser database.
6. Test a clean installation using a fresh browser profile.
7. Confirm JSON import and export still work.
8. Confirm legacy exports can be imported safely.
9. Add default empty arrays for missing new collections.
10. Log migration errors clearly.
11. Preserve existing record IDs.
12. Add a schema version to exports.
13. Back up data before destructive migration.
14. Never silently discard unknown fields.

---

## 25. Import and Export Requirements

JSON export should include:

- Schema version
- Application version
- Export date
- All collections
- Data-classification metadata

### Example

```javascript
{
  schemaVersion: "0.5",
  appVersion: "0.5",
  exportedAt: "",

  data: {
    tasks: [],
    people: [],
    organizations: [],
    fundingOpportunities: [],
    institutionalPathways: [],
    workPackages: []
  }
}
```

Import should:

- Validate file structure
- Preserve unknown fields when safe
- Add missing collections as empty arrays
- Reject malformed data
- Warn before overwriting existing data
- Log import activity
- Preserve record IDs
- Report migration issues
- Support older exports when practical
- Never execute code contained in imported data

---

## 26. Relationship Integrity Rules

The system should enforce these rules:

1. People are stored once in `people`.
2. Organizations are stored once in `organizations`.
3. Other records refer to people and organizations by ID.
4. Deleting a person should not silently delete linked history.
5. Inactive people should normally be archived rather than deleted.
6. Relationship records should preserve start and end dates.
7. Reassigning a role should preserve the previous role history.
8. Duplicate records should be reviewed before merging.
9. Broken references should be reported.
10. Import should validate referenced IDs where practical.

---

## 27. Initial Sample Records

Public-repository sample data must be fictional or safely generalized.

Version 0.5 should eventually include sample records for:

### People

- Fictional funding-program advisor
- Fictional university legal contact
- Fictional research collaborator
- Fictional potential customer contact

### Organizations

- Fictional funding agency
- Fictional health system
- University of Calgary, using only public organizational information
- FedEMR Technologies Inc., using only approved non-confidential information

### Funding opportunities

- Fictional commercialization grant
- Fictional research grant
- Fictional hybrid implementation program

### Institutional pathways

- Conflict-of-interest review
- University/company commercial boundary
- Legal agreement review

### Work packages

- Cybersecurity and procurement package
- First-customer deployment readiness
- Funding application development

No private emails, phone numbers, detailed finances, legal strategy, or confidential customer information should be committed.

---

## 28. Version 0.5 Implementation Priority

Implement collections in this order:

1. People
2. Organizations
3. Funding Opportunities
4. Relationships
5. Follow-Ups
6. Funding Applications
7. Institutional Pathways
8. Pathway Steps
9. Pathway Cases
10. Work Packages
11. Resource Requirements
12. Documents
13. Evidence
14. Decisions

Not every advanced field must be exposed in the first user interface.

The data architecture should support expansion without requiring destructive redesign.

---

## 29. Version 0.5 Minimum UI Requirements

### People

The first People interface should support:

- Add person
- Edit person
- Archive person
- Search
- Organization link
- Relationship types
- Focus areas
- Last interaction
- Next follow-up
- Internal relationship owner

### Organizations

The first Organizations interface should support:

- Add organization
- Edit organization
- Search
- Organization type
- Sector
- Website
- Linked people
- Linked opportunities

### Funding Opportunities

The first Funding interface should support:

- Add opportunity
- Edit opportunity
- Status
- Pathway
- Amount
- Deadline
- Funder
- Program contact
- Eligibility summary
- Verification status
- Source URL
- Fit score
- Unknowns
- Decision status

### Institutional Pathways

The first Pathways interface should support:

- Add pathway
- Edit pathway
- Trigger
- Intended outcome
- Departments
- Contact roles
- Required documents
- Open questions
- Verification status
- Last verified date
- Source URLs

### Work Packages

The first Work Package interface should support:

- Add work package
- Edit work package
- Outcome
- Pathway
- Estimated hours
- Estimated cost
- Required roles
- Student suitability
- Funding requirement
- Linked funding opportunities
- Confidence level

---

## 30. Acceptance Criteria

The Version 0.5 data model is successful when:

- Existing data survives the IndexedDB upgrade.
- People and organizations are stored centrally.
- Funding opportunities can link to people and organizations.
- Funding contacts are not duplicated across modules.
- Funding opportunities can be scored transparently.
- Institutional pathways include verification metadata.
- Active pathway cases can track real FedEMR processes.
- Work packages can estimate hours, roles, costs, and funding gaps.
- Resource requirements can identify student-suitable work.
- Records can link across modules using stable IDs.
- Import and export remain functional.
- Confidentiality classifications are supported.
- No confidential sample data is committed to the public repository.
- No API keys are stored in browser code.
- No existing user data is silently deleted.
- No browser console errors are introduced.