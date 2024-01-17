import { FC } from 'react'
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'

type DmpIdSelectProps = {
  onChange: (id: string) => void
  dmpId: string
}

const DmpIdSelect: FC<DmpIdSelectProps> = ({ onChange, dmpId }) => {
  // Ideally this would be fetched from an API
  const dmpIds = [
    '10.48321/D1J31B',
    '10.48321/D1R316',
    '10.48321/D10601',
    '10.48321/D1CW23',
    '10.48321/D1930S',
    '10.48321/D1DW5J',
    '10.48321/D1ERROR',
  ]

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='dmp-id-select-label'>DMP ID</InputLabel>
      <Select
        labelId='dmp-id-select-label'
        id='dmp-id-select'
        value={dmpId || ''}
        label='DMP ID'
        onChange={handleChange}
      >
        {dmpIds.map((id) => (
          <MenuItem key={id} value={id}>
            {id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DmpIdSelect
