interface Contact {
  name: string
  dmproadmap_affiliation: Record<string, unknown> // Replace with more specific type if known
  mbox: string
  // Add any other properties that are part of the contact object
}

interface Contributor {
  // Define the properties of a contributor
  // Example: name: string, role: string, etc.
}

interface Dataset {
  // Define the properties of a dataset
  // Example: id: string, title: string, etc.
}

interface DmpId {
  type: string
  identifier: string
}

interface DmphubVersion {
  // Define the properties for DmphubVersion
}

interface DmproadmapLinks {
  download: string
  get: string
}

interface DmproadmapTemplate {
  title: string
  id: string
}

interface RelatedIdentifier {
  // Define the properties for RelatedIdentifier
}

interface Identifier {
  type: string
  identifier: string
}

interface Affiliation {
  affiliation_id: Identifier
  name: string
}

interface FunderId {
  type: string
  identifier: string
}

interface Funding {
  dmproadmap_funded_affiliations: Affiliation[]
  dmproadmap_funding_opportunity_id?: Identifier
  funder_id: FunderId
  funding_status: string // Or a more specific type if there's a limited set of possible statuses
  name: string
}

interface Project {
  description: string
  end: string // Date in ISO 8601 format
  funding: Funding[] // Array of Funding objects
  start: string // Date in ISO 8601 format
  title: string
}

export interface DataManagementPlan {
  dmp: {
    contact: Contact
    contributor: Contributor[]
    created: string
    dataset: Dataset[]
    description: string
    dmp_id: DmpId
    dmphub_versions: DmphubVersion[]
    dmproadmap_external_system_identifier: string
    dmproadmap_featured: string
    dmproadmap_links: DmproadmapLinks
    dmproadmap_privacy: string
    dmproadmap_related_identifiers: RelatedIdentifier[]
    dmproadmap_template: DmproadmapTemplate
    ethical_issues_description: string
    ethical_issues_exist: string
    ethical_issues_report: string
    language: string
    modified: string
    project: Project[]
    title: string
  }
}
