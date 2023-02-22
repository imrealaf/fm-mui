import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

import PageTitle from 'components/PageTitle'
import PageFetchingData from 'components/hoc/PageFetchingData'
import PrivatePage from 'components/PrivatePage'
import CategorySections from 'components/CategorySections'
import { useSettings } from 'hooks'

const SettingsRoute = () => {
  const { settings, getSettings, updateSettings } = useSettings()
  const [loading, setLoading] = React.useState(!settings)
  const [data, setData] = React.useState({
    darkMode: settings?.darkMode || false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.checked
    const name = target.getAttribute('name') as string
    setData({
      ...data,
      [name]: value
    })
  }

  const uiRows = [
    {
      label: 'Dark Mode',
      value: (
        <FormControlLabel
          control={
            <Switch
              name='darkMode'
              value={data.darkMode}
              checked={data.darkMode}
              onChange={handleChange}
            />
          }
          label={data.darkMode ? 'On' : 'Off'}
        />
      ),
      hideArrow: true,
      alignValue: 'end',
      disableHover: true
    }
  ]

  const sections = [
    {
      title: 'User Interface',
      rows: uiRows
    }
  ]

  React.useEffect(() => {
    updateSettings(data)
  }, [data])

  return (
    <PageFetchingData
      data={settings}
      getData={getSettings}
      setLoading={() => setLoading(false)}
    >
      <PrivatePage
        maxWidth='xs'
        pageTitle={<PageTitle title='Settings' icon={SettingsIcon} />}
      >
        <CategorySections
          items={sections}
          loading={loading}
          showBackBtn={false}
        />
      </PrivatePage>
    </PageFetchingData>
  )
}

export default SettingsRoute
