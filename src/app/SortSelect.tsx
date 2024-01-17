import { FC } from 'react'
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'

type DmpIdSelectProps = {
  onChange: (id: string) => void
  sortInit?: string
}

const SortSelect: FC<DmpIdSelectProps> = ({ onChange, sortInit = 'title' }) => {
  const dmpIds = [
    { value: 'title', label: 'Title' },
    { value: 'modified', label: 'Last Updated' },
  ]

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='dmp-id-select-label'>DMP ID</InputLabel>
      <Select labelId='dmp-id-select-label' id='dmp-id-select' value={sortInit} label='DMP ID' onChange={handleChange}>
        {dmpIds.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SortSelect
