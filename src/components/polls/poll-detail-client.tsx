'use client'

import React, { useEffect, useState } from 'react'
import { getById, vote as votePoll } from '@/src/services/polls'
import type { PollData } from '@/src/types/polls'

interface PollDetailClientProps {
  id: number | string
}

const PollDetailClient: React.FC<PollDetailClientProps> = ({ id }) => {
  const [poll, setPoll] = useState<PollData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submittingOptionId, setSubmittingOptionId] = useState<string | null>(null)

  const fetchPoll = async () => {
    try {
      setLoading(true)
      const data = await getById(Number(id))
      setPoll(data)
      setError(null)
    } catch (e) {
      setError('Failed to load poll')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPoll()
  }, [id])

  const handleVote = async (optionId: string) => {
    if (!poll) return

    const previous = poll

    // Optimistic update only
    const optimistic: PollData = {
      poll: {
        ...previous.poll,
        options: previous.poll.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: (opt.votes ?? 0) + 1 } : opt
        ),
      },
    }
    setPoll(optimistic)
    setSubmittingOptionId(optionId)

    try {
      await votePoll(Number(id), optionId)
      // No refetch: keep optimistic state
    } catch (e) {
      // Rollback on error
      setPoll(previous)
      setError('Failed to vote')
    } finally {
      setSubmittingOptionId(null)
    }
  }

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
              <tr key={option.id} className="border-t hover:bg-accent/40">
                <td className="px-4 py-3 align-middle text-sm text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-3 align-middle">{option.text}</td>
                <td className="px-4 py-3 align-middle">{option.votes}</td>
                <td className="px-4 py-3 align-middle">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleVote(option.id)}
                      disabled={submittingOptionId === option.id}
                      className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50 cursor-pointer transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                      {submittingOptionId === option.id ? 'Voting...' : 'Vote'}
                    </button>
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
