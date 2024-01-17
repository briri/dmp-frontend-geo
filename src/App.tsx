import { FC, useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { fetchDmpRecordsList } from './api/dmpRecordsList'
import type { DataManagementPlan } from './api/types'
import DmpComponent from './DmpComponent'
import DmpIdSelect from './DmpIdSelect'

type AppProps = {
  fetchRecordsQuery?: (dmpId: string) => Promise<DataManagementPlan[]>
}

const App: FC<AppProps> = ({ fetchRecordsQuery = fetchDmpRecordsList }) => {
  const [dmpId, setDmpId] = useState<string | undefined>(undefined)
  const [dmpRecords, setDmpRecords] = useState<DataManagementPlan[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchRecords = useCallback(async () => {
    try {
      console.log({ dmpId })
      if (!dmpId) return setDmpRecords(undefined)
      const records = await fetchRecordsQuery(dmpId || '')
      console.log({ records })
      setDmpRecords(records)
    } catch (error) {
      const e = error as Error
      console.error(e)
      setError(e.message)
    }
  }, [fetchRecordsQuery, dmpId])

  useEffect(() => {
    void fetchRecords()
  }, [fetchRecords])

  const renderRecords = () => {
    if (!dmpRecords) return <div>Loading...</div>
    return (
      <>
        {dmpRecords.map((dmpRecord: DataManagementPlan) => (
          <DmpComponent key={String(dmpRecord.dmp.dmp_id)} record={dmpRecord} />
        ))}
        {error && (
          <Grid item xs={12}>
            <div className='error-message'>{error}</div>
          </Grid>
        )}
      </>
    )
  }

  return (
    <Grid container spacing={2} justifyContent='center' style={{ marginTop: '20px' }}>
      <Grid item xs={12} md={8} lg={6}>
        <DmpIdSelect onChange={setDmpId} dmpId={dmpId || ''} />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        {renderRecords()}
      </Grid>
    </Grid>
  )
}

export default App
