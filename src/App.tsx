import { FC, useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { fetchDmpRecordsList, saveDmpRecord } from './app/dmpRecordsApi'
import type { DataManagementPlan } from './app/apiTypes'
import DmpComponent, { SaveItemProps } from './app/DmpComponent'
import DmpIdSelect from './app/DmpIdSelect'
import SortSelect from './app/SortSelect'

type AppProps = {
  fetchRecordsQuery: (dmpId: string) => Promise<DataManagementPlan[]>
  updateRecordQuery: (dmpId: string, payload: SaveItemProps) => Promise<void>
  initDmpId?: string
}

// Pass the functions and initial state props for future testing
const App: FC<AppProps> = ({
  fetchRecordsQuery = fetchDmpRecordsList,
  updateRecordQuery = saveDmpRecord,
  initDmpId,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dmpId, setDmpId] = useState<string | undefined>(initDmpId)
  const [sort, setSort] = useState<string | undefined>('title')
  const [dmpRecords, setDmpRecords] = useState<DataManagementPlan[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true)
      // For init, and future functionality to clear selected record
      if (!dmpId) return setDmpRecords(undefined)
      const records = await fetchRecordsQuery(dmpId)
      const sortedRecords = records.sort((a, b) => {
        if (!sort) return 0
        if (sort === 'title') return a.dmp.title.localeCompare(b.dmp.title)
        if (sort === 'modified') return a.dmp.modified.localeCompare(b.dmp.modified)
        return 0
      })
      setDmpRecords(sortedRecords)
    } catch (error) {
      const e = error as Error
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fetchRecordsQuery, dmpId, sort])

  useEffect(() => {
    void fetchRecords()
  }, [fetchRecords])

  const renderRecords = () => {
    if (loading) return <div>Loading...</div>
    if (!dmpRecords) return <div>No DMP ID chosen</div>
    return (
      <>
        {dmpRecords.map((dmpRecord: DataManagementPlan) => {
          if (!dmpRecord || !dmpRecord.dmp) return <div>Invalid DMP Record</div>
          return <DmpComponent key={String(dmpRecord.dmp.dmp_id)} record={dmpRecord} saveItem={updateRecordQuery} />
        })}
      </>
    )
  }

  if (error) {
    return (
      <Grid item xs={12}>
        <div className='error-message'>{error}</div>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} justifyContent='center' style={{ marginTop: '20px' }}>
      <Grid item xs={6}>
        <DmpIdSelect onChange={setDmpId} dmpId={dmpId || ''} />
      </Grid>
      <Grid item xs={6}>
        <SortSelect onChange={setSort} sortInit={sort} />
      </Grid>
      <Grid item xs={12}>
        {renderRecords()}
      </Grid>
    </Grid>
  )
}

export default App
