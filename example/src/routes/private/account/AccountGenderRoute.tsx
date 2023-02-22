import React from 'react'
import { Grid, MenuItem, FormControl, InputLabel } from '@mui/material'
import { ChangeEventData, handleSelectChange } from 'fm-mui'

import { hasValue } from 'validations'
import * as paths from 'routes/paths'
import PageFetchingData from 'components/hoc/PageFetchingData'
import EditableSelect from 'components/EditableSelect'
import PrivatePage from 'components/PrivatePage'
import ViewEditSection from 'components/ViewEditSection'
import { useProfile, useApp } from 'hooks'
import genders from 'data/genders.json'

const AccountGenderRoute = () => {
  const { editMode, setEditMode } = useApp()
  const { profile, getProfile, updateProfile } = useProfile()
  const [valid, setValid] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const initialState = profile?.gender || ''
  const [data, setData] = React.useState(initialState)

  const onChange = ({ value }: ChangeEventData) => {
    setData(value)

    if (!dirty) setDirty(true)
  }

  const onSubmit = async () => {
    try {
      await updateProfile({
        gender: data
      })
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = () => {
    setData(initialState)
  }

  React.useEffect(() => {
    setValid(hasValue(data))
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
          title='Gender'
          disabled={!valid || !dirty}
          onCancel={onCancel}
          onSubmit={onSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant='standard'>Gender</InputLabel>
                <EditableSelect
                  disabled={!editMode}
                  name='gender'
                  value={data}
                  label='Gender'
                  onChange={(e) => handleSelectChange(e, onChange)}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </EditableSelect>
              </FormControl>
            </Grid>
          </Grid>
        </ViewEditSection>
      </PrivatePage>
    </PageFetchingData>
  )
}

export default AccountGenderRoute
