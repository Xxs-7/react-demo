import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../app-context'
import Post from '../components/post'

const HomePage = observer(() => {
  const [loading, setLoading] = useState(false)
  const { api, store } = useAppContext()

  const load = async () => {
    try {
      setLoading(true)
      await api.post.getAll()
      await api.user.getAll()
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div className='w-screen'>
      <h1>Posts</h1>

      {store.post.all.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
})

export default HomePage
