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

  const getDocs = async (collection: string) => {
    const docs: Record<string, any>[] = []
    try {
      const query = await getDocsFirebase(firebaseCollection(db, collection))
      query.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return docs
    } catch (error) {
      return error
    }
  }

  const getDocsWithQuery = async (
    collection: string,
    ...queryConstraints: QueryConstraint[]
  ) => {
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
      return docs
    } catch (error) {
      return error
    }
  }

  const getDoc = async (collection: string, id: string) => {
    const ref = firebaseDoc(db, collection, id)
    try {
      const doc = await getDocFirebase(ref)
      if (doc.exists()) {
        return {
          id: doc.id,
          ...doc.data()
        }
      } else {
        return Promise.reject({
          code: 'db/doc-doesnt-exists'
        })
      }
    } catch (error) {
      return error
    }
  }

  const addDoc = async (collection: string, data: any) => {
    const ref = firebaseCollection(db, collection)
    try {
      const doc = await addDocFirebase(ref, data)
      return doc
    } catch (error) {
      return error
    }
  }

  const setDoc = async (collection: string, data: any, id: string) => {
    const ref = firebaseDoc(db, collection, id)
    try {
      const doc = await setDocFirebase(ref, data)
      return doc
    } catch (error) {
      return error
    }
  }

  const updateDoc = async (collection: string, id: string, data: any) => {
    const ref = firebaseDoc(db, collection, id)
    try {
      const doc = await setDocFirebase(ref, data)
      return doc
    } catch (error) {
      return error
    }
  }

  const deleteDoc = async (collection: string, id: string) => {
    const ref = firebaseDoc(db, collection, id)
    try {
      await deleteDocFirebase(ref)
      return true
    } catch (error) {
      return error
    }
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
