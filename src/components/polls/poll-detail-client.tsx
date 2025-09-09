'use client'

import React, { useEffect, useState } from 'react'
import { getById } from '@/src/services/polls'
import type { PollData } from '@/src/types/polls'

interface PollDetailClientProps {
  id: number | string
}

const PollDetailClient: React.FC<PollDetailClientProps> = ({ id }) => {
  const [poll, setPoll] = useState<PollData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchPoll = async () => {
      try {
        setLoading(true)
        const data = await getById(Number(id))
        if (isMounted) setPoll(data)
      } catch (e) {
        if (isMounted) setError('Failed to load poll')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchPoll()
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading...</div>
  }

  if (error || !poll) {
    return <div className="p-4 text-sm text-destructive">{error ?? 'No data'}</div>
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">{poll?.poll.question}</h1>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full table-auto">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Option</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Votes</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {poll?.poll.options?.map((option, idx) => (
              <tr key={option.id} className="border-t">
                <td className="px-4 py-3 align-middle text-sm text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-3 align-middle">{option.text}</td>
                <td className="px-4 py-3 align-middle">{option.votes}</td>
                <td className="px-4 py-3 align-middle">
                  <div className="flex justify-end">
                    <button className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground">Vote</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PollDetailClient
