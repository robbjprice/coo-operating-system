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
  linkedEvidenceIds: [],

  linkedProductIds: [],
  linkedProductVersionIds: [],
  linkedProductCapabilityIds: [],
  linkedAudienceIds: [],
  linkedContentAssetIds: [],
  linkedPresentationIds: [],
  linkedUseCaseIds: [],
  linkedCaseStudyIds: [],
  linkedApprovedClaimIds: []
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

  'products',
  'productVersions',
  'productCapabilities',
  'audiences',
  'contentAssets',
  'presentations',
  'useCases',
  'caseStudies',
  'approvedClaims',

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

    products: [
    fixed('product_fedemr', {
      name: 'FedEMR',
      legalProductName: 'FedEMR',
      shortName: 'FedEMR',

      productCategory:
        'Privacy-Preserving Federated Learning Platform',
      productType: 'Software Platform',

      summary:
        'A platform supporting multi-site analysis and model development while participating organizations retain control of their local data.',

      description:
        'FedEMR helps researchers and organizations collaborate across distributed health-data environments without requiring patient-level records to be routinely centralized.',

      currentValueProposition:
        'Enable distributed health-data collaboration while reducing the need to transfer patient-level information between participating organizations.',

      commercialPositioning:
        'A platform and implementation service for governed multi-site analytics, model development, validation, and deployment workflows.',

      researchPositioning:
        'A research-enablement platform supporting distributed analysis and federated learning across participating sites.',

      primaryMarkets: [
        'Health systems',
        'Universities',
        'Research networks',
        'Government',
        'Pharmaceutical research'
      ],

      primaryUsers: [
        'Researchers',
        'Data scientists',
        'Health-system teams',
        'Technical implementation teams'
      ],

      currentMaturity:
        'Research use and commercialization preparation',

      currentTrl: 7,

      deploymentModel:
        'Distributed deployment with computation occurring within participating controlled environments.',

      privacyModel:
        'Participating organizations retain local control of patient-level source data during configured federated workflows.',

      dataHandlingSummary:
        'The platform is designed to avoid routine central transfer of patient-level records during federated workflows.',

      differentiators: [
        'Distributed computation',
        'Local data control',
        'Multi-site orchestration',
        'Research and commercial workflow support',
        'Planned zero-code experience'
      ],

      knownLimitations: [
        'Deployment requirements vary by institution.',
        'Commercial support and integration scope must be confirmed for each implementation.',
        'Some capabilities depend on the product version and environment.'
      ],

      supportedEnvironments: [
        'Institution-controlled infrastructure',
        'Research computing environments',
        'Approved cloud or local environments where supported'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed research deployment',
        'Pilot deployment',
        'Institution-managed deployment'
      ],

      productOwnerPersonId: 'person_robb',
      technicalOwnerPersonId: '',
      commercialOwnerPersonId: 'person_robb',

      currentProductVersionId:
        'product_version_current',

      nextProductVersionId:
        'product_version_v2',

      status: 'Active',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [],
      linkedAudienceIds: [],
      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],
      linkedApprovedClaimIds: [],

      linkedRoadmapItemIds: [],
      linkedWorkPackageIds: [
        'workpackage_security',
        'workpackage_deployment'
      ],

      linkedFundingOpportunityIds: [
        'funding_commercialization',
        'funding_implementation'
      ],

      linkedRiskIds: [],
      linkedDecisionIds: [],
      linkedDocumentIds: [],
      linkedEvidenceIds: []
    })
  ],

  productVersions: [
    fixed('product_version_current', {
      productId: 'product_fedemr',

      versionName:
        'Current FedEMR Research Platform',

      versionNumber: 'Current Research Build',
      releaseType: 'Research Build',

      status: 'Supported',

      plannedReleaseDate: '',
      actualReleaseDate: '',

      productEnvironment:
        'Research and controlled implementation environments',

      deploymentStage:
        'Research use and commercialization preparation',

      summary:
        'Generalized representation of the currently available FedEMR research platform.',

      releaseObjective:
        'Support federated research workflows and multi-site model-development activities.',

      improvementsOverPreviousVersion: [],

      capabilitiesIncluded: [
        'Federated model training',
        'Federated analytics',
        'Local data control',
        'Multi-site orchestration',
        'Model validation support'
      ],

      knownLimitations: [
        'Implementation requires technical support.',
        'Commercial deployment packaging remains in development.',
        'Integration scope is environment-specific.'
      ],

      technicalDependencies: [
        'Compatible participating-site infrastructure',
        'Local technical configuration',
        'Agreed data and analysis workflow'
      ],

      infrastructureDependencies: [
        'Institution-controlled compute environment'
      ],

      integrationDependencies: [
        'Site-specific integration planning'
      ],

      securityChanges: [],
      privacyChanges: [],
      deploymentChanges: [],
      integrationChanges: [],
      userExperienceChanges: [],

      customerRequestsAddressed: [],

      researchRequestsAddressed: [
        'Multi-site model development',
        'Distributed analysis'
      ],

      technicalDebtAddressed: [],

      commercialReadinessStatus:
        'Commercial packaging in development',

      securityReadinessStatus:
        'Requires implementation-specific assessment',

      privacyReadinessStatus:
        'Requires implementation-specific review',

      documentationStatus:
        'Research documentation available',

      trainingStatus:
        'Technical onboarding required',

      supportReadinessStatus:
        'Research support model',

      deploymentReadinessStatus:
        'Controlled deployments supported',

      productReadinessScore: 60,

      productReadinessExplanation:
        'The platform supports research workflows, while repeatable commercial deployment, support, security documentation, and procurement packaging remain under development.',

      releaseBlockers: [
        'Commercial support model',
        'Security and procurement package',
        'Repeatable deployment documentation'
      ],

      releaseRisks: [
        'Site-specific implementation complexity'
      ],

      decisionsRequired: [
        'Define the minimum commercially supported deployment package.'
      ],

      releaseDecision:
        'Continue supported research use while commercial packaging is developed.',

      releaseDecisionDate: '',

      owner: 'FedEMR Team',
      technicalLeadPersonId: '',
      commercialLeadPersonId: 'person_robb',

      confidentiality: 'Internal',

      linkedProductCapabilityIds: [],
      linkedRoadmapItemIds: [],
      linkedTaskIds: [],

      linkedWorkPackageIds: [
        'workpackage_security',
        'workpackage_deployment'
      ],

      linkedRiskIds: [],

      linkedFundingOpportunityIds: [
        'funding_commercialization',
        'funding_implementation'
      ],

      linkedCustomerIds: [],

      linkedOrganizationIds: [
        'org_fedemr'
      ],

      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],
      linkedPresentationIds: [],
      linkedContentAssetIds: [],
      linkedApprovedClaimIds: [],
      linkedEvidenceIds: [],
      linkedDecisionIds: [],
      linkedDocumentIds: []
    }),

    fixed('product_version_v2', {
      productId: 'product_fedemr',

      versionName:
        'FedEMR V2 Zero-Code Platform',

      versionNumber: 'V2',
      releaseType: 'Major',

      status: 'In Development',

      plannedReleaseDate: '2026-09-30',
      actualReleaseDate: '',

      productEnvironment:
        'Planned research and commercial implementation environments',

      deploymentStage: 'Development',

      summary:
        'Planned major product version focused on simplifying configuration, onboarding, and federated-workflow operation.',

      releaseObjective:
        'Reduce technical setup effort and improve repeatability through a guided zero-code experience.',

      improvementsOverPreviousVersion: [
        'Zero-code workflow configuration',
        'Simplified site onboarding',
        'Improved deployment tooling',
        'Broader operating-system support',
        'Improved multi-site orchestration',
        'Clearer workflow and status visibility'
      ],

      capabilitiesIncluded: [
        'Federated model training',
        'Federated analytics',
        'Local data control',
        'Multi-site orchestration',
        'Model validation support',
        'Planned zero-code workflow'
      ],

      knownLimitations: [
        'Final supported environments remain under validation.',
        'Commercial support scope is not yet finalized.',
        'Integration support will depend on implementation requirements.'
      ],

      technicalDependencies: [
        'Completion of the zero-code interface',
        'Deployment validation',
        'Cross-platform testing'
      ],

      infrastructureDependencies: [
        'Supported institutional compute environment'
      ],

      integrationDependencies: [
        'Implementation-specific integration plan'
      ],

      securityChanges: [
        'Planned security documentation and deployment controls'
      ],

      privacyChanges: [
        'Planned clearer privacy and data-flow documentation'
      ],

      deploymentChanges: [
        'Simplified deployment workflow',
        'Improved site onboarding'
      ],

      integrationChanges: [
        'Broader environment support under evaluation'
      ],

      userExperienceChanges: [
        'Zero-code configuration',
        'Guided workflow',
        'Improved status visibility'
      ],

      customerRequestsAddressed: [
        'Simpler onboarding',
        'Reduced technical configuration effort'
      ],

      researchRequestsAddressed: [
        'Easier setup for multi-site research projects'
      ],

      technicalDebtAddressed: [
        'Manual workflow complexity'
      ],

      commercialReadinessStatus:
        'In Development',

      securityReadinessStatus:
        'In Development',

      privacyReadinessStatus:
        'In Development',

      documentationStatus: 'Planned',
      trainingStatus: 'Planned',
      supportReadinessStatus: 'Planned',

      deploymentReadinessStatus:
        'Testing required',

      productReadinessScore: 45,

      productReadinessExplanation:
        'Core development is underway. Release readiness depends on completing the interface, deployment validation, documentation, security packaging, and support preparation.',

      releaseBlockers: [
        'Complete zero-code experience',
        'Complete deployment validation',
        'Complete security and privacy documentation',
        'Define commercial support model',
        'Complete training and onboarding materials'
      ],

      releaseRisks: [
        'Release-date pressure',
        'Cross-platform testing scope',
        'Institution-specific deployment requirements'
      ],

      decisionsRequired: [
        'Confirm minimum V2 release scope.',
        'Confirm supported deployment environments.',
        'Confirm commercial support boundaries.'
      ],

      releaseDecision: '',
      releaseDecisionDate: '',

      owner: 'FedEMR Team',
      technicalLeadPersonId: '',
      commercialLeadPersonId: 'person_robb',

      confidentiality: 'Confidential',

      linkedProductCapabilityIds: [],
      linkedRoadmapItemIds: [],
      linkedTaskIds: [],

      linkedWorkPackageIds: [
        'workpackage_security',
        'workpackage_deployment'
      ],

      linkedRiskIds: [],

      linkedFundingOpportunityIds: [
        'funding_commercialization',
        'funding_implementation'
      ],

      linkedCustomerIds: [],

      linkedOrganizationIds: [
        'org_fedemr'
      ],

      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],
      linkedPresentationIds: [],
      linkedContentAssetIds: [],
      linkedApprovedClaimIds: [],
      linkedEvidenceIds: [],
      linkedDecisionIds: [],
      linkedDocumentIds: []
    })
  ],
    productCapabilities: [
    fixed('capability_federated_training', {
      productId: 'product_fedemr',

      name: 'Federated Model Training',
      shortName: 'Federated Training',
      category: 'Federated Learning',

      description:
        'Coordinate model training across participating sites without routinely centralizing patient-level records.',

      technicalDescription:
        'Participating environments perform approved local computation and exchange permitted model information through a coordinated workflow.',

      userDescription:
        'Develop a shared model across multiple organizations while each site keeps control of its local data.',

      availabilityStatus: 'Available',
      supportStatus: 'Research Support',

      researchOnly: false,
      commerciallySupported: false,
      experimental: false,

      firstAvailableVersionId:
        'product_version_current',

      currentSupportedVersionIds: [
        'product_version_current'
      ],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'Participating-site compute environment',
        'Configured local data workflow'
      ],

      dependencies: [
        'Site onboarding',
        'Approved analysis plan',
        'Compatible data preparation'
      ],

      supportedEnvironments: [
        'Controlled research environments'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed research deployment'
      ],

      knownLimitations: [
        'Setup and support requirements vary by participating site.'
      ],

      securityConsiderations: [
        'Participating sites require appropriate local access and deployment controls.'
      ],

      privacyConsiderations: [
        'Permitted outputs and model information must be defined for each workflow.'
      ],

      evidenceStatus:
        'Supporting evidence must be linked before external claims are approved.',

      demonstrationStatus: 'Demonstrated',
      validationStatus: 'Environment-Dependent',

      customerValue:
        'Supports collaboration across organizational boundaries.',

      researchValue:
        'Supports multi-site model development without creating one central patient-level dataset.',

      technicalValue:
        'Coordinates distributed model training.',

      operationalValue:
        'May reduce the need to establish a centralized patient-level dataset.',

      owner: 'FedEMR Team',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

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
      linkedDecisionIds: []
    }),

    fixed('capability_federated_analytics', {
      productId: 'product_fedemr',

      name: 'Federated Analytics',
      shortName: 'Federated Analytics',
      category: 'Federated Analytics',

      description:
        'Support approved analyses across distributed participating datasets.',

      technicalDescription:
        'Coordinate local analytical operations and combine permitted results according to the configured workflow.',

      userDescription:
        'Run an analysis across participating organizations without first combining all patient-level data in one location.',

      availabilityStatus: 'Available',
      supportStatus: 'Research Support',

      researchOnly: false,
      commerciallySupported: false,
      experimental: false,

      firstAvailableVersionId:
        'product_version_current',

      currentSupportedVersionIds: [
        'product_version_current'
      ],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'Local analytical environment'
      ],

      dependencies: [
        'Approved analysis',
        'Compatible site data'
      ],

      supportedEnvironments: [
        'Controlled research environments'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed research deployment'
      ],

      knownLimitations: [
        'Supported analyses depend on implementation and configuration.'
      ],

      securityConsiderations: [],

      privacyConsiderations: [
        'Output-disclosure controls must be defined.'
      ],

      evidenceStatus:
        'Evidence linkage is required for specific performance claims.',

      demonstrationStatus: 'Demonstrated',
      validationStatus: 'Use-Case Dependent',

      customerValue:
        'Supports distributed multi-site analysis.',

      researchValue:
        'Enables cross-site analytical collaboration.',

      technicalValue:
        'Coordinates approved local analysis and aggregation.',

      operationalValue:
        'May reduce centralized data-transfer requirements.',

      owner: 'FedEMR Team',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

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
      linkedDecisionIds: []
    }),

    fixed('capability_local_control', {
      productId: 'product_fedemr',

      name: 'Local Data Control',
      shortName: 'Local Control',
      category: 'Data Governance',

      description:
        'Participating organizations retain control of their local patient-level data during configured federated workflows.',

      technicalDescription:
        'Patient-level source data remains within the participating environment while approved computation occurs locally.',

      userDescription:
        'Each participating organization keeps its patient-level data in its own controlled environment.',

      availabilityStatus: 'Available',
      supportStatus: 'Core Design Principle',

      researchOnly: false,
      commerciallySupported: false,
      experimental: false,

      firstAvailableVersionId:
        'product_version_current',

      currentSupportedVersionIds: [
        'product_version_current'
      ],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'Institution-controlled environment'
      ],

      dependencies: [
        'Local governance and access controls'
      ],

      supportedEnvironments: [
        'Institution-controlled infrastructure'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed research deployment',
        'Institution-managed deployment'
      ],

      knownLimitations: [
        'Local-control architecture does not replace institutional privacy, legal, security, ethics, or governance review.'
      ],

      securityConsiderations: [
        'Each participating environment remains responsible for its local security controls.'
      ],

      privacyConsiderations: [
        'The workflow must define permitted outputs and data use.'
      ],

      evidenceStatus:
        'Architecture and implementation evidence should support external wording.',

      demonstrationStatus: 'Demonstrated',
      validationStatus: 'Implementation-Dependent',

      customerValue:
        'Supports institutional control over patient-level data.',

      researchValue:
        'Reduces the need to create a central patient-level research dataset.',

      technicalValue:
        'Supports local computation within distributed environments.',

      operationalValue:
        'Aligns with distributed institutional governance.',

      owner: 'FedEMR Team',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

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
      linkedDecisionIds: []
       }),

    fixed('capability_orchestration', {
      productId: 'product_fedemr',

      name: 'Multi-Site Orchestration',
      shortName: 'Orchestration',
      category: 'Workflow Orchestration',

      description:
        'Coordinate approved workflows across multiple participating sites.',

      technicalDescription:
        'Manage distributed workflow steps, participating sites, execution status, and permitted result exchange.',

      userDescription:
        'Coordinate one approved project across several participating organizations.',

      availabilityStatus: 'Available',
      supportStatus: 'Research Support',

      researchOnly: false,
      commerciallySupported: false,
      experimental: false,

      firstAvailableVersionId:
        'product_version_current',

      currentSupportedVersionIds: [
        'product_version_current'
      ],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'Configured participating sites'
      ],

      dependencies: [
        'Site onboarding',
        'Workflow configuration'
      ],

      supportedEnvironments: [
        'Distributed participating environments'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed research deployment'
      ],

      knownLimitations: [
        'Site readiness and technical compatibility vary.'
      ],

      securityConsiderations: [
        'Cross-site communication and permissions require appropriate controls.'
      ],

      privacyConsiderations: [
        'Only permitted outputs may be exchanged.'
      ],

      evidenceStatus:
        'Internal technical documentation should be linked before external approval.',

      demonstrationStatus: 'Demonstrated',
      validationStatus: 'Use-Case Dependent',

      customerValue:
        'Creates a coordinated multi-site workflow.',

      researchValue:
        'Supports research collaboration across institutions.',

      technicalValue:
        'Controls distributed workflow execution.',

      operationalValue:
        'Improves visibility into site participation and workflow progress.',

      owner: 'FedEMR Team',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

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
      linkedDecisionIds: []
      }),

    fixed('capability_model_validation', {
      productId: 'product_fedemr',

      name: 'Federated Model Validation',
      shortName: 'Model Validation',
      category: 'Model Validation',

      description:
        'Evaluate a model across participating-site datasets while sites retain control of their local records.',

      technicalDescription:
        'Distribute an approved model or validation workflow to participating environments and combine permitted evaluation outputs.',

      userDescription:
        'Test how a model performs across several organizations without centralizing all patient-level validation data.',

      availabilityStatus: 'Available',
      supportStatus: 'Use-Case Dependent',

      researchOnly: false,
      commerciallySupported: false,
      experimental: false,

      firstAvailableVersionId:
        'product_version_current',

      currentSupportedVersionIds: [
        'product_version_current'
      ],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'Validation-ready local datasets'
      ],

      dependencies: [
        'Compatible outcome definitions',
        'Approved validation protocol'
      ],

      supportedEnvironments: [
        'Controlled research environments'
      ],

      supportedOperatingSystems: [
        'Environment-dependent'
      ],

      supportedDeploymentTypes: [
        'Distributed validation deployment'
      ],

      knownLimitations: [
        'Interpretation depends on data quality and comparability across sites.'
      ],

      securityConsiderations: [
        'Model access and validation outputs require appropriate controls.'
      ],

      privacyConsiderations: [
        'Permitted validation outputs must be defined.'
      ],

      evidenceStatus:
        'Use-case evidence is required for specific performance claims.',

      demonstrationStatus: 'Demonstrated',
      validationStatus: 'Protocol-Dependent',

      customerValue:
        'Supports broader evaluation before deployment decisions.',

      researchValue:
        'Enables external validation across participating institutions.',

      technicalValue:
        'Coordinates distributed model evaluation.',

      operationalValue:
        'Reduces the need to centralize validation datasets.',

      owner: 'FedEMR Team',
      confidentiality: 'Internal',

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

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
      linkedDecisionIds: []
       }),

    fixed('capability_zero_code', {
      productId: 'product_fedemr',

      name: 'Zero-Code Workflow',
      shortName: 'Zero-Code',
      category: 'User Experience',

      description:
        'A planned guided workflow that allows approved users to configure supported federated activities without writing code.',

      technicalDescription:
        'A planned interface layer that translates guided configuration into supported federated workflow definitions.',

      userDescription:
        'Set up supported federated workflows through a guided interface instead of writing code.',

      availabilityStatus: 'In Development',
      supportStatus: 'Not Yet Commercially Available',

      researchOnly: false,
      commerciallySupported: false,
      experimental: true,

      firstAvailableVersionId: '',

      currentSupportedVersionIds: [],

      plannedVersionIds: [
        'product_version_v2'
      ],

      requiredInfrastructure: [
        'FedEMR V2 supported environment'
      ],

      dependencies: [
        'V2 interface development',
        'Workflow-template validation',
        'User testing',
        'Deployment validation'
      ],

      supportedEnvironments: [
        'To Be Confirmed'
      ],

      supportedOperatingSystems: [
        'To Be Confirmed'
      ],

      supportedDeploymentTypes: [
        'Planned research deployment',
        'Planned institution-managed deployment'
      ],

      knownLimitations: [
        'Not available in the current product version.',
        'The initial release may support only defined workflow types.',
        'Supported environments remain under validation.'
      ],

      securityConsiderations: [
        'Workflow permissions and configuration controls require validation.'
      ],

      privacyConsiderations: [
        'Guided workflows must preserve approved data-flow and output controls.'
      ],

      evidenceStatus:
        'Development evidence only. No public performance claims are approved.',

      demonstrationStatus: 'In Development',
      validationStatus: 'Not Yet Validated',

      customerValue:
        'Intended to reduce setup effort and technical barriers.',

      researchValue:
        'Intended to make supported federated workflows easier to configure.',

      technicalValue:
        'Provides a guided configuration layer.',

      operationalValue:
        'Intended to improve repeatability and onboarding speed.',

      owner: 'FedEMR Team',
      confidentiality: 'Confidential',

      linkedProductVersionIds: [
        'product_version_v2'
      ],

      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],
      linkedApprovedClaimIds: [],
      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedEvidenceIds: [],

      linkedWorkPackageIds: [
        'workpackage_deployment'
      ],

      linkedFundingOpportunityIds: [
        'funding_commercialization'
      ],

      linkedCustomerIds: [],
      linkedRiskIds: [],
      linkedDecisionIds: []
    })
  ],

    audiences: [
    fixed('audience_researchers', {
      name: 'Researchers',
      audienceType: 'Research',

      description:
        'Researchers interested in multi-site collaboration, methodology, reproducibility, governance, and publication.',

      knowledgeLevel: 'Medium to High',

      primaryGoals: [
        'Conduct multi-site research',
        'Access broader populations',
        'Validate models externally',
        'Produce reproducible evidence'
      ],

      primaryConcerns: [
        'Methodological validity',
        'Data harmonization',
        'Governance',
        'Reproducibility',
        'Publication'
      ],

      commonObjections: [
        'Will participating sites produce comparable results?',
        'How are workflows reproduced?',
        'What analysis types are supported?'
      ],

      commonQuestions: [
        'How are sites onboarded?',
        'How is model validation performed?',
        'What data standards are required?'
      ],

      preferredTerminology: [
        'Federated analysis',
        'External validation',
        'Multi-site research',
        'Reproducible workflow'
      ],

      termsToAvoid: [
        'Oversimplified claims',
        'Unsupported performance claims'
      ],

      desiredTechnicalDepth: 'Medium to High',

      preferredEvidenceTypes: [
        'Methods documentation',
        'Technical validation',
        'Research publications',
        'Reproducible examples'
      ],

      typicalCallToAction:
        'Define a multi-site research question and participating-site requirements.',

      privacyConcerns: [
        'Research governance',
        'Permitted data use'
      ],

      securityConcerns: [],

      commercialConcerns: [],

      clinicalConcerns: [],

      researchConcerns: [
        'Methodology',
        'Reproducibility',
        'Data comparability'
      ],

      procurementConcerns: [],

      decisionCriteria: [
        'Scientific fit',
        'Feasibility',
        'Site readiness',
        'Methodological quality'
      ],

      successMeasures: [
        'Successful multi-site analysis',
        'Valid results',
        'Reproducible workflow'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_federated_training',
        'capability_federated_analytics',
        'capability_model_validation'
      ]
    }),

    fixed('audience_government', {
      name: 'Government and Policymakers',
      audienceType: 'Government',

      description:
        'Government stakeholders interested in public value, health-system capacity, privacy, economic development, and scalability.',

      knowledgeLevel: 'Variable',

      primaryGoals: [
        'Improve health-system capacity',
        'Support responsible innovation',
        'Demonstrate public value',
        'Strengthen domestic health technology'
      ],

      primaryConcerns: [
        'Value for public investment',
        'Privacy',
        'System scalability',
        'Procurement',
        'Accountability'
      ],

      commonObjections: [
        'How does this create measurable public value?',
        'Can it be deployed across jurisdictions?',
        'What implementation risks remain?'
      ],

      commonQuestions: [
        'What does each dollar invested unlock?',
        'How does the approach protect patient information?',
        'What system-capacity problem does it address?'
      ],

      preferredTerminology: [
        'System capacity',
        'Public value',
        'Privacy-preserving collaboration',
        'Economic development'
      ],

      termsToAvoid: [
        'Unsupported savings claims',
        'Guaranteed outcomes'
      ],

      desiredTechnicalDepth: 'Low to Medium',

      preferredEvidenceTypes: [
        'Economic analysis',
        'Implementation results',
        'System-level outcomes',
        'Published evidence'
      ],

      typicalCallToAction:
        'Support a defined implementation, evidence, or commercialization program.',

      privacyConcerns: [
        'Public trust',
        'Patient-data governance'
      ],

      securityConcerns: [
        'Government security expectations'
      ],

      commercialConcerns: [
        'Company sustainability',
        'Economic impact'
      ],

      clinicalConcerns: [],

      researchConcerns: [],

      procurementConcerns: [
        'Vendor readiness',
        'Contracting',
        'Value demonstration'
      ],

      decisionCriteria: [
        'Public value',
        'Feasibility',
        'Evidence',
        'Risk',
        'Scalability'
      ],

      successMeasures: [
        'Improved capacity',
        'Responsible implementation',
        'Measurable system value'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_local_control',
        'capability_orchestration'
      ]
      }),

    fixed('audience_clinicians', {
      name: 'Clinical Physicians',
      audienceType: 'Clinical',

      description:
        'Clinicians interested in patient relevance, clinical usefulness, workflow impact, and evidence.',

      knowledgeLevel:
        'Clinical expert with variable technical knowledge',

      primaryGoals: [
        'Improve patient care',
        'Understand clinical usefulness',
        'Reduce workflow burden',
        'Trust model performance'
      ],

      primaryConcerns: [
        'Clinical validity',
        'Patient safety',
        'Workflow disruption',
        'Interpretability',
        'Privacy'
      ],

      commonObjections: [
        'Will this change clinical workflow?',
        'How do we know the model works locally?',
        'Who remains accountable?'
      ],

      commonQuestions: [
        'What clinical problem does it solve?',
        'Has it been validated?',
        'How is patient information protected?'
      ],

      preferredTerminology: [
        'Clinical value',
        'Patient outcomes',
        'Local validation',
        'Participating health systems'
      ],

      termsToAvoid: [
        'Unqualified technical jargon',
        'Claims of guaranteed clinical benefit'
      ],

      desiredTechnicalDepth: 'Low to Medium',

      preferredEvidenceTypes: [
        'Clinical validation',
        'Peer-reviewed research',
        'Implementation results'
      ],

      typicalCallToAction:
        'Identify a clinically meaningful use case and local validation pathway.',

      privacyConcerns: [
        'Patient confidentiality',
        'Appropriate data use'
      ],

      securityConcerns: [],
      commercialConcerns: [],

      clinicalConcerns: [
        'Validation',
        'Safety',
        'Workflow fit'
      ],

      researchConcerns: [
        'Evidence quality'
      ],

      procurementConcerns: [],

      decisionCriteria: [
        'Clinical relevance',
        'Evidence strength',
        'Workflow impact'
      ],

      successMeasures: [
        'Improved decision support',
        'Acceptable workflow burden',
        'Validated local performance'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_local_control',
        'capability_model_validation'
      ]
    }),

    fixed('audience_health_executives', {
      name: 'Health-System Executives',
      audienceType: 'Executive',

      description:
        'Leaders focused on strategic value, implementation risk, operational outcomes, procurement, and sustainability.',

      knowledgeLevel: 'Executive',

      primaryGoals: [
        'Improve system performance',
        'Reduce implementation risk',
        'Demonstrate value',
        'Support responsible innovation'
      ],

      primaryConcerns: [
        'ROI',
        'Deployment effort',
        'Procurement',
        'Security',
        'Operational ownership'
      ],

      commonObjections: [
        'How much work is required from our team?',
        'What measurable value will result?',
        'Who supports deployment?'
      ],

      commonQuestions: [
        'What does implementation require?',
        'What is the business case?',
        'How is risk managed?'
      ],

      preferredTerminology: [
        'Operational value',
        'Implementation readiness',
        'Time to value',
        'Governed deployment'
      ],

      termsToAvoid: [
        'Research-only framing without operational relevance'
      ],

      desiredTechnicalDepth: 'Low to Medium',

      preferredEvidenceTypes: [
        'ROI evidence',
        'Implementation plan',
        'Operational measures',
        'Reference case study'
      ],

      typicalCallToAction:
        'Define a paid pilot or implementation pathway with measurable outcomes.',

      privacyConcerns: [
        'Institutional accountability'
      ],

      securityConcerns: [
        'Security package',
        'Incident response',
        'Vendor risk'
      ],

      commercialConcerns: [
        'Pricing',
        'Support',
        'Contracting'
      ],

      clinicalConcerns: [
        'Clinical ownership'
      ],

      researchConcerns: [],

      procurementConcerns: [
        'Vendor readiness',
        'Insurance',
        'Contracting'
      ],

      decisionCriteria: [
        'Value',
        'Risk',
        'Implementation effort',
        'Evidence'
      ],

      successMeasures: [
        'Time to value',
        'Operational adoption',
        'Measured outcomes'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: []
       }),

    fixed('audience_privacy', {
      name: 'Privacy and Legal Teams',
      audienceType: 'Privacy and Legal',

      description:
        'Reviewers focused on data flows, governance, agreements, accountability, and permitted use.',

      knowledgeLevel: 'Specialist',

      primaryGoals: [
        'Understand data flows',
        'Confirm lawful and governed use',
        'Clarify accountability',
        'Reduce institutional risk'
      ],

      primaryConcerns: [
        'Patient-level data movement',
        'Data use',
        'Output disclosure',
        'Contracts',
        'Jurisdiction'
      ],

      commonObjections: [
        'What information leaves each organization?',
        'Who controls the workflow?',
        'What agreements are required?'
      ],

      commonQuestions: [
        'Where does patient-level data reside?',
        'What outputs are exchanged?',
        'Who is responsible at each site?'
      ],

      preferredTerminology: [
        'Local data control',
        'Permitted outputs',
        'Institution-controlled environment',
        'Governed workflow'
      ],

      termsToAvoid: [
        'Absolute privacy guarantees',
        'Claims that technical design eliminates legal review'
      ],

      desiredTechnicalDepth: 'Medium to High',

      preferredEvidenceTypes: [
        'Data-flow documentation',
        'Privacy assessment',
        'Agreements',
        'Architecture documentation'
      ],

      typicalCallToAction:
        'Review the use case, data flows, outputs, agreements, and responsibilities.',

      privacyConcerns: [
        'Patient-level data handling',
        'Permitted data use',
        'Output disclosure'
      ],

      securityConcerns: [
        'Access controls',
        'Auditability'
      ],

      commercialConcerns: [
        'Contract terms'
      ],

      clinicalConcerns: [],

      researchConcerns: [
        'Research permissions'
      ],

      procurementConcerns: [],

      decisionCriteria: [
        'Data minimization',
        'Governance',
        'Accountability',
        'Evidence'
      ],

      successMeasures: [
        'Approved data flow',
        'Clear responsibilities',
        'Documented controls'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_local_control'
      ]
    }),

    fixed('audience_technical', {
      name: 'Technical Implementation Teams',
      audienceType: 'Technical',

      description:
        'Technical teams responsible for architecture, deployment, integration, security, and operations.',

      knowledgeLevel: 'High',

      primaryGoals: [
        'Understand architecture',
        'Estimate deployment effort',
        'Confirm compatibility',
        'Operate safely'
      ],

      primaryConcerns: [
        'Infrastructure',
        'Integration',
        'Security',
        'Observability',
        'Support'
      ],

      commonObjections: [
        'What must be installed locally?',
        'How are workflows controlled?',
        'How are failures handled?'
      ],

      commonQuestions: [
        'What operating systems are supported?',
        'What network access is required?',
        'How are logs and permissions managed?'
      ],

      preferredTerminology: [
        'Architecture',
        'Deployment',
        'Orchestration',
        'Local compute',
        'Integration'
      ],

      termsToAvoid: [
        'Vague technical claims'
      ],

      desiredTechnicalDepth: 'High',

      preferredEvidenceTypes: [
        'Architecture diagrams',
        'Technical documentation',
        'Test results',
        'Deployment guide'
      ],

      typicalCallToAction:
        'Complete a technical-discovery and environment-readiness assessment.',

      privacyConcerns: [
        'Data flow',
        'Output handling'
      ],

      securityConcerns: [
        'Authentication',
        'Authorization',
        'Logging',
        'Network controls'
      ],

      commercialConcerns: [
        'Support boundaries'
      ],

      clinicalConcerns: [],
      researchConcerns: [],

      procurementConcerns: [
        'Technical security requirements'
      ],

      decisionCriteria: [
        'Compatibility',
        'Security',
        'Maintainability',
        'Supportability'
      ],

      successMeasures: [
        'Successful deployment',
        'Stable operation',
        'Clear support process'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_federated_training',
        'capability_federated_analytics',
        'capability_local_control',
        'capability_orchestration',
        'capability_model_validation',
        'capability_zero_code'
      ]
        }),

    fixed('audience_pharma', {
      name: 'Pharmaceutical Companies',
      audienceType: 'Pharmaceutical',

      description:
        'Pharmaceutical stakeholders interested in distributed research, cohort feasibility, real-world evidence, and multi-site analysis.',

      knowledgeLevel: 'Medium to High',

      primaryGoals: [
        'Assess cohorts across sites',
        'Generate real-world evidence',
        'Support distributed studies',
        'Reduce data-access barriers'
      ],

      primaryConcerns: [
        'Feasibility',
        'Data consistency',
        'Contracting',
        'Timelines',
        'Evidence quality'
      ],

      commonObjections: [
        'Can participating sites support the required analysis?',
        'How consistent are cohort definitions?',
        'What deployment and contracting effort is required?'
      ],

      commonQuestions: [
        'Can this support cohort feasibility?',
        'Can models be evaluated across institutions?',
        'What data remains local?'
      ],

      preferredTerminology: [
        'Real-world evidence',
        'Cohort feasibility',
        'Distributed analysis',
        'Multi-site validation'
      ],

      termsToAvoid: [
        'Unsupported regulatory claims'
      ],

      desiredTechnicalDepth: 'Medium',

      preferredEvidenceTypes: [
        'Technical feasibility',
        'Study results',
        'Implementation plan',
        'Data-quality assessment'
      ],

      typicalCallToAction:
        'Define a scoped feasibility or evidence-generation use case.',

      privacyConcerns: [
        'Permitted data use',
        'Cross-organization governance'
      ],

      securityConcerns: [],

      commercialConcerns: [
        'Timeline',
        'Pricing',
        'Contracting'
      ],

      clinicalConcerns: [],

      researchConcerns: [
        'Scientific validity',
        'Cohort comparability'
      ],

      procurementConcerns: [],

      decisionCriteria: [
        'Scientific fit',
        'Site readiness',
        'Timeline',
        'Evidence quality'
      ],

      successMeasures: [
        'Feasibility established',
        'Valid evidence generated',
        'Sites successfully coordinated'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: [
        'capability_federated_analytics',
        'capability_model_validation'
      ]
    }),

    fixed('audience_funders', {
      name: 'Funders and Investors',
      audienceType: 'Funding',

      description:
        'Stakeholders evaluating strategic fit, product maturity, evidence, market opportunity, milestones, and risk.',

      knowledgeLevel: 'Variable',

      primaryGoals: [
        'Understand the opportunity',
        'Assess readiness',
        'Evaluate impact',
        'Assess execution capacity'
      ],

      primaryConcerns: [
        'Market need',
        'Product maturity',
        'Evidence',
        'Team',
        'Commercialization pathway'
      ],

      commonObjections: [
        'What has been demonstrated?',
        'What remains to be built?',
        'How will funding unlock commercialization?'
      ],

      commonQuestions: [
        'What is the current TRL?',
        'What is the next product milestone?',
        'What measurable outcome will funding produce?'
      ],

      preferredTerminology: [
        'Milestones',
        'Commercialization readiness',
        'Product readiness',
        'Market opportunity',
        'Evidence'
      ],

      termsToAvoid: [
        'Unsupported market or performance claims'
      ],

      desiredTechnicalDepth: 'Low to Medium',

      preferredEvidenceTypes: [
        'Milestone plan',
        'Market evidence',
        'Technical validation',
        'Customer evidence',
        'Budget'
      ],

      typicalCallToAction:
        'Fund a defined milestone with measurable commercialization outcomes.',

      privacyConcerns: [],
      securityConcerns: [],

      commercialConcerns: [
        'Market',
        'Business model',
        'Execution'
      ],

      clinicalConcerns: [],
      researchConcerns: [],
      procurementConcerns: [],

      decisionCriteria: [
        'Strategic fit',
        'Impact',
        'Readiness',
        'Execution plan',
        'Risk'
      ],

      successMeasures: [
        'Milestones completed',
        'Readiness improved',
        'Customer or deployment progress'
      ],

      active: true,
      confidentiality: 'Internal',

      linkedContentAssetIds: [],
      linkedPresentationIds: [],
      linkedApprovedClaimIds: [],
      linkedUseCaseIds: [],
      linkedCaseStudyIds: [],

      linkedProductVersionIds: [
        'product_version_current',
        'product_version_v2'
      ],

      linkedProductCapabilityIds: []
    })
  ],

  contentAssets: [],
  presentations: [],
  useCases: [],
  caseStudies: [],
  approvedClaims: [],

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