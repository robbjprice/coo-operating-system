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
- Product and market intelligence
- Product-version tracking
- Capability tracking
- Audience-specific content
- Presentations
- Use cases
- Case studies
- Approved claims
- Customers and opportunities
- Tasks
- Risks
- Meetings
- Roadmap management
- Documents
- Evidence
- Decisions
- Future AI-supported workflows

The system should avoid duplicating people, organizations, product information, claims, capabilities, content, and relationships across modules.

Records should be connected using stable IDs.

---

## 2. Data Model Principles

### 2.1 Shared record structure

Most operational records should support:

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

Not every field must appear in every collection.

### 2.2 Stable identifiers

Every record must have a unique ID.

Relationships should store record IDs rather than copied names.

Example:

```javascript
{
  personId: "person_001",
  organizationId: "org_001",
  productVersionId: "product_version_001"
}
```

Contact details, product descriptions, claims, and capability definitions should not be duplicated across modules.

### 2.3 Data classification

Every record should support one of these classifications:

- `Public`
- `Internal`
- `Confidential`
- `Restricted`

### 2.4 Verification metadata

Records based on external rules, funding programs, institutional processes, product claims, case-study results, or public policies should support:

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

### 2.6 Audience awareness

Content and presentations should identify:

- Intended audience
- Technical depth
- Purpose
- Product version
- Approved claims
- Supporting evidence
- Confidentiality
- Approval status

### 2.7 Claims control

The data model must distinguish between:

- Verified claim
- Draft claim
- Planned capability
- Available capability
- Research-only capability
- Demonstrated result
- Hypothetical example
- Composite example
- Completed real-world case study

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

### Version 0.5 operating collections

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

### Product and Market collections

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

---

## 4. Shared Base Record

Most operational records should inherit or support:

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
  linkedFundingApplicationIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedRoadmapItemIds: [],
  linkedDecisionIds: [],
  linkedDocumentIds: [],

  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: []
}
```

Unused fields should be omitted where practical.

---

## 5. People

### Collection

```text
people
```

### Purpose

Store every external or relevant internal person who touches FedEMR.

Examples:

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
- Clinicians
- Researchers
- Product users
- Communications contacts

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
  audienceTypes: [],
  focusAreas: [],
  expertiseAreas: [],

  influenceLevel: "Unknown",
  decisionAuthority: "Unknown",
  relationshipStrength: "Unknown",

  internalRelationshipOwner: "",
  preferredCommunicationMethod: "",

  lastInteractionDate: "",
  nextFollowUpDate: "",

  productFeedback: [],
  capabilityRequests: [],
  presentationPreferences: [],

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
  linkedPresentationIds: [],
  linkedAudienceIds: [],
  linkedProductVersionIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],

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
  linkedPresentationIds: [],
  linkedAudienceIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Organization types

- Company
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
- Pharmaceutical company
- Medical device company

---

## 7. Relationships

### Collection

```text
relationships
```

### Purpose

Store contextual relationships between records.

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
- Product User
- Product Reviewer
- Presentation Audience
- Case-Study Participant
- Content Approver
- Claim Approver

---

## 8. Interactions

### Collection

```text
interactions
```

### Purpose

Track meetings, calls, emails, introductions, commitments, presentations, demonstrations, and relationship activity.

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

  productFeedback: [],
  capabilityRequests: [],
  objectionsRaised: [],
  contentRequests: [],

  followUpRequired: false,
  followUpDate: "",

  owner: "",
  confidentiality: "Confidential",

  linkedMeetingId: "",
  linkedTaskIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedPresentationIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedUseCaseIds: [],

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
- Presentation
- Product demonstration
- Product feedback
- Technical review

---

## 9. Follow-Ups

### Collection

```text
followUps
```

### Purpose

Track relationship-driven actions, outstanding commitments, content requests, and overdue responses.

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
  linkedPresentationId: "",
  linkedProductVersionId: "",
  linkedContentAssetId: "",

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
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedPresentationIds: [],

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

Manage the development, review, submission, and outcome of a selected funding opportunity.

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
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedPresentationIds: [],
  linkedApprovedClaimIds: [],

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
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],

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

---

## 13. Pathway Steps

### Collection

```text
pathwaySteps
```

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
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],

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

Group related tasks and estimate what is required to achieve a business, research, product, content, or deployment outcome.

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
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],

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
- Product release preparation
- Clinical audience content package
- Government presentation package
- Case-study development

---

## 16. Resource Requirements

### Collection

```text
resourceRequirements
```

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

  linkedProductVersionIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],

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
- Content Development
- Presentation Design
- Clinical Review
- Technical Review
- Claims Review

---

## 17. Documents

### Collection

```text
documents
```

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
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],

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
- Product specification
- Release note
- Training material
- Case-study source
- Claims evidence

---

## 18. Evidence

### Collection

```text
evidence
```

### Purpose

Store evidence supporting claims, scores, decisions, pathways, product capabilities, case studies, and commercialization statements.

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

  evidenceDate: "",
  productVersionId: "",

  verified: false,
  verificationDate: "",
  verifiedBy: "",

  confidence: "Unknown",
  evidenceStrength: "Unknown",

  confidentiality: "Internal",

  linkedFundingOpportunityIds: [],
  linkedCustomerIds: [],
  linkedReadinessItemIds: [],
  linkedPathwayIds: [],
  linkedDecisionIds: [],
  linkedScoreIds: [],
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],

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
- Technical test
- Product demonstration
- Deployment result
- Model-performance result
- User feedback
- Published result
- Internal measurement

---

## 19. Decisions

### Collection

```text
decisions
```

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
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],

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

# Product and Market Data Model

## 20. Products

### Collection

```text
products
```

### Purpose

Store the high-level product definition for FedEMR and any future related products or product lines.

### Schema

```javascript
{
  id: "product_001",

  name: "FedEMR",
  legalProductName: "",
  shortName: "FedEMR",

  productCategory: "Federated Learning Platform",
  productType: "Software Platform",

  summary: "",
  description: "",

  currentValueProposition: "",
  commercialPositioning: "",
  researchPositioning: "",

  primaryMarkets: [],
  primaryUsers: [],
  primaryAudiences: [],

  currentMaturity: "",
  currentTrl: 7,

  deploymentModel: "",
  privacyModel: "",
  dataHandlingSummary: "",

  differentiators: [],
  knownLimitations: [],

  supportedEnvironments: [],
  supportedOperatingSystems: [],
  supportedDeploymentTypes: [],

  productOwnerPersonId: "",
  technicalOwnerPersonId: "",
  commercialOwnerPersonId: "",

  currentProductVersionId: "",
  nextProductVersionId: "",

  status: "Active",
  confidentiality: "Internal",

  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],
  linkedRoadmapItemIds: [],
  linkedWorkPackageIds: [],
  linkedFundingOpportunityIds: [],
  linkedRiskIds: [],
  linkedDecisionIds: [],
  linkedDocumentIds: [],
  linkedEvidenceIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Product statuses

