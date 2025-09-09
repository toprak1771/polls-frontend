'use client'

import React, { useEffect, useState } from 'react'
import { ICardProps } from '@/src/components/polls/ICardProps';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { vote as votePoll } from '@/src/services/polls'
import type { PollData } from '@/src/types/polls'

const CardPolls: React.FC<ICardProps> = ({ poll: initialPoll }) => {
  const [poll, setPoll] = useState<PollData>(initialPoll)
  const [submittingOptionId, setSubmittingOptionId] = useState<string | null>(null)

  // Sync with prop if parent updates
  useEffect(() => {
    setPoll(initialPoll)
  }, [initialPoll])

  const handleVote = async (optionId: string) => {
    const previous = poll

    // Optimistic update
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
      await votePoll(previous.poll.id, optionId)
      // Optional: rely on parent refresh; keeping optimistic state here
    } catch (e) {
      // Rollback on error
      setPoll(previous)
    } finally {
      setSubmittingOptionId(null)
    }
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Question</CardTitle>
        <CardDescription>
          {poll?.poll.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div>Options:</div>
        <div className="mt-2 flex flex-col gap-3">
          {poll?.poll.options?.map((option) => (
            <div key={option.id} className="flex w-full items-center justify-between rounded border px-3 py-2 hover:bg-accent">
              <div className="flex items-center gap-2">
                <span>{option.text}</span>
                <span className="text-muted-foreground text-sm">{option.votes}</span>
              </div>
              <button
                onClick={() => handleVote(option.id)}
                disabled={submittingOptionId === option.id}
                className="rounded bg-primary px-2 py-1 text-primary-foreground disabled:opacity-50 cursor-pointer transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {submittingOptionId === option.id ? 'Voting...' : 'Vote'}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={`/polls/${poll?.poll.id}`} className="w-full">
          <Button type="button" className="mb-16 w-full md:mb-0 cursor-pointer">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CardPolls