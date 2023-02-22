import React, { useEffect } from 'react'

interface PageFetchingData {
  data: any
  getData(): void
  setData?(): void
  setLoading?(): void
  children: React.ReactNode
}

function PageFetchingData({
  data,
  getData,
  setData,
  setLoading,
  children
}: PageFetchingData) {
  useEffect(() => {
    if (!data) getData()
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data)
      if (setLoading) setLoading()
      if (setData) setData()
    }
  }, [data])

  return <>{children}</>
}

export default PageFetchingData