- Concept
- Active
- Maintenance
- Retired

---

## 21. Product Versions

### Collection

```text
productVersions
```

### Purpose

Track the current product version, future versions, release plans, improvements, limitations, dependencies, and readiness.

### Schema

```javascript
{
  id: "product_version_001",

  productId: "product_001",

  versionName: "",
  versionNumber: "",
  releaseType: "",

  status: "Planned",

  plannedReleaseDate: "",
  actualReleaseDate: "",

  productEnvironment: "",
  deploymentStage: "",

  summary: "",
  releaseObjective: "",

  improvementsOverPreviousVersion: [],
  capabilitiesIncluded: [],
  knownLimitations: [],

  technicalDependencies: [],
  infrastructureDependencies: [],
  integrationDependencies: [],

  securityChanges: [],
  privacyChanges: [],
  deploymentChanges: [],
  integrationChanges: [],
  userExperienceChanges: [],

  customerRequestsAddressed: [],
  researchRequestsAddressed: [],
  technicalDebtAddressed: [],

  commercialReadinessStatus: "",
  securityReadinessStatus: "",
  privacyReadinessStatus: "",
  documentationStatus: "",
  trainingStatus: "",
  supportReadinessStatus: "",
  deploymentReadinessStatus: "",

  productReadinessScore: 0,
  productReadinessExplanation: "",
  releaseBlockers: [],
  releaseRisks: [],
  decisionsRequired: [],

  releaseDecision: "",
  releaseDecisionDate: "",

  owner: "",
  technicalLeadPersonId: "",
  commercialLeadPersonId: "",

  confidentiality: "Confidential",

  linkedProductCapabilityIds: [],
  linkedRoadmapItemIds: [],
  linkedTaskIds: [],
  linkedWorkPackageIds: [],
  linkedRiskIds: [],
  linkedFundingOpportunityIds: [],
  linkedCustomerIds: [],
  linkedOrganizationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedPresentationIds: [],
  linkedContentAssetIds: [],
  linkedApprovedClaimIds: [],
  linkedEvidenceIds: [],
  linkedDecisionIds: [],
  linkedDocumentIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Version statuses

- Concept
- Planned
- In Development
- Testing
- Pilot
- Released
- Supported
- Maintenance
- Retired

### Release types

- Major
- Minor
- Patch
- Research Build
- Pilot Build
- Internal Build
- Commercial Release

---

## 22. Product Capabilities

### Collection

```text
productCapabilities
```

### Purpose

Maintain a structured source of truth for what FedEMR can do.

### Schema

```javascript
{
  id: "capability_001",

  productId: "product_001",

  name: "",
  shortName: "",
  category: "",

  description: "",
  technicalDescription: "",
  userDescription: "",

  availabilityStatus: "Planned",
  supportStatus: "",

  researchOnly: false,
  commerciallySupported: false,
  experimental: false,

  firstAvailableVersionId: "",
  currentSupportedVersionIds: [],
  plannedVersionIds: [],

  requiredInfrastructure: [],
  dependencies: [],
  supportedEnvironments: [],
  supportedOperatingSystems: [],
  supportedDeploymentTypes: [],

  knownLimitations: [],
  securityConsiderations: [],
  privacyConsiderations: [],

  evidenceStatus: "",
  demonstrationStatus: "",
  validationStatus: "",

  customerValue: "",
  researchValue: "",
  technicalValue: "",
  operationalValue: "",

  owner: "",
  confidentiality: "Internal",

  linkedProductVersionIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedEvidenceIds: [],
  linkedWorkPackageIds: [],
  linkedFundingOpportunityIds: [],
  linkedCustomerIds: [],
  linkedRiskIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Capability statuses

- Available
- In Development
- Planned
- Experimental
- Research-Only
- Pilot-Only
- Commercially Supported
- Deprecated

### Capability categories

- Federated learning
- Federated analytics
- Model development
- Model validation
- Model deployment
- Model monitoring
- Site onboarding
- Orchestration
- Data governance
- Privacy
- Security
- Cohort discovery
- Cohort selection
- Common data models
- Integration
- Auditability
- Reproducibility
- User experience
- Research collaboration
- Pharmaceutical research
- Health-system implementation

---

## 23. Audiences

### Collection

```text
audiences
```

### Purpose

Store reusable audience profiles so content and presentations can be tailored without changing the underlying facts.

### Schema

```javascript
{
  id: "audience_001",

  name: "",
  audienceType: "",

  description: "",
  knowledgeLevel: "",

  primaryGoals: [],
  primaryConcerns: [],
  commonObjections: [],
  commonQuestions: [],

  preferredTerminology: [],
  termsToAvoid: [],

  desiredTechnicalDepth: "",
  preferredEvidenceTypes: [],

  typicalCallToAction: "",

  privacyConcerns: [],
  securityConcerns: [],
  commercialConcerns: [],
  clinicalConcerns: [],
  researchConcerns: [],
  procurementConcerns: [],

  decisionCriteria: [],
  successMeasures: [],

  active: true,
  confidentiality: "Internal",

  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedApprovedClaimIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Initial audiences

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

---

## 24. Content Assets

### Collection

```text
contentAssets
```

### Purpose

Store reusable audience-specific content for websites, brochures, proposals, grants, presentations, emails, demonstrations, and communications.

### Schema

```javascript
{
  id: "content_asset_001",

  title: "",
  contentType: "",
  purpose: "",

  audienceIds: [],
  primaryAudienceId: "",

  productId: "",
  productVersionId: "",

  technicalDepth: "",

  coreMessage: "",
  problemStatement: "",
  productExplanation: "",
  benefits: [],
  proofPoints: [],
  privacyWording: "",
  securityWording: "",

  objectionsAndResponses: [],
  frequentlyAskedQuestions: [],

  callToAction: "",

  bodyContent: "",
  shortVersion: "",
  longVersion: "",

  draftStatus: "Draft",
  approvalStatus: "Not Reviewed",

  owner: "",
  reviewerPersonIds: [],
  approvedByPersonIds: [],

  lastReviewedDate: "",
  nextReviewDate: "",
  reviewCadence: "",

  confidentiality: "Internal",

  linkedApprovedClaimIds: [],
  linkedEvidenceIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedOrganizationIds: [],
  linkedMeetingIds: [],
  linkedFundingApplicationIds: [],
  linkedProductCapabilityIds: [],
  linkedDocumentIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Content types

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

### Draft statuses

- Idea
- Draft
- In Review
- Approved
- Published
- Retired

### Approval statuses

- Not Reviewed
- Under Review
- Approved
- Approved with Qualification
- Internal Only
- Rejected
- Needs Reverification

---

## 25. Presentations

### Collection

```text
presentations
```

### Purpose

Store presentations by audience, purpose, version, and usage rather than treating every deck as an isolated file.

### Schema

```javascript
{
  id: "presentation_001",

  title: "",
  presentationType: "",
  purpose: "",

  primaryAudienceId: "",
  audienceIds: [],

  productId: "",
  productVersionId: "",

  durationMinutes: 0,
  format: "",

  status: "Draft",
  approvalStatus: "Not Reviewed",

  fileName: "",
  fileUrl: "",
  storageLocation: "",
  documentId: "",

  outline: [],
  coreMessages: [],
  speakerNotes: "",
  callToAction: "",

  approvedClaimIds: [],
  evidenceIds: [],
  useCaseIds: [],
  caseStudyIds: [],
  contentAssetIds: [],
  productCapabilityIds: [],

  lastPresentedDate: "",
  presentationHistory: [],
  feedbackReceived: [],
  requiredRevisions: [],

  owner: "",
  reviewerPersonIds: [],
  approvedByPersonIds: [],

  confidentiality: "Internal",

  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedMeetingIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedFundingApplicationIds: [],
  linkedProductVersionIds: [],
  linkedDocumentIds: [],
  linkedWorkPackageIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Presentation types

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

### Presentation statuses

- Idea
- Draft
- In Review
- Approved
- Ready
- Presented
- Needs Update
- Archived

---

## 26. Use Cases

### Collection

```text
useCases
```

### Purpose

Describe what FedEMR could do, is designed to do, is being evaluated to do, or is commercially available to do.

### Schema

```javascript
{
  id: "use_case_001",

  title: "",
  category: "",

  environment: "",
  primaryUser: "",
  audienceIds: [],

  problem: "",
  currentWorkflow: "",
  fedemrWorkflow: "",

  dataSources: [],
  participatingSiteProfile: "",
  modelOrAnalysisType: "",

  privacyConstraints: [],
  securityConstraints: [],
  regulatoryConstraints: [],

  deploymentModel: "",

  expectedOutcome: "",
  economicValue: "",
  clinicalValue: "",
  researchValue: "",
  operationalValue: "",
  technicalValue: "",

  technicalRequirements: [],
  requiredProductCapabilityIds: [],
  requiredProductVersionIds: [],

  knownLimitations: [],
  dependencies: [],
  assumptions: [],
  unknowns: [],

  evidenceStatus: "",
  readinessLevel: "",
  status: "Idea",

  owner: "",
  confidentiality: "Internal",

  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],
  linkedEvidenceIds: [],
  linkedOrganizationIds: [],
  linkedPersonIds: [],
  linkedCustomerIds: [],
  linkedFundingOpportunityIds: [],
  linkedWorkPackageIds: [],
  linkedRiskIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Use-case statuses

- Idea
- Hypothetical
- Designed
- Demonstrated
- Validated
- Active
- Completed
- Commercially Available
- Archived

### Use-case categories

- Model development
- Model validation
- External validation
- Model deployment
- Model monitoring
- Cohort discovery
- Cohort selection
- Clinical trial feasibility
- Real-world evidence
- Precision medicine
- Sepsis
- Diabetes
- Cardiometabolic disease
- Heart attack
- Rare disease
- Capacity forecasting
- Treatment response
- Medical imaging
- Algorithmic fairness
- Cross-jurisdiction research
- Quality improvement
- Federated analytics
- Pharmaceutical research
- Research collaboration

---

## 27. Case Studies

### Collection

```text
caseStudies
```

### Purpose

Store completed, active, demonstrated, hypothetical, or composite examples with clear classification.

### Schema

```javascript
{
  id: "case_study_001",

  title: "",
  classification: "",
  publicationStatus: "",

  situation: "",
  challenge: "",
  environment: "",

  participatingOrganizationIds: [],
  participatingPersonIds: [],

  centralizedAnalysisBarrier: "",
  fedemrApproach: "",

  productId: "",
  productVersionId: "",
  productCapabilityIds: [],

  implementationSteps: [],
  implementationDuration: "",
  timeRequired: "",

  results: [],
  modelPerformance: [],
  operationalBenefit: "",
  clinicalBenefit: "",
  researchBenefit: "",
  economicBenefit: "",
  privacyOutcome: "",
  securityOutcome: "",

  lessonsLearned: [],
  testimonial: "",
  testimonialApproved: false,

  evidenceDocumentIds: [],
  evidenceIds: [],
  approvedClaimIds: [],

  confidentialityRestrictions: [],
  permissionStatus: "",
  externalUsePermitted: false,

  reviewDate: "",
  nextReviewDate: "",

  owner: "",
  confidentiality: "Confidential",

  linkedUseCaseIds: [],
  linkedPresentationIds: [],
  linkedContentAssetIds: [],
  linkedOrganizationIds: [],
  linkedPersonIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedApprovedClaimIds: [],
  linkedFundingOpportunityIds: [],
  linkedCustomerIds: [],
  linkedDocumentIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Case-study classifications

- Completed Real-World Case Study
- Active Implementation
- Research Demonstration
- Technical Validation
- Hypothetical Example
- Composite Example

### Publication statuses

- Private
- Internal
- Draft for Review
- Approved for Limited Use
- Approved for Public Use
- Published
- Retired

---

## 28. Approved Claims

### Collection

```text
approvedClaims
```

### Purpose

Maintain approved, evidence-linked language for external and internal communications.

### Schema

```javascript
{
  id: "claim_001",

  claimText: "",
  shortClaim: "",
  claimCategory: "",

  audienceIds: [],

  productId: "",
  productVersionIds: [],
  productCapabilityIds: [],

  evidenceIds: [],
  evidenceStrength: "",
  evidenceSummary: "",

  approvalStatus: "Draft",

  approvedByPersonIds: [],
  approvalDate: "",
  reviewDate: "",
  expiryDate: "",

  permittedContexts: [],
  prohibitedContexts: [],

  requiredQualifier: "",
  usageNotes: "",

  publicUsePermitted: false,
  confidentiality: "Internal",

  linkedPresentationIds: [],
  linkedContentAssetIds: [],
  linkedCaseStudyIds: [],
  linkedUseCaseIds: [],
  linkedFundingApplicationIds: [],
  linkedCustomerIds: [],
  linkedDocumentIds: [],
  linkedDecisionIds: [],

  createdAt: "",
  updatedAt: ""
}
```

### Claim statuses

- Draft
- Under Review
- Approved
- Approved with Qualification
- Internal Only
- Rejected
- Retired
- Needs Reverification

### Claim categories

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

---

## 29. Existing Collection Enhancements

### Tasks

Add:

```javascript
{
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: []
}
```

### Customers

Add:

```javascript
{
  primaryOrganizationId: "",
  contactPersonIds: [],
  decisionMakerPersonIds: [],
  championPersonIds: [],

  productVersionRequestedIds: [],
  productCapabilityRequestedIds: [],
  useCaseIds: [],
  presentationIds: [],
  contentAssetIds: [],

  linkedFundingOpportunityIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],

  confidentiality: "Confidential"
}
```

### Meetings

Add:

```javascript
{
  attendeePersonIds: [],
  organizationIds: [],

  productFeedback: [],
  capabilityRequests: [],
  audienceNeeds: [],
  contentRequests: [],

  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: [],

  confidentiality: "Confidential"
}
```

### Risks

Add:

```javascript
{
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: []
}
```

### Funding Needs

Add:

```javascript
{
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: []
}
```

### Advisor Recommendations

Add:

```javascript
{
  advisorPersonId: "",
  advisorOrganizationId: "",

  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: []
}
```

### Roadmap Items

Add:

```javascript
{
  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: []
}
```

---

## 30. Product Readiness Scoring

Product versions should support transparent readiness scoring.

### Initial components

- Core capability readiness
- Product stability
- Deployment readiness
- Security readiness
- Privacy readiness
- Documentation completeness
- Support readiness
- Training readiness
- Integration readiness
- Evidence strength
- Commercial packaging readiness
- Release-blocker severity

### Example score record

```javascript
{
  productVersionId: "",

  coreCapabilityScore: 0,
  stabilityScore: 0,
  deploymentReadinessScore: 0,
  securityReadinessScore: 0,
  privacyReadinessScore: 0,
  documentationScore: 0,
  supportReadinessScore: 0,
  trainingReadinessScore: 0,
  integrationReadinessScore: 0,
  evidenceStrengthScore: 0,
  commercialPackagingScore: 0,
  releaseBlockerScore: 0,

  overallProductReadinessScore: 0,

  explanation: "",
  blockers: [],
  unknowns: [],
  sourceRecordIds: [],

  calculatedAt: ""
}
```

A Product Readiness score must not imply regulatory, clinical, security, procurement, or commercial approval unless those approvals are explicitly documented.

---

## 31. Funding Fit Scoring

### Weighting

- Eligibility: 25%
- Strategic alignment: 20%
- Commercial or research impact: 15%
- Funding amount versus effort: 15%
- Probability of success: 10%
- Timing: 10%
- Partner readiness: 5%

The score should also display:

- Product versions supported
- Capabilities supported
- Use cases supported
- Work packages funded
- Content or presentation requirements

The system must never invent funding rules or deadlines.

---

## 32. Executive Score Records

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
- Product Readiness
- Funding Readiness
- Risk Severity
- Pipeline Score
- Deployment Readiness
- Security Readiness
- Procurement Readiness
- Legal Readiness
- Content Readiness
- Evidence Readiness

---

## 33. Confidentiality Rules

### Public

May include:

- Public funding deadlines
- Public government requirements
- Public institutional policies
- Public product descriptions
- Approved public claims
- Published case studies
- Approved public presentations

### Internal

May include:

- Internal tasks
- General planning
- Draft product descriptions
- Non-sensitive work estimates
- Internal audience content
- Draft use cases

### Confidential

May include:

- Private contacts
- Customer discussions
- Advisor discussions
- Funding strategy
- Unreleased product versions
- Product roadmap details
- Draft presentations
- Unpublished case studies
- Product limitations
- Internal test results

### Restricted

May include:

- Detailed finances
- Cap tables
- Legal strategy
- Sensitive security details
- Confidential commercial agreements
- Restricted customer information
- Authentication secrets
- Highly sensitive product vulnerabilities

Restricted data must never be sent to external research tools without explicit approval.

---

## 34. IndexedDB Migration Requirements

When Product and Market collections are implemented:

1. Increase the IndexedDB version from 2 to 3.
2. Add all missing Product and Market object stores.
3. Do not delete existing object stores.
4. Do not clear existing records.
5. Seed only newly created stores.
6. Test using the existing populated browser database.
7. Test a clean installation using a fresh browser profile.
8. Confirm JSON import and export still work.
9. Confirm older exports can still be imported safely.
10. Add missing collections as empty arrays.
11. Preserve existing record IDs.
12. Preserve unknown fields.
13. Log migration errors clearly.
14. Close duplicate browser tabs before database upgrades.
15. Never silently discard data.

New object stores:

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

---

## 35. Import and Export Requirements

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
    products: [],
    productVersions: [],
    productCapabilities: [],
    audiences: [],
    contentAssets: [],
    presentations: [],
    useCases: [],
    caseStudies: [],
    approvedClaims: []
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
- Support older exports where practical
- Never execute code contained in imported data

---

## 36. Relationship Integrity Rules

1. People are stored once in `people`.
2. Organizations are stored once in `organizations`.
3. Products are stored once in `products`.
4. Product versions belong to a product.
5. Product capabilities link to versions by ID.
6. Audience profiles are reusable.
7. Content assets link to audiences instead of duplicating audience definitions.
8. Presentations link to content, claims, evidence, use cases, and product versions.
9. Case studies must identify their classification.
10. Claims must link to evidence.
11. Planned capabilities must not be represented as available.
12. Research-only capabilities must not be represented as commercially supported.
13. Hypothetical examples must not be represented as completed deployments.
14. Deleting a linked record must not silently erase historical records.
15. Broken references should be reported.
16. Duplicate records should be reviewed before merging.
17. Import should validate linked IDs where practical.

---

## 37. Initial Sample Records

Public-repository sample data must be fictional, approved, or safely generalized.

### Products

- FedEMR, using approved high-level product information only

### Product versions

- Current generalized FedEMR research platform
- Planned FedEMR V2 zero-code platform

### Product capabilities

- Federated model training
- Federated analytics
- Local data control
- No patient-level data transfer
- Multi-site orchestration
- Zero-code workflow
- Model validation
- Deployment support

### Audiences

- Clinical physicians
- Researchers
- Government
- Health-system executives
- Privacy and legal teams
- Technical teams
- Pharmaceutical companies
- Funders

### Content assets

- General product explanation
- Physician explanation
- Researcher explanation
- Government value proposition
- Privacy explanation

### Presentations

- Government briefing
- Research collaboration deck
- Technical overview
- Conference presentation

### Use cases

- Multi-site clinical prediction
- Federated model validation
- Cardiometabolic modelling
- Pharmaceutical cohort discovery
- Cross-jurisdiction research

### Case studies

Only fictional, generalized, hypothetical, composite, or explicitly approved examples should be included.

### Approved claims

Only claims supported by approved evidence or clearly labelled draft sample claims should be included.

No private emails, phone numbers, customer names, detailed finances, confidential legal strategy, unpublished results, or sensitive product details should be committed.

---

## 38. Version 0.5 Implementation Priority

Implement in this order:

1. People
2. Organizations
3. Products
4. Product Versions
5. Product Capabilities
6. Audiences
7. Content Assets
8. Presentations
9. Use Cases
10. Case Studies
11. Approved Claims
12. Funding Opportunities
13. Relationships
14. Follow-Ups
15. Funding Applications
16. Institutional Pathways
17. Pathway Steps
18. Pathway Cases
19. Work Packages
20. Resource Requirements
21. Documents
22. Evidence
23. Decisions

Not every advanced field must appear in the first interface.

The architecture should support expansion without destructive redesign.

---

## 39. Minimum UI Requirements

### Products

- Add product
- Edit product
- Product overview
- Current version
- Next version
- Value proposition
- Product maturity
- TRL
- Deployment model
- Privacy model
- Differentiators
- Limitations

### Product Versions

- Add version
- Edit version
- Version number
- Status
- Planned release date
- Improvements
- Capabilities
- Release blockers
- Known limitations
- Readiness status
- Linked work packages
- Linked risks
- Linked funding

### Product Capabilities

- Add capability
- Edit capability
- Category
- Availability status
- Research-only status
- Commercial support status
- Product versions
- Dependencies
- Limitations
- Evidence status
- Linked use cases

### Audiences

- Add audience
- Edit audience
- Primary concerns
- Preferred terminology
- Technical depth
- Objections
- Evidence preferences
- Call to action

### Content Assets

- Add content
- Edit content
- Audience
- Content type
- Product version
- Core message
- Approval status
- Approved claims
- Review date

### Presentations

- Add presentation
- Edit presentation
- Audience
- Purpose
- Type
- Duration
- Product version
- File reference
- Status
- Approved claims
- Evidence
- Use cases
- Case studies
- Presentation history

### Use Cases

- Add use case
- Edit use case
- Problem
- FedEMR workflow
- Environment
- Required capabilities
- Product version
- Benefits
- Status
- Evidence
- Readiness

### Case Studies

- Add case study
- Edit case study
- Classification
- Publication status
- Environment
- Approach
- Results
- Evidence
- Permissions
- Confidentiality
- Linked claims

### Approved Claims

- Add claim
- Edit claim
- Audience
- Product version
- Capability
- Evidence
- Approval status
- Required qualifier
- Permitted contexts
- Review date

---

## 40. Acceptance Criteria

The Version 0.5 data model is successful when:

- Existing data survives IndexedDB upgrades.
- People and organizations are stored centrally.
- Product information is stored centrally.
- The current product version can be identified.
- The next planned product version can be identified.
- Product improvements and release blockers can be stored.
- Capabilities can be classified accurately.
- Research-only and commercially supported capabilities are distinguishable.
- Audience profiles can be stored and reused.
- Audience-specific content can be linked to audiences and product versions.
- Presentations can link to audiences, claims, evidence, use cases, and case studies.
- Use cases can be classified by maturity.
- Case studies can be classified as real, active, demonstrated, hypothetical, or composite.
- Approved claims can link to evidence and required qualifiers.
- Planned capabilities are not represented as available.
- Hypothetical examples are not represented as completed deployments.
- Funding opportunities can link to product versions, capabilities, and use cases.
- Institutional pathways retain verification metadata.
- Work packages can link to product releases, content, and presentations.
- Import and export remain functional.
- Confidentiality classifications are supported.
- No confidential sample data is committed.
- No existing user data is silently deleted.
- No browser console errors are introduced.