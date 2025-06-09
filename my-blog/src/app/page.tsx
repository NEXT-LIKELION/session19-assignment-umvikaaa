'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  user_id: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('my-blog')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching posts on Home:', error)
        throw error
      }
      setPosts(data || [])
    } catch (error) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">My Blog</h1>
        <nav className="flex gap-4 items-center">
          <Link href="/posts" className="text-pink-500 hover:text-pink-700">
            게시글
          </Link>
          <AuthButton />
          <Link
            href="/posts/new"
            className="ml-auto px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            새 글 작성
          </Link>
        </nav>
      </header>
      
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">최근 게시글</h2>
        {loading ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">아직 게시글이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                <Link
                  href={`/posts/${post.id}`}
                  className="block hover:bg-gray-50 p-2 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {post.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-2">
                    <span>{post.user_id}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
} 