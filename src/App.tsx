import { FC, useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { fetchDmpRecordsList, saveDmpRecord } from './app/dmpRecordsApi'
import type { DataManagementPlan } from './app/apiTypes'
import DmpComponent, { SaveItemProps } from './app/DmpComponent'
import DmpIdSelect from './app/DmpIdSelect'

type AppProps = {
  fetchRecordsQuery: (dmpId: string) => Promise<DataManagementPlan[]>
  updateRecordQuery: (dmpId: string, payload: SaveItemProps) => Promise<void>
}

// Pass the functions with the fetchRecordsQuery prop for testing
const App: FC<AppProps> = ({ fetchRecordsQuery = fetchDmpRecordsList, updateRecordQuery = saveDmpRecord }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dmpId, setDmpId] = useState<string | undefined>(undefined)
  const [dmpRecords, setDmpRecords] = useState<DataManagementPlan[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true)
      if (!dmpId) return setDmpRecords(undefined)
      const records = await fetchRecordsQuery(dmpId)
      setDmpRecords(records)
    } catch (error) {
      const e = error as Error
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fetchRecordsQuery, dmpId])

  useEffect(() => {
    void fetchRecords()
  }, [fetchRecords])

  const renderRecords = () => {
    if (loading) return <div>Loading...</div>
    if (!dmpRecords) return <div>No record chosen</div>
    return (
      <>
        {dmpRecords.map((dmpRecord: DataManagementPlan) => {
          if (!dmpRecord || !dmpRecord.dmp) return <div>Invalid DMP Record</div>
          return <DmpComponent key={String(dmpRecord.dmp.dmp_id)} record={dmpRecord} saveItem={updateRecordQuery} />
        })}
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
      <Grid item xs={12}>
        <DmpIdSelect onChange={setDmpId} dmpId={dmpId || ''} />
      </Grid>
      <Grid item xs={12}>
        {renderRecords()}
      </Grid>
    </Grid>
  )
}

export default App
