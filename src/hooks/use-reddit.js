import { useState, useEffect } from 'react'

const useReddit = postId => {
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReddit() {
      const response = await fetch(
        `https://www.reddit.com/comments/${postId}.json`
      )
      const data = await response.json()
      setScore(data[0].data.children[0].data.score)
      setLoading(false)
    }
    fetchReddit()
  }, [postId])
  return [score, loading]
}

export default useReddit
