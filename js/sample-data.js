import { uid, nowIso } from './utils.js';

const commonLinks = () => ({
  linkedTasks: [],
  linkedRisks: [],
  linkedCustomers: [],
  linkedMeetings: [],
  linkedReadinessItems: [],
  linkedRoadmapItems: [],
  linkedPersonIds: [],
  linkedOrganizationIds: [],
  linkedFundingOpportunityIds: [],
  linkedFundingApplicationIds: [],
  linkedPathwayIds: [],
  linkedPathwayCaseIds: [],
  linkedWorkPackageIds: [],
  linkedDecisionIds: [],
  linkedDocumentIds: [],
  linkedEvidenceIds: []
});

const base = (prefix, extra = {}) => ({
  id: uid(prefix),
  createdAt: nowIso(),
  updatedAt: nowIso(),

  status: 'Not Started',
  priority: 'Medium',
  owner: 'Robb',

  notes: '',
  blocked: false,
  waitingOn: '',
  reviewCadence: 'Weekly',

  confidentiality: 'Internal',

  sourceUrls: [],
  evidenceIds: [],

  ...commonLinks(),
  ...extra
});

const fixed = (id, extra = {}) => ({
  id,
  createdAt: nowIso(),
  updatedAt: nowIso(),

  status: 'Not Started',
  priority: 'Medium',
  owner: 'Robb',

  notes: '',
  blocked: false,
  waitingOn: '',
  reviewCadence: 'Weekly',

  confidentiality: 'Internal',

  sourceUrls: [],
  evidenceIds: [],

  ...commonLinks(),
  ...extra
});

export const collections = [
  'tasks',
  'readinessItems',
  'governmentReadinessItems',
  'customers',
  'meetings',
  'advisorRecommendations',
  'risks',
  'fundingNeeds',
  'roadmapItems',
  'settings',
  'activityLog',

  'people',
  'organizations',
  'relationships',
  'interactions',
  'followUps',

  'fundingOpportunities',
  'fundingApplications',

  'institutionalPathways',
  'pathwaySteps',
  'pathwayCases',

  'workPackages',
  'resourceRequirements',

  'documents',
  'evidence',
  'decisions'
];

