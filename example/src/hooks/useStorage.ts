import { useState } from 'react'
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { extension } from 'es-mime-types'

function useProfile() {
  const storage = getStorage()
  const auth = getAuth()
  const [progress, setProgress] = useState(0)
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/`

  const getPathFromUrl = (url: string) => {
    let output = url
    output = output.replace(baseUrl, '')
    output = output.split('?')[0]
    return output.split('%2F').join('/')
  }

  const deleteFile = async (url: string) => {
    const path = getPathFromUrl(url)
    const storageRef = ref(storage, path)
    try {
      await deleteObject(storageRef)
      return auth.currentUser || null
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  const uploadFile = (
    file: any,
    path: string,
    name: string
  ): Promise<string | unknown> => {
    return new Promise((resolve, reject) => {
      if (!file) reject('No file specified')
      const ext = extension(file.type)
      const storageRef = ref(storage, `${path}/${name}.${ext}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const downloadURL = (await getDownloadURL(
              uploadTask.snapshot.ref
            )) as unknown as string
            setProgress(0)
            resolve(downloadURL)
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  return {
    storage,
    baseUrl,
    progress,
    uploadFile,
    deleteFile,
    getPathFromUrl
  }
}

export default useProfile
