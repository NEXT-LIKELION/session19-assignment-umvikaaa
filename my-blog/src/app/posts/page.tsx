'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    username: string
  }
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-600">게시글</h1>
        <Link
          href="/posts/new"
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          새 글 작성
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">아직 게시글이 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-pink-600">
                  {post.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-500 mb-4">
                <span>{post.profiles?.username || '익명'}</span>
                <span className="mx-2">•</span>
                <span>{format(new Date(post.created_at), 'PPP', { locale: ko })}</span>
              </div>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 