export const sampleData = {
  settings: [
    {
      id: 'settings_default',
      appName: 'FedEMR COO Operating System',
      appVersion: '0.5',
      schemaVersion: '0.5',
      theme: 'light',
      createdAt: nowIso(),
      updatedAt: nowIso()
    }
  ],

  tasks: [
    base('task', {
      title:
        'Confirm minimum insurance requirements for first health-system buyer',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2026-07-15',
      category: 'Insurance',
      blocked: true,
      waitingOn:
        'Broker quote and cyber coverage requirements',
      notes:
        'Needed before serious government or health-system procurement discussions.'
    }),

    base('task', {
      title:
        'Draft SaaS licensing agreement issue list',
      status: 'Not Started',
      priority: 'High',
      dueDate: '2026-07-18',
      category: 'Legal',
      waitingOn: 'Legal direction',
      notes:
        'Include data ownership, model ownership, deployment scope, support, liability, and termination.'
    }),

    base('task', {
      title:
        'Create first-customer deployment checklist',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2026-07-22',
      category: 'Deployment',
      notes:
        'Include pre-deployment, go-live, support, measurement, and 90-day ROI tracking.'
    }),

    base('task', {
      title:
        'Define ROI metrics for 90 days after deployment',
      status: 'Not Started',
      priority: 'High',
      dueDate: '2026-07-25',
      category: 'ROI',
      notes:
        'Track time-to-value, analyst hours saved, sites onboarded, model performance, procurement cycle, and evidence.'
    }),

    base('task', {
      title:
        'Build advisor recommendation review rhythm',
      status: 'Not Started',
      priority: 'Medium',
      dueDate: '2026-07-19',
      category: 'Operations',
      notes:
        'Recommendations need owners and outcomes, not inspirational confetti.'
    })
  ],

  readinessItems: [
    base('ready', {
      title: 'Commercial SaaS contracting path',
      category: 'Legal',
      description:
        'Clear contracting path for paid non-research customers.',
      status: 'At Risk',
      priority: 'High',
      completionPercentage: 25,
      estimatedCost: 15000,
      blockingIssue:
        'Need legal agreement template and company/university boundary clarity.'
    }),

    base('ready', {
      title: 'Cybersecurity package',
      category: 'Cybersecurity',
      description:
        'Security posture, controls summary, incident response, data handling, and audit readiness.',
      status: 'Not Started',
      priority: 'High',
      completionPercentage: 10,
      estimatedCost: 30000,
      blockingIssue:
        'No formal security package assembled yet.'
    }),

    base('ready', {
      title: 'Procurement documentation binder',
      category: 'Procurement',
      description:
        'Vendor documents, insurance, privacy, security, references, contracting, and pricing.',
      status: 'In Progress',
      priority: 'High',
      completionPercentage: 35,
      estimatedCost: 5000
    }),

    base('ready', {
      title: 'Pricing and packaging',
      category: 'Sales',
      description:
        'License, deployment, support, research collaboration, and enterprise pricing.',
      status: 'In Progress',
      priority: 'High',
      completionPercentage: 40,
      estimatedCost: 0
    }),

    base('ready', {
      title: 'ROI evidence framework',
      category: 'Finance',
      description:
        'Measures that prove economic and operational value after deployment.',
      status: 'Not Started',
      priority: 'High',
      completionPercentage: 15,
      estimatedCost: 7500
    })
  ],

  governmentReadinessItems: [
    base('gov', {
      title: 'Government vendor registration',
      organization: 'Government buyer',
      category: 'Vendor Registration',
      description:
        'Identify registration, procurement portal, and documentation requirements.',
      status: 'Not Started',
      priority: 'High',
      completionPercentage: 15,
      requiredDocumentation:
        'Corporate profile, insurance, banking, tax, and security documentation.'
    }),

    base('gov', {
      title: 'Health-system procurement pathway',
      organization: 'Health system',
      category: 'Procurement',
      description:
        'Clarify whether entry occurs through a pilot, innovation pathway, research agreement, or paid procurement.',
      status: 'At Risk',
      priority: 'High',
      completionPercentage: 20,
      blockingIssue:
        'Procurement pathway not yet confirmed.'
    }),

    base('gov', {
      title: 'University commercial boundary',
      organization: 'University',
      category: 'Legal Agreements',
      description:
        'Clarify the relationship between university research activity and commercial sales.',
      status: 'In Progress',
      priority: 'High',
      completionPercentage: 35,
      waitingOn:
        'University legal and conflict-of-interest guidance.'
    }),

    base('gov', {
      title: 'Federal vendor pathway',
      organization: 'Federal government',
      category: 'Vendor Registration',
      description:
        'Determine whether supplier registration is required for federal opportunities.',
      status: 'Not Started',
      priority: 'Medium',
      completionPercentage: 10
    })
  ],

  customers: [
    base('cust', {
      name: 'Government health-system buyer',
      organizationName:
        'Government health-system buyer',
      contactNames: 'TBD',
      sector: 'Government / Health System',
      opportunityType: 'First deployment',
      stage: 'Discovery',
      probability: 35,
      estimatedValue: 250000,
      expectedCloseDate: '2026-10-15',
      nextStep:
        'Confirm procurement path and minimum security requirements.',
      decisionMaker: 'TBD',
      procurementPath: 'Unknown'
    }),

    base('cust', {
      name:
        'University research alliance deployment',
      organizationName:
        'University research alliance deployment',
      contactNames: 'Research collaborators',
      sector: 'University / Research',
      opportunityType:
        'Research-to-commercial pathway',
      stage: 'Active',
      probability: 60,
      estimatedValue: 150000,
      expectedCloseDate: '2026-09-30',
      nextStep:
        'Separate research collaboration from paid platform services.',
      decisionMaker: 'Institutional lead',
      procurementPath:
        'Research agreement plus commercial service contract'
    }),

    base('cust', {
      name: 'Pharma federated cohort use case',
      organizationName:
        'Pharma federated cohort use case',
      contactNames: 'TBD',
      sector: 'Enterprise / Pharma',
      opportunityType: 'Commercial licence',
      stage: 'Hypothesis',
      probability: 20,
      estimatedValue: 500000,
      expectedCloseDate: '2027-01-31',
      nextStep:
        'Validate demand and data-access model.',
      procurementPath:
        'Enterprise SaaS / services'
    })
  ],

  meetings: [
    base('meet', {
      title:
        'Commercial readiness planning call',
      date: '2026-07-07',
      attendees: 'Robb and advisors',
      organization: 'FedEMR',
      notes:
        'Build an operating system that turns gaps, risks, opportunities, and advice into execution.',
      decisions:
        'Build a local-first COO OS.',
      actionItems:
        'Prioritize procurement, legal, security, first deployment, and ROI proof.',
      followUpDate: '2026-07-14'
    }),

    base('meet', {
      title:
        'Advisor commercialization discussion',
      date: '2026-07-03',
      attendees: 'Robb and advisor',
      organization: 'FedEMR',
      notes:
        'Funding should map to specific commercialization blockers.',
      decisions:
        'Track advisor recommendations as accountable records.',
      actionItems:
        'Create funding needs tied to readiness gaps.',
      followUpDate: '2026-07-17'
    })
  ],

  advisorRecommendations: [
    base('adv', {
      title:
        'Tie funding asks to commercialization blockers',
      advisorName:
        'Commercialization advisor',
      date: '2026-07-03',
      recommendation:
        'Map every funding need to a concrete blocker, milestone, or customer requirement.',
      category: 'Funding',
      priority: 'High',
      status: 'Accepted',
      relatedModule: 'Funding Needs',
      outcome:
        'Added as a core COO OS principle.'
    }),

    base('adv', {
      title:
        'Clarify commercial versus research pathway',
      advisorName:
        'Legal and commercialization advisors',
      date: '2026-07-01',
      recommendation:
        'Separate research collaborations from commercial licensing and paid deployment services.',
      category: 'Legal',
      priority: 'High',
      status: 'In Progress',
      relatedModule: 'Commercial Readiness'
    })
  ],

  risks: [
    base('risk', {
      title:
        'First customer delayed by procurement uncertainty',
      description:
        'Potential buyers may stall if the vendor, legal, security, or procurement path is unclear.',
      category: 'Procurement',
      probability: 4,
      impact: 5,
      severity: 20,
      owner: 'Robb',
      mitigationPlan:
        'Build a buyer-readiness checklist and confirm buyer-specific requirements.',
      status: 'Open',
      reviewDate: '2026-07-14'
    }),

    base('risk', {
      title:
        'University/company boundary confusion',
      description:
        'Unclear research and commercialization boundaries could slow contracting or create conflict issues.',
      category: 'Legal / Governance',
      probability: 3,
      impact: 5,
      severity: 15,
      owner: 'Robb',
      mitigationPlan:
        'Obtain written guidance and standard language.',
      status: 'Open',
      reviewDate: '2026-07-12'
    }),

    base('risk', {
      title:
        'Pilot does not convert to paid customer',
      description:
        'A pilot without conversion criteria becomes free consulting wearing a fake moustache.',
      category: 'Sales',
      probability: 4,
      impact: 4,
      severity: 16,
      owner: 'Robb',
      mitigationPlan:
        'Require paid-conversion criteria and a 90-day ROI plan.',
      status: 'Open',
      reviewDate: '2026-07-20'
    })
  ],

  fundingNeeds: [
    base('fund', {
      title:
        'Security and procurement readiness package',
      fundingNeed:
        'Security and procurement readiness package',
      category: 'Commercial Readiness',
      amount: 50000,
      purpose:
        'Security documentation, audit support, procurement binder, insurance review, and legal templates.',
      priority: 'High',
      timing: 'Next 60 days',
      potentialFundingSource:
        'Non-dilutive commercialization funding',
      grantMatch:
        'Digital health implementation or commercialization readiness',
      status: 'Open',
      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ]
    }),

    base('fund', {
      title:
        'First deployment implementation capacity',
      fundingNeed:
        'First deployment implementation capacity',
      category: 'Deployment',
      amount: 125000,
      purpose:
        'Implementation, onboarding, customer support, ROI tracking, and customer success.',
      priority: 'High',
      timing: 'Before first customer',
      potentialFundingSource:
        'Customer contract, grant, founder bridge, or strategic partner',
      status: 'Open',
      linkedFundingOpportunityIds: [
        'funding_implementation'
      ]
    })
  ],

  roadmapItems: [
    base('road', {
      title:
        'Commercial readiness package complete',
      milestone:
        'Commercial readiness package complete',
      quarter: 'Q3 2026',
      month: 'August',
      targetDate: '2026-08-30',
      status: 'In Progress',
      priority: 'High',
      owner: 'Robb',
      dependencies:
        'Legal, insurance, procurement, security, and pricing',
      completionPercentage: 30
    }),

    base('road', {
      title:
        'First customer deployment ready',
      milestone:
        'First customer deployment ready',
      quarter: 'Q4 2026',
      month: 'October',
      targetDate: '2026-10-01',
      status: 'At Risk',
      priority: 'High',
      owner: 'FedEMR Team',
      dependencies:
        'Procurement, security, deployment checklist, and support model',
      completionPercentage: 20
    }),

    base('road', {
      title:
        '90-day ROI evidence package',
      milestone:
        '90-day ROI evidence package',
      quarter: 'Q1 2027',
      month: 'January',
      targetDate: '2027-01-15',
      status: 'Not Started',
      priority: 'High',
      owner: 'Robb',
      dependencies:
        'First deployment and measurement plan',
      completionPercentage: 10
    })
  ],

  activityLog: [],

  organizations: [
    fixed('org_fedemr', {
      name: 'FedEMR Technologies Inc.',
      legalName: 'FedEMR Technologies Inc.',
      shortName: 'FedEMR',
      organizationType: 'Company',
      sector: 'Health AI',
      country: 'Canada',
      active: true,
      confidentiality: 'Internal',
      linkedPersonIds: ['person_robb']
    }),

    fixed('org_university', {
      name: 'Example University',
      shortName: 'University',
      organizationType: 'University',
      sector: 'Research and Education',
      country: 'Canada',
      active: true,
      confidentiality: 'Public',
      linkedPersonIds: [
        'person_university_contact'
      ],
      linkedPathwayIds: [
        'pathway_conflict',
        'pathway_boundary',
        'pathway_agreement'
      ]
    }),

    fixed('org_funder', {
      name:
        'Example Innovation Funding Agency',
      shortName: 'Example Funder',
      organizationType: 'Funder',
      sector: 'Economic Development',
      country: 'Canada',
      active: true,
      confidentiality: 'Public',
      linkedPersonIds: [
        'person_program_advisor'
      ],
      linkedFundingOpportunityIds: [
        'funding_commercialization',
        'funding_implementation'
      ]
    }),

    fixed('org_health_system', {
      name: 'Example Health System',
      shortName: 'Example Health System',
      organizationType: 'Health System',
      sector: 'Healthcare',
      country: 'Canada',
      active: true,
      confidentiality: 'Public',
      linkedPersonIds: [
        'person_health_contact'
      ]
    })
  ],

  people: [
    fixed('person_robb', {
      firstName: 'Robb',
      lastName: 'Price',
      displayName: 'Robb Price',
      title: 'Commercialization Lead',
      primaryOrganizationId: 'org_fedemr',
      relationshipTypes: ['Internal Owner'],
      focusAreas: [
        'Commercialization',
        'Operations',
        'Funding'
      ],
      expertiseAreas: [],
      internalRelationshipOwner: 'Robb',
      active: true,
      confidentiality: 'Internal'
    }),

    fixed('person_program_advisor', {
      firstName: 'Jordan',
      lastName: 'Lee',
      displayName: 'Jordan Lee',
      title: 'Program Advisor',
      department:
        'Commercialization Programs',
      primaryOrganizationId: 'org_funder',
      email:
        'jordan.lee@example.invalid',
      relationshipTypes: [
        'Funder Contact',
        'Program Officer'
      ],
      focusAreas: [
        'Commercialization Funding',
        'Health AI'
      ],
      expertiseAreas: [
        'Program Eligibility',
        'Application Guidance'
      ],
      influenceLevel: 'Medium',
      decisionAuthority: 'Advisory',
      relationshipStrength: 'New',
      internalRelationshipOwner: 'Robb',
      nextFollowUpDate: '2026-07-20',
      active: true,
      confidentiality: 'Confidential',
      linkedOrganizationIds: ['org_funder'],
      linkedFundingOpportunityIds: [
        'funding_commercialization',
        'funding_implementation'
      ]
    }),

    fixed('person_university_contact', {
      firstName: 'Taylor',
      lastName: 'Morgan',
      displayName: 'Taylor Morgan',
      title:
        'Institutional Commercialization Contact',
      department:
        'Research and Commercialization Services',
      primaryOrganizationId:
        'org_university',
      email:
        'taylor.morgan@example.invalid',
      relationshipTypes: [
        'University Contact',
        'Institutional Approver'
      ],
      focusAreas: [
        'Conflict of Interest',
        'Commercialization Pathways',
        'Legal Review'
      ],
      expertiseAreas: [
        'Institutional Navigation'
      ],
      influenceLevel: 'Medium',
      decisionAuthority: 'Advisory',
      relationshipStrength: 'Developing',
      internalRelationshipOwner: 'Robb',
      active: true,
      confidentiality: 'Confidential',
      linkedOrganizationIds: [
        'org_university'
      ],
      linkedPathwayIds: [
        'pathway_conflict',
        'pathway_boundary',
        'pathway_agreement'
      ]
    }),

    fixed('person_health_contact', {
      firstName: 'Alex',
      lastName: 'Chen',
      displayName: 'Alex Chen',
      title: 'Innovation Program Manager',
      primaryOrganizationId:
        'org_health_system',
      email:
        'alex.chen@example.invalid',
      relationshipTypes: [
        'Potential Customer',
        'Health-System Contact'
      ],
      focusAreas: [
        'Digital Health',
        'Procurement',
        'Implementation'
      ],
      expertiseAreas: [
        'Health-System Innovation'
      ],
      influenceLevel: 'Medium',
      decisionAuthority: 'Influencer',
      relationshipStrength: 'New',
      internalRelationshipOwner: 'Robb',
      active: true,
      confidentiality: 'Confidential',
      linkedOrganizationIds: [
        'org_health_system'
      ]
    })
  ],

  relationships: [
    fixed('relationship_funding_contact', {
      fromType: 'person',
      fromId: 'person_program_advisor',
      toType: 'fundingOpportunity',
      toId: 'funding_commercialization',
      relationshipType: 'Program Officer',
      active: true,
      primary: true,
      confidentiality: 'Internal'
    }),

    fixed('relationship_university', {
      fromType: 'person',
      fromId: 'person_university_contact',
      toType: 'institutionalPathway',
      toId: 'pathway_boundary',
      relationshipType: 'University Contact',
      active: true,
      primary: true,
      confidentiality: 'Internal'
    })
  ],

  interactions: [
    fixed('interaction_funding_intro', {
      interactionType: 'Introduction',
      date: '2026-07-08',
      subject:
        'Introduction to commercialization funding program',
      personIds: [
        'person_program_advisor'
      ],
      organizationIds: ['org_funder'],
      summary:
        'Fictional sample interaction demonstrating the relationship model.',
      decisions: '',
      commitmentsMadeByFedEMR: [],
      commitmentsMadeByOthers: [],
      followUpRequired: true,
      followUpDate: '2026-07-20',
      owner: 'Robb',
      confidentiality: 'Confidential',
      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ]
    })
  ],

  followUps: [
    fixed('followup_funding_advisor', {
      title:
        'Confirm eligibility with program advisor',
      description:
        'Validate company eligibility, matching requirements, and supported costs.',
      dueDate: '2026-07-20',
      status: 'Open',
      priority: 'High',
      owner: 'Robb',
      personIds: [
        'person_program_advisor'
      ],
      organizationIds: ['org_funder'],
      linkedInteractionId:
        'interaction_funding_intro',
      linkedFundingOpportunityId:
        'funding_commercialization',
      completedDate: '',
      confidentiality: 'Internal'
    })
  ],

  fundingOpportunities: [
    fixed('funding_commercialization', {
      title:
        'Example Health AI Commercialization Program',
      programName:
        'Example Health AI Commercialization Program',
      funderOrganizationId: 'org_funder',
      programContactPersonIds: [
        'person_program_advisor'
      ],
      pathway: 'Commercial',
      status: 'Validate',

      amountMin: 50000,
      amountMax: 250000,
      currency: 'CAD',

      deadline: '2026-09-30',
      internalDeadline: '2026-09-15',

      repayable: false,
      repaymentDetails: '',

      matchingRequired: true,
      matchingPercentage: 25,
      matchingDetails:
        'Fictional requirement requiring verification.',

      eligibilitySummary:
        'Fictional program for a Canadian health AI company preparing for commercialization.',
      eligibilityConfirmed: false,

      trlMinimum: 6,
      trlMaximum: 9,

      geographicRestrictions: ['Canada'],
      organizationTypeRestrictions: [
        'Small or medium-sized enterprise'
      ],
      sectorRestrictions: [
        'Health technology',
        'Artificial intelligence'
      ],

      requiredPartners: [
        'Potential implementation partner'
      ],
      requiredApprovals: [],
      requiredDocuments: [
        'Project plan',
        'Commercialization plan',
        'Budget',
        'Company profile'
      ],

      eligibleExpenses: [
        'Security readiness',
        'Deployment planning',
        'Commercialization support'
      ],
      ineligibleExpenses: [
        'Unrelated operating expenses'
      ],

      strategicPurpose:
        'Fund commercialization readiness and first-customer preparation.',

      commercializationBlockersAddressed: [
        'Cybersecurity',
        'Procurement',
        'Deployment'
      ],

      researchGoalsAddressed: [],

      applicationEffortHours: 80,
      applicationComplexity: 'Medium',

      probabilityOfSuccess: 45,

      eligibilityScore: 80,
      strategicAlignmentScore: 90,
      impactScore: 85,
      fundingVsEffortScore: 75,
      probabilityScore: 45,
      timingScore: 80,
      partnerReadinessScore: 55,
      overallFitScore: 76,

      scoreExplanation:
        'Strong strategic fit, but eligibility, matching funds, and partner readiness require verification.',

      eligibilityRisks: [
        'Matching contribution is not confirmed.'
      ],

      unknowns: [
        'Whether a signed customer letter is mandatory.'
      ],

      sourceUrls: [
        'https://example.invalid/funding/commercialization'
      ],

      lastVerifiedDate: '',
      verifiedBy: '',
      verificationStatus: 'Unverified',
      confidence: 'Estimated',

      confidentiality: 'Internal',

      linkedPersonIds: [
        'person_program_advisor'
      ],

      linkedOrganizationIds: [
        'org_funder'
      ],

      linkedWorkPackageIds: [
        'workpackage_security'
      ]
    }),

    fixed('funding_implementation', {
      title:
        'Example First Deployment Support Program',
      programName:
        'Example First Deployment Support Program',
      funderOrganizationId: 'org_funder',
      programContactPersonIds: [
        'person_program_advisor'
      ],
      pathway: 'Hybrid',
      status: 'Discovered',

      amountMin: 100000,
      amountMax: 500000,
      currency: 'CAD',

      deadline: '2026-11-15',
      internalDeadline: '2026-10-31',

      repayable: false,
      matchingRequired: false,
      matchingPercentage: 0,

      eligibilitySummary:
        'Fictional implementation program involving a company and implementation partner.',

      eligibilityConfirmed: false,

      trlMinimum: 7,
      trlMaximum: 9,

      geographicRestrictions: ['Canada'],

      organizationTypeRestrictions: [
        'Company with implementation partner'
      ],

      sectorRestrictions: [
        'Healthcare',
        'Digital health'
      ],

      requiredPartners: [
        'Implementation partner'
      ],

      requiredApprovals: [
        'Partner approval'
      ],

      requiredDocuments: [
        'Implementation plan',
        'Partner letter',
        'Budget',
        'Impact plan'
      ],

      eligibleExpenses: [
        'Implementation staff',
        'Customer onboarding',
        'ROI measurement'
      ],

      ineligibleExpenses: [
        'General corporate overhead'
      ],

      strategicPurpose:
        'Support first-deployment implementation capacity.',

      commercializationBlockersAddressed: [
        'Implementation capacity',
        'Customer success',
        'ROI evidence'
      ],

      researchGoalsAddressed: [
        'Implementation evaluation'
      ],

      applicationEffortHours: 120,
      applicationComplexity: 'High',

      probabilityOfSuccess: 35,

      eligibilityScore: 70,
      strategicAlignmentScore: 95,
      impactScore: 95,
      fundingVsEffortScore: 80,
      probabilityScore: 35,
      timingScore: 70,
      partnerReadinessScore: 40,
      overallFitScore: 73,

      scoreExplanation:
        'Excellent strategic impact, but partner readiness and application complexity reduce the current fit.',

      eligibilityRisks: [
        'Implementation partner is not confirmed.'
      ],

      unknowns: [
        'Whether research-side cost sharing is required.'
      ],

      sourceUrls: [
        'https://example.invalid/funding/implementation'
      ],

      lastVerifiedDate: '',
      verifiedBy: '',
      verificationStatus: 'Unverified',
      confidence: 'Estimated',

      confidentiality: 'Internal',

      linkedPersonIds: [
        'person_program_advisor'
      ],

      linkedOrganizationIds: [
        'org_funder'
      ],

      linkedWorkPackageIds: [
        'workpackage_deployment'
      ],

      linkedPathwayIds: [
        'pathway_boundary'
      ]
    })
  ],

  fundingApplications: [],

  institutionalPathways: [
    fixed('pathway_conflict', {
      title: 'Conflict-of-Interest Review',
      institutionOrganizationId:
        'org_university',
      category: 'Conflict of Interest',

      trigger:
        'A university-affiliated person participates in or benefits from a commercial company.',

      intendedOutcome:
        'Documented review and an approved management approach when required.',

      description:
        'Fictional pathway requiring verification against current institutional policy.',

      departmentOrganizationIds: [
        'org_university'
      ],

      contactRoleRequirements: [
        'Conflict-of-Interest Contact',
        'Faculty or Department Approver'
      ],

      requiredDocuments: [
        'Conflict disclosure',
        'Role description',
        'Company relationship summary'
      ],

      requiredApprovals: [
        'Institutional review when applicable'
      ],

      decisionPoints: [
        'Whether a formal management plan is required.'
      ],

      dependencies: [],

      parallelSteps: [
        'Clarify company and university responsibilities.'
      ],

      commonDelays: [
        'Unclear ownership',
        'Incomplete disclosure',
        'Wrong initial contact'
      ],

      escalationRoutes: [
        'Escalate through the relevant institutional office.'
      ],

      estimatedDurationDays: null,

      sourceUrls: [],
      lastVerifiedDate: '',
      verifiedByPersonId: '',

      verificationStatus:
        'Needs Verification',
      confidence: 'Unknown',

      knownExceptions: [],

      openQuestions: [
        'Which office currently owns the process?',
        'What forms are required?'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedStepIds: [
        'step_conflict_document',
        'step_conflict_submit'
      ],

      linkedPersonIds: [
        'person_university_contact'
      ],

      linkedOrganizationIds: [
        'org_university'
      ]
    }),

    fixed('pathway_boundary', {
      title:
        'University and Company Commercial Boundary',

      institutionOrganizationId:
        'org_university',

      category:
        'Commercialization Governance',

      trigger:
        'University research activity overlaps with company commercialization.',

      intendedOutcome:
        'Clear written boundaries for research, sales, contracting, IP, data, and conflicts.',

      description:
        'Fictional pathway requiring institutional verification.',

      departmentOrganizationIds: [
        'org_university'
      ],

      contactRoleRequirements: [
        'Commercialization Contact',
        'Legal Contact',
        'Conflict-of-Interest Contact'
      ],

      requiredDocuments: [
        'Company summary',
        'Research activity summary',
        'IP and agreement inventory'
      ],

      requiredApprovals: [
        'Institutional guidance when applicable'
      ],

      decisionPoints: [
        'Whether separate research and commercial agreements are required.'
      ],

      dependencies: [],

      parallelSteps: [
        'Map agreements',
        'Identify people with dual roles'
      ],

      commonDelays: [
        'Unclear decision owner',
        'Multiple legal offices',
        'Incomplete agreement inventory'
      ],

      escalationRoutes: [
        'Escalate to the accountable commercialization office.'
      ],

      estimatedDurationDays: null,

      sourceUrls: [],
      lastVerifiedDate: '',
      verifiedByPersonId: '',

      verificationStatus:
        'Needs Verification',

      confidence: 'Unknown',

      knownExceptions: [],

      openQuestions: [
        'Which office owns each decision?',
        'What requires approval versus disclosure?'
      ],

      active: true,
      confidentiality: 'Confidential',

      linkedStepIds: [
        'step_boundary_map',
        'step_boundary_confirm'
      ],

      linkedPersonIds: [
        'person_university_contact'
      ],

      linkedOrganizationIds: [
        'org_university'
      ],

      linkedCaseIds: [
        'case_fedemr_boundary'
      ]
    }),

    fixed('pathway_agreement', {
      title:
        'Company Legal Agreement Review',

      institutionOrganizationId:
        'org_university',

      category: 'Legal Review',

      trigger:
        'A company agreement may affect university rights, IP, equity, research activity, or institutional interests.',

      intendedOutcome:
        'The correct parties review or acknowledge the agreement, with ownership documented.',

      description:
        'Fictional pathway requiring verification before operational use.',

      departmentOrganizationIds: [
        'org_university'
      ],

      contactRoleRequirements: [
        'Technology-Transfer Contact',
        'Institutional Legal Contact',
        'Conflict-of-Interest Contact'
      ],

      requiredDocuments: [
        'Draft agreement',
        'Cap-table summary',
        'IP and licensing summary',
        'Director and officer list'
      ],

      requiredApprovals: [],

      decisionPoints: [
        'Whether institutional review is required.',
        'Which office owns the review.'
      ],

      dependencies: [
        'Clarify university IP and equity interests.'
      ],

      parallelSteps: [
        'External corporate legal review'
      ],

      commonDelays: [
        'Submitting to the wrong office',
        'Unclear institutional interest'
      ],

      escalationRoutes: [
        'Request written confirmation of the responsible office.'
      ],

      estimatedDurationDays: null,

      sourceUrls: [],
      lastVerifiedDate: '',
      verifiedByPersonId: '',

      verificationStatus:
        'Needs Verification',

      confidence: 'Unknown',

      knownExceptions: [],

      openQuestions: [
        'Does the institution review, approve, or only require notification?'
      ],

      active: true,
      confidentiality: 'Restricted',

      linkedStepIds: [
        'step_agreement_prepare',
        'step_agreement_confirm'
      ],

      linkedPersonIds: [
        'person_university_contact'
      ],

      linkedOrganizationIds: [
        'org_university'
      ]
    })
  ],

  pathwaySteps: [
    fixed('step_conflict_document', {
      pathwayId: 'pathway_conflict',
      sequenceNumber: 1,
      title:
        'Document the potential conflict',
      description:
        'Summarize the university role, company role, financial interest, authority, and overlapping responsibilities.',
      responsibleDepartmentOrganizationId:
        'org_university',
      responsibleContactRole:
        'Conflict-of-Interest Contact',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: false,
      approvalType: '',
      dependencyStepIds: [],
      parallelStepIds: [],
      estimatedHours: 3,
      estimatedDurationDays: 2,
      escalationInstruction:
        'Request the current disclosure form and responsible office.',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Estimated'
    }),

    fixed('step_conflict_submit', {
      pathwayId: 'pathway_conflict',
      sequenceNumber: 2,
      title:
        'Submit for institutional guidance',
      description:
        'Provide the facts to the verified contact and determine whether a management plan is required.',
      responsibleDepartmentOrganizationId:
        'org_university',
      responsibleContactRole:
        'Institutional Approver',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: true,
      approvalType:
        'Institutional conflict review',
      dependencyStepIds: [
        'step_conflict_document'
      ],
      parallelStepIds: [],
      estimatedHours: 2,
      estimatedDurationDays: 10,
      escalationInstruction:
        'Escalate when ownership or response timing is unclear.',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Unknown'
    }),

    fixed('step_boundary_map', {
      pathwayId: 'pathway_boundary',
      sequenceNumber: 1,
      title: 'Map overlapping activities',
      description:
        'List research work, commercial work, people, IP, data, agreements, funding, and institutional resources.',
      responsibleDepartmentOrganizationId:
        'org_fedemr',
      responsibleContactRole:
        'Internal Owner',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: false,
      dependencyStepIds: [],
      parallelStepIds: [],
      estimatedHours: 12,
      estimatedDurationDays: 5,
      escalationInstruction: '',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Estimated'
    }),

    fixed('step_boundary_confirm', {
      pathwayId: 'pathway_boundary',
      sequenceNumber: 2,
      title:
        'Confirm institutional ownership and approvals',
      description:
        'Identify responsible contacts and obtain written guidance on research and commercial boundaries.',
      responsibleDepartmentOrganizationId:
        'org_university',
      responsibleContactRole:
        'Commercialization Contact',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: true,
      approvalType:
        'Institutional guidance',
      dependencyStepIds: [
        'step_boundary_map'
      ],
      parallelStepIds: [],
      estimatedHours: 6,
      estimatedDurationDays: 20,
      escalationInstruction:
        'Escalate if ownership remains unclear.',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Unknown'
    }),

    fixed('step_agreement_prepare', {
      pathwayId: 'pathway_agreement',
      sequenceNumber: 1,
      title:
        'Prepare agreement context package',
      description:
        'Assemble the agreement, cap-table summary, IP status, licensing status, company roles, and university connections.',
      responsibleDepartmentOrganizationId:
        'org_fedemr',
      responsibleContactRole:
        'Internal Owner',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: false,
      dependencyStepIds: [],
      parallelStepIds: [
        'External corporate legal review'
      ],
      estimatedHours: 8,
      estimatedDurationDays: 5,
      escalationInstruction: '',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Estimated'
    }),

    fixed('step_agreement_confirm', {
      pathwayId: 'pathway_agreement',
      sequenceNumber: 2,
      title:
        'Confirm the institutional review route',
      description:
        'Obtain written confirmation of whether the institution must review, approve, or only be notified.',
      responsibleDepartmentOrganizationId:
        'org_university',
      responsibleContactRole:
        'Institutional Legal Contact',
      requiredDocumentIds: [],
      requiredEvidenceIds: [],
      approvalRequired: false,
      dependencyStepIds: [
        'step_agreement_prepare'
      ],
      parallelStepIds: [],
      estimatedHours: 3,
      estimatedDurationDays: 10,
      escalationInstruction:
        'Escalate when the responsible office is unclear.',
      sourceUrls: [],
      lastVerifiedDate: '',
      confidence: 'Unknown'
    })
  ],

  pathwayCases: [
    fixed('case_fedemr_boundary', {
      pathwayId: 'pathway_boundary',

      title:
        'FedEMR University and Company Commercial Boundary',

      description:
        'Clarify the operational, legal, research, data, IP, and contracting boundaries.',

      status: 'Discovery',
      currentStepId: 'step_boundary_map',

      owner: 'Robb',
      priority: 'High',

      startDate: '2026-07-01',
      targetCompletionDate: '2026-08-31',
      actualCompletionDate: '',

      organizationIds: [
        'org_fedemr',
        'org_university'
      ],

      personIds: [
        'person_robb',
        'person_university_contact'
      ],

      submittedDocumentIds: [],
      requiredDocumentIds: [],

      completedStepIds: [],
      blockedStepIds: [],

      decisionsRequired: [
        'Identify responsible institutional offices and approval requirements.'
      ],

      openQuestions: [
        'Which matters require formal approval?',
        'Which matters require disclosure only?'
      ],

      waitingOn:
        'Verified institutional guidance',

      blockerSummary:
        'Ownership of the process is not confirmed.',

      confidentiality: 'Confidential',

      linkedFundingOpportunityIds: [
        'funding_implementation'
      ],

      linkedWorkPackageIds: [
        'workpackage_boundary'
      ],

      linkedDecisionIds: [
        'decision_boundary_owner'
      ]
    })
  ],

  workPackages: [
    fixed('workpackage_security', {
      title:
        'Cybersecurity and Procurement Package',

      outcome:
        'Buyer-ready security, insurance, privacy, and procurement documentation.',

      description:
        'Build the minimum package required for a serious health-system procurement conversation.',

      pathway: 'Company',
      status: 'Planning',
      priority: 'High',
      owner: 'Robb',

      startDate: '2026-07-15',
      targetCompletionDate: '2026-09-15',

      estimatedInternalHours: 90,
      estimatedExternalHours: 30,
      estimatedDurationWeeks: 8,

      estimatedInternalCost: 9000,
      estimatedExternalCost: 30000,
      estimatedTotalCost: 39000,

      currency: 'CAD',

      requiredRoles: [
        'Commercialization Lead',
        'Security Advisor',
        'Legal Counsel',
        'Student Analyst'
      ],

      studentSuitableTasks: [
        'Document inventory',
        'Control-mapping support',
        'Procurement-binder organization'
      ],

      undergraduateSuitable: true,
      graduateStudentSuitable: true,

      consultantRequired: true,
      contractorRequired: false,
      externalVendorRequired: true,

      dependencies: [
        'Confirm buyer requirements',
        'Confirm insurance requirements'
      ],

      approvalRequirements: [],

      fundingRequired: true,
      fundingGap: 39000,

      confidence: 'Estimated',
      confidentiality: 'Confidential',

      linkedResourceRequirementIds: [
        'resource_security_advisor',
        'resource_student',
        'resource_security_vendor'
      ],

      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ],

      linkedPersonIds: ['person_robb'],
      linkedOrganizationIds: ['org_fedemr']
    }),

    fixed('workpackage_deployment', {
      title:
        'First-Customer Deployment Readiness',

      outcome:
        'Repeatable deployment, onboarding, support, and 90-day ROI measurement.',

      description:
        'Prepare the company and implementation partner for the first paid deployment.',

      pathway: 'Hybrid',
      status: 'Planning',
      priority: 'High',
      owner: 'Robb',

      startDate: '2026-08-01',
      targetCompletionDate: '2026-10-01',

      estimatedInternalHours: 220,
      estimatedExternalHours: 40,
      estimatedDurationWeeks: 10,

      estimatedInternalCost: 30000,
      estimatedExternalCost: 20000,
      estimatedTotalCost: 50000,

      currency: 'CAD',

      requiredRoles: [
        'Implementation Lead',
        'Technical Lead',
        'Customer Success',
        'ROI Analyst'
      ],

      studentSuitableTasks: [
        'Documentation',
        'Measurement-plan support',
        'Customer-onboarding materials'
      ],

      undergraduateSuitable: true,
      graduateStudentSuitable: true,

      consultantRequired: false,
      contractorRequired: true,
      externalVendorRequired: false,

      dependencies: [
        'Customer confirmed',
        'Procurement path confirmed',
        'Security package available'
      ],

      approvalRequirements: [
        'Customer implementation approval'
      ],

      fundingRequired: true,
      fundingGap: 50000,

      confidence: 'Estimated',
      confidentiality: 'Confidential',

      linkedResourceRequirementIds: [
        'resource_implementation_lead'
      ],

      linkedFundingOpportunityIds: [
        'funding_implementation'
      ],

      linkedPersonIds: [
        'person_robb',
        'person_health_contact'
      ],

      linkedOrganizationIds: [
        'org_fedemr',
        'org_health_system'
      ]
    }),

    fixed('workpackage_boundary', {
      title:
        'University and Company Boundary Clarification',

      outcome:
        'Written practical guidance covering research, company, IP, data, legal, and conflict boundaries.',

      description:
        'Map the issues and obtain verified institutional guidance.',

      pathway: 'Hybrid',
      status: 'In Progress',
      priority: 'High',
      owner: 'Robb',

      startDate: '2026-07-01',
      targetCompletionDate: '2026-08-31',

      estimatedInternalHours: 35,
      estimatedExternalHours: 15,
      estimatedDurationWeeks: 8,

      estimatedInternalCost: 5000,
      estimatedExternalCost: 10000,
      estimatedTotalCost: 15000,

      currency: 'CAD',

      requiredRoles: [
        'Commercialization Lead',
        'University Contact',
        'Legal Counsel'
      ],

      studentSuitableTasks: [
        'Agreement inventory',
        'Process documentation'
      ],

      undergraduateSuitable: true,
      graduateStudentSuitable: true,

      consultantRequired: true,
      contractorRequired: false,
      externalVendorRequired: false,

      dependencies: [
        'Identify accountable university offices'
      ],

      approvalRequirements: [
        'Institutional guidance'
      ],

      fundingRequired: false,
      fundingGap: 0,

      confidence: 'Estimated',
      confidentiality: 'Restricted',

      linkedPersonIds: [
        'person_robb',
        'person_university_contact'
      ],

      linkedOrganizationIds: [
        'org_fedemr',
        'org_university'
      ],

      linkedPathwayCaseIds: [
        'case_fedemr_boundary'
      ]
    })
  ],

  resourceRequirements: [
    fixed('resource_security_advisor', {
      workPackageId:
        'workpackage_security',

      requirementType: 'Consultant',

      title: 'Security readiness advisor',

      description:
        'Assess controls, identify gaps, guide policy development, and prepare buyer-facing materials.',

      requiredExpertise: [
        'Cybersecurity',
        'Security controls',
        'Health technology'
      ],

      requiredRole: 'Security Advisor',

      companyOrResearchSide: 'Company',
      resourceSource: 'Consultant',

      studentSuitable: false,
      undergraduateSuitable: false,
      graduateStudentSuitable: false,

      estimatedHours: 25,
      estimatedHourlyRate: 250,
      estimatedFixedCost: 0,

      currency: 'CAD',

      assignedPersonId: '',
      assignedOrganizationId: '',

      fundingRequired: true,

      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ],

      confidence: 'Estimated',
      status: 'Unassigned'
    }),

    fixed('resource_student', {
      workPackageId:
        'workpackage_security',

      requirementType: 'Student',

      title: 'Student analyst support',

      description:
        'Organize documents, maintain the evidence inventory, and support control mapping under supervision.',

      requiredExpertise: [
        'Research',
        'Documentation',
        'Attention to detail'
      ],

      requiredRole: 'Student Analyst',

      companyOrResearchSide: 'Hybrid',

      resourceSource:
        'Undergraduate student',

      studentSuitable: true,
      undergraduateSuitable: true,
      graduateStudentSuitable: true,

      estimatedHours: 50,
      estimatedHourlyRate: 25,
      estimatedFixedCost: 0,

      currency: 'CAD',

      assignedPersonId: '',
      assignedOrganizationId: '',

      fundingRequired: true,

      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ],

      confidence: 'Estimated',
      status: 'Unassigned'
    }),

    fixed('resource_security_vendor', {
      workPackageId:
        'workpackage_security',

      requirementType: 'Vendor',

      title:
        'External security testing vendor',

      description:
        'Perform appropriately scoped security testing when the product is ready.',

      requiredExpertise: [
        'Application security testing'
      ],

      requiredRole:
        'Security Testing Vendor',

      companyOrResearchSide: 'Company',

      resourceSource: 'External vendor',

      studentSuitable: false,
      undergraduateSuitable: false,
      graduateStudentSuitable: false,

      estimatedHours: 0,
      estimatedHourlyRate: 0,
      estimatedFixedCost: 15000,

      currency: 'CAD',

      assignedPersonId: '',
      assignedOrganizationId: '',

      fundingRequired: true,

      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ],

      confidence: 'Estimated',
      status: 'Unassigned'
    }),

    fixed('resource_implementation_lead', {
      workPackageId:
        'workpackage_deployment',

      requirementType: 'Role',

      title:
        'First-deployment implementation lead',

      description:
        'Coordinate onboarding, deployment, support, issue management, and ROI measurement.',

      requiredExpertise: [
        'Implementation',
        'Health technology',
        'Customer success'
      ],

      requiredRole:
        'Implementation Lead',

      companyOrResearchSide: 'Company',

      resourceSource:
        'Company hire or contractor',

      studentSuitable: false,
      undergraduateSuitable: false,
      graduateStudentSuitable: false,

      estimatedHours: 160,
      estimatedHourlyRate: 125,
      estimatedFixedCost: 0,

      currency: 'CAD',

      assignedPersonId: '',
      assignedOrganizationId: '',

      fundingRequired: true,

      linkedFundingOpportunityIds: [
        'funding_implementation'
      ],

      confidence: 'Estimated',
      status: 'Unassigned'
    })
  ],

  documents: [],

  evidence: [],

  decisions: [
    fixed('decision_boundary_owner', {
      title:
        'Confirm accountable university offices',

      question:
        'Which institutional offices own the legal, commercialization, IP, and conflict decisions affecting the university and company boundary?',

      status: 'Waiting on Information',

      decisionOwner: 'Robb',
      requiredByDate: '2026-08-15',

      options: [],

      recommendation:
        'Obtain written confirmation of ownership and approval requirements before relying on an assumed pathway.',

      decision: '',
      decisionDate: '',
      rationale: '',

      impactSummary:
        'Clarifying ownership unlocks legal agreements, funding applications, and first-customer contracting.',

      risks: [
        'Delay',
        'Incorrect approval route',
        'Conflicting guidance'
      ],

      assumptions: [],

      unknowns: [
        'Responsible office',
        'Required approvals',
        'Escalation route'
      ],

      evidenceIds: [],

      confidentiality: 'Restricted',

      linkedFundingOpportunityIds: [
        'funding_implementation'
      ],

      linkedPathwayCaseIds: [
        'case_fedemr_boundary'
      ],

      linkedWorkPackageIds: [
        'workpackage_boundary'
      ],

      linkedPersonIds: [
        'person_university_contact'
      ],

      linkedOrganizationIds: [
        'org_university'
      ]
    })
  ]
};