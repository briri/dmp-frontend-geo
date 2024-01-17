import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { SaveItemProps } from './app/DmpComponent'
import { DataManagementPlan, Funding, Project } from './app/apiTypes'

const mockContact = {
  name: 'string',
  mbox: 'string',
}

const mockDmpId = { identifier: '10.48321/D1J31B', type: 'url' }

const mockFunding: Funding = {
  dmproadmap_funded_affiliations: [{ name: 'id', affiliation_id: { type: 'id', identifier: 'affiliationId' } }],
  funder_id: { type: 'FunderId', identifier: 'fundId' },
  funding_status: 'string', // Or a more specific type if there's a limited set of possible statuses
  name: 'string',
}

const mockProjects: Project[] = [
  {
    description: 'string',
    end: 'string', // Date in ISO 8601 format
    funding: [mockFunding], // Array of Funding objects
    start: 'string', // Date in ISO 8601 format
    title: 'string',
  },
]

// Mock Data
const mockDmpRecord: DataManagementPlan = {
  dmp: {
    contact: mockContact,
    created: '2022-01-01',
    description: 'Test Description',
    dmp_id: mockDmpId,
    dmphub_versions: [
      {
        /* ... */
      },
    ],
    dmproadmap_external_system_identifier: '10.48321/D1J31B',
    dmproadmap_featured: '1',
    dmproadmap_privacy: 'public',
    dmproadmap_related_identifiers: [
      {
        /* ... */
      },
    ],
    ethical_issues_description: 'None',
    ethical_issues_exist: 'no',
    ethical_issues_report: 'Not applicable',
    language: 'eng',
    modified: '2022-01-02',
    project: mockProjects,
    title: 'Test Title',
  },
}

// Custom function to simulate fetchDmpRecordsList
const mockFetchDmpRecordsList = jest.fn((_dmpId: string) => {
  return Promise.resolve([mockDmpRecord])
})

// Custom function to simulate saveDmpRecord
const mockSaveDmpRecord = jest.fn((_dmpId: string, _payload: SaveItemProps) => {
  return Promise.resolve()
})

describe('App Component', () => {
  it('renders and fetches records', async () => {
    render(
      <App
        fetchRecordsQuery={mockFetchDmpRecordsList}
        updateRecordQuery={mockSaveDmpRecord}
        initDmpId='10.48321/D1J31B'
      />
    )

    expect(mockFetchDmpRecordsList).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.getByText('2022-01-02')).toBeInTheDocument()
    })
  })

  it('displays DmpComponent when records are fetched', async () => {
    render(
      <App
        fetchRecordsQuery={mockFetchDmpRecordsList}
        updateRecordQuery={mockSaveDmpRecord}
        initDmpId='10.48321/D1J31B'
      />
    )

    await waitFor(() => {
      expect(screen.getByText('2022-01-02')).toBeInTheDocument()
    })
  })

  // TODO: Additional tests for save functionality, error handling, etc.
})
