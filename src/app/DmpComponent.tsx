import { FC, ChangeEvent, useEffect, useState } from 'react'
import { DataManagementPlan } from './apiTypes'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { Box, Button, Card, CardContent, Typography, Link, InputLabel } from '@mui/material'

export type SaveItemProps = {
  title: string
  contactEmail: string
  opportunityId: string
  description: string
}

type DmpComponentProps = {
  record: DataManagementPlan
  saveItem: (id: string, payload: SaveItemProps) => Promise<void>
}

const DmpComponent: FC<DmpComponentProps> = ({ record, saveItem }) => {
  const { dmp } = record

  const [title, setTitle] = useState(dmp.title)
  const [contactEmail, setContactEmail] = useState(dmp.contact.mbox)
  // It is not clear how the opportunityId is supposed to be used, so I'm just going to store it as a string
  // It looks like it should be a dropdown of some sort.
  const [opportunityId, setOpportunityId] = useState(
    dmp.project[0]?.funding[0]?.dmproadmap_funding_opportunity_id?.identifier || ''
  )
  const [description, setDescription] = useState(dmp.description)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContactEmailChange = (event: ChangeEvent<HTMLInputElement>) => setContactEmail(event.target.value)
  const handleOpportunityIdChange = (event: ChangeEvent<HTMLInputElement>) => setOpportunityId(event.target.value)
  const handleAbstractChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)

  const handleSave = async () => {
    // Check if required fields are filled
    // TODO implement a form library like react-hook-form to handle this
    if (!title.trim() || !contactEmail.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    // Ask the user for confirmation
    const userConfirmed = window.confirm('Are you sure you want to save these changes?')

    if (userConfirmed) {
      // If the user clicked 'OK', proceed with the save logic
      await saveItem(dmp.dmp_id.identifier, { title, contactEmail, opportunityId, description })
    } else {
      // If the user clicked 'Cancel', do nothing
      console.info('Save cancelled by user')
    }
  }

  // This is not an ideal way of handling record changes, but it is a quick fix for this example
  useEffect(() => {
    setTitle(record.dmp.title)
    setContactEmail(record.dmp.contact.mbox)
    setOpportunityId(record.dmp.project[0]?.funding[0]?.dmproadmap_funding_opportunity_id?.identifier || '')
    setDescription(record.dmp.description)
  }, [record])

  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <InputLabel>DMP ID</InputLabel>
          <Link href={dmp.dmp_id.identifier} target='_blank' rel='noopener'>
            {dmp.dmp_id.identifier}
          </Link>
        </Box>

        <Box mb={2}>
          <InputLabel>Last Updated</InputLabel>
          <Typography variant='body1'>{dmp.modified}</Typography>
        </Box>

        <TextField
          label='Title'
          type='text'
          fullWidth
          required
          value={title}
          onChange={handleTitleChange}
          margin='normal'
        />

        <TextField
          label='Contact Email'
          type='email'
          fullWidth
          required
          value={contactEmail}
          onChange={handleContactEmailChange}
          margin='normal'
        />

        <Box mb={2}>
          <InputLabel>Contributor Count</InputLabel>
          <Typography variant='body1'>{(dmp.contributor || []).length}</Typography>
        </Box>

        {/* This appears to be html, but I'm just putting it in a textarea for now, an HTML editor should be used */}
        <InputLabel htmlFor='abstract'>Abstract</InputLabel>
        <TextareaAutosize
          aria-label='abstract'
          minRows={3}
          placeholder='Abstract'
          style={{ width: '100%', marginTop: '8px', marginBottom: '16px' }}
          onChange={handleAbstractChange}
          value={description}
        />

        <Typography variant='body1'>Funder: {dmp.project[0]?.funding[0]?.name}</Typography>

        <TextField
          label='Opportunity ID'
          type='text'
          fullWidth
          value={opportunityId}
          onChange={handleOpportunityIdChange}
          margin='normal'
        />
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}

export default DmpComponent
