import { FC, ChangeEvent, useEffect, useState } from 'react'
import { DataManagementPlan } from './api/types'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { Box, Button, Card, CardContent, Typography, Link, InputLabel } from '@mui/material'

type saveItemProps = {
  title: string
  contactEmail: string
  opportunityId: string
  description: string
}

type DmpComponentProps = {
  record: DataManagementPlan
  saveItem: (item: saveItemProps) => Promise<void>
}

const DmpComponent: FC<DmpComponentProps> = ({ record, saveItem }) => {
  const { dmp } = record

  const [title, setTitle] = useState(dmp.title)
  const [contactEmail, setContactEmail] = useState(dmp.contact.mbox)
  // From the DMP API, it looks like this is the correct field to use for the opportunity ID instead of what is provided
  const [opportunityId, setOpportunityId] = useState(
    dmp.project[0]?.funding[0]?.dmproadmap_funding_opportunity_id?.identifier || ''
  )
  const [description, setDescription] = useState(dmp.description)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContactEmailChange = (event: ChangeEvent<HTMLInputElement>) => setContactEmail(event.target.value)
  const handleOpportunityIdChange = (event: ChangeEvent<HTMLInputElement>) => setOpportunityId(event.target.value)
  const handleAbstractChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)

  const handleSave = async () => {
    // Ask the user for confirmation
    const userConfirmed = window.confirm('Are you sure you want to save these changes?')

    if (userConfirmed) {
      // If the user clicked 'OK', proceed with the save logic
      await saveItem({ title, contactEmail, opportunityId, description })
    } else {
      // If the user clicked 'Cancel', do nothing
      console.log('Save cancelled by user')
    }
  }

  useEffect(() => {
    setTitle(record.dmp.title)
    setContactEmail(record.dmp.contact.mbox)
    setOpportunityId(record.dmp.project[0]?.funding[0]?.dmproadmap_funding_opportunity_id?.identifier || '')
    console.log('desc', record.dmp.description)
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
      </CardContent>
      <Button variant='contained' color='primary' onClick={handleSave}>
        Save Changes
      </Button>
    </Card>
  )
}

export default DmpComponent
