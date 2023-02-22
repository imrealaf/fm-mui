import React from 'react'
import { Grid } from '@mui/material'
import validator from 'validator'
import { ChangeEventData, handleTextChange } from 'fm-mui'

import * as paths from 'routes/paths'
import PageFetchingData from 'components/hoc/PageFetchingData'
import EditableTextField from 'components/EditableTextField'
import PrivatePage from 'components/PrivatePage'
import ViewEditSection from 'components/ViewEditSection'
import { useProfile, useApp } from 'hooks'

type NameData = {
  firstName: string
  lastName: string
}

const AccountNameRoute = () => {
  const { editMode, setEditMode } = useApp()
  const { profile, getProfile, updateProfile } = useProfile()
  const [valid, setValid] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const initialState = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || ''
  }
  const [data, setData] = React.useState<NameData>(initialState)

  const onChange = ({ name, value }: ChangeEventData) => {
    setData({
      ...data,
      [name]: value
    })

    if (!dirty) setDirty(true)
  }

  const checkIfValid = (data: NameData) => {
    const firstNameValid = validator.isLength(data.firstName, { min: 2 })
    const lastNameValid = validator.isLength(data.lastName, { min: 2 })
    setValid(firstNameValid && lastNameValid)
  }

  const onSubmit = async () => {
    try {
      await updateProfile(data)
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = () => {
    setData(initialState)
  }

  React.useEffect(() => {
    checkIfValid(data)
  }, [data])

  React.useEffect(() => {
    if (!editMode) {
      setDirty(false)
    }
  }, [editMode])

  return (
    <PageFetchingData
      data={profile}
      getData={getProfile}
      setData={() => setData(initialState)}
    >
      <PrivatePage maxWidth='sm'>
        <ViewEditSection
          backPath={paths.ACCOUNT_PERSONAL_INFO_ROUTE}
          rootTitle='Basic Info'
          title='Name'
          disabled={!valid || !dirty}
          onCancel={onCancel}
          onSubmit={onSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <EditableTextField
                required
                error={editMode && !data.firstName.length}
                helperText={
                  editMode && !data.firstName.length
                    ? 'First name cannot be empty'
                    : ''
                }
                label='First Name'
                fullWidth
                disabled={!editMode}
                value={data.firstName}
                name='firstName'
                onChange={(e) => handleTextChange(e, onChange)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EditableTextField
                label='Last Name'
                fullWidth
                disabled={!editMode}
                value={!editMode && !data.lastName ? '-' : data.lastName}
                name='lastName'
                onChange={(e) => handleTextChange(e, onChange)}
              />
            </Grid>
          </Grid>
        </ViewEditSection>
      </PrivatePage>
    </PageFetchingData>
  )
}

export default AccountNameRoute
