import {
  getFirestore,
  doc as firebaseDoc,
  getDocs as getDocsFirebase,
  collection as firebaseCollection,
  query,
  where,
  orderBy,
  limit,
  setDoc as setDocFirebase,
  deleteDoc as deleteDocFirebase,
  addDoc as addDocFirebase,
  getDoc as getDocFirebase,
  QueryConstraint
} from 'firebase/firestore'

function useDb() {
  const db = getFirestore()

  const getDocs = (
    collection: string
  ): Promise<Record<string, any>[] | unknown> => {
    return new Promise(async (resolve, reject) => {
      const docs: Record<string, any>[] = []
      try {
        const query = await getDocsFirebase(firebaseCollection(db, collection))
        query.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          })
        })
        resolve(docs)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getDocsWithQuery = (
    collection: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<Record<string, any>[] | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseCollection(db, collection)
      const q = query(ref, ...queryConstraints)
      const docs: Record<string, any>[] = []
      try {
        const query = await getDocsFirebase(q)
        query.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          } as Record<string, any>)
        })
        resolve(docs as Record<string, any>[])
      } catch (error) {
        reject(error)
      }
    })
  }

  const getDoc = (
    collection: string,
    id: string
  ): Promise<Record<string, any> | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseDoc(db, collection, id)
      try {
        const doc = await getDocFirebase(ref)
        if (doc.exists()) {
          resolve({
            id: doc.id,
            ...doc.data()
          })
        } else {
          reject({
            code: 'db/doc-doesnt-exists'
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const addDoc = (
    collection: string,
    data: any
  ): Promise<Record<string, any> | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseCollection(db, collection)
      try {
        const doc = await addDocFirebase(ref, data)
        resolve(doc)
      } catch (error) {
        reject(error)
      }
    })
  }

  const setDoc = (
    collection: string,
    data: any,
    id: string
  ): Promise<Record<string, any> | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseDoc(db, collection, id)
      try {
        const doc = await setDocFirebase(ref, data)
        resolve(doc)
      } catch (error) {
        reject(error)
      }
    })
  }

  const updateDoc = (
    collection: string,
    id: string,
    data: any
  ): Promise<Record<string, any> | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseDoc(db, collection, id)
      try {
        const doc = await setDocFirebase(ref, data)
        resolve(doc)
      } catch (error) {
        reject(error)
      }
    })
  }

  const deleteDoc = (
    collection: string,
    id: string
  ): Promise<boolean | unknown> => {
    return new Promise(async (resolve, reject) => {
      const ref = firebaseDoc(db, collection, id)
      try {
        await deleteDocFirebase(ref)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    db,
    getDoc,
    getDocs,
    getDocsWithQuery,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    where,
    orderBy,
    limit
  }
}

export default useDb
