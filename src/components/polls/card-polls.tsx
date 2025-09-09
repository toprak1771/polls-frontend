import React from 'react'
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

const CardPolls: React.FC<ICardProps> = ({ poll }) => {
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
            <div key={option.id} className="flex w-full items-center justify-between rounded border px-3 py-2">
              <div className="flex items-center gap-2">
                <span>{option.text}</span>
                <span className="text-muted-foreground text-sm">{option.votes}</span>
              </div>
              <button className="rounded bg-primary px-2 py-1 text-primary-foreground">Vote</button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={`/polls/${poll?.poll.id}`} className="w-full">
          <Button type="button" className="mb-16 w-full md:mb-0">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CardPolls