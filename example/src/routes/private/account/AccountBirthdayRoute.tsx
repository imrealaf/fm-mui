import React from 'react'
import { Grid, MenuItem, FormControl, InputLabel } from '@mui/material'
import { ChangeEventData, handleSelectChange } from 'fm-mui'

import { hasValue } from 'validations'
import { BirthdayMap } from 'types'
import * as paths from 'routes/paths'
import { generateDays, generateYears } from 'utils'
import PageFetchingData from 'components/hoc/PageFetchingData'
import EditableSelect from 'components/EditableSelect'
import PrivatePage from 'components/PrivatePage'
import ViewEditSection from 'components/ViewEditSection'
import { useProfile, useApp } from 'hooks'
import months from 'data/months.json'

const AccountBirthdayRoute = () => {
  const { editMode, setEditMode } = useApp()
  const { profile, getProfile, updateProfile, birthdayMap } = useProfile()
  const [valid, setValid] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const initialState = birthdayMap
  const [data, setData] = React.useState<BirthdayMap>(initialState)

  const onChange = ({ name, value }: ChangeEventData) => {
    setData({
      ...data,
      [name]: value
    })

    if (!dirty) setDirty(true)
  }

  const onSubmit = async () => {
    const birthday = `${data.year}-${data.month}-${data.day}`
    try {
      await updateProfile({
        birthday
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
    setValid(hasValue(data.month) && hasValue(data.day) && hasValue(data.year))
  }, [data.month, data.day, data.year])

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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel variant='standard'>Month</InputLabel>
                <EditableSelect
                  disabled={!editMode}
                  variant='standard'
                  name='month'
                  value={data.month}
                  label='Month'
                  onChange={(e) => handleSelectChange(e, onChange)}
                >
                  {months.map((month: Record<string, any>) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </EditableSelect>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel variant='standard'>Day</InputLabel>
                <EditableSelect
                  disabled={!editMode}
                  variant='standard'
                  name='day'
                  value={data.day}
                  label='Month'
                  onChange={(e) => handleSelectChange(e, onChange)}
                >
                  {generateDays().map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </EditableSelect>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel variant='standard'>Year</InputLabel>
                <EditableSelect
                  disabled={!editMode}
                  variant='standard'
                  name='year'
                  value={data.year}
                  label='Year'
                  onChange={(e) => handleSelectChange(e, onChange)}
                >
                  {generateYears().map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
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

export default AccountBirthdayRoute
