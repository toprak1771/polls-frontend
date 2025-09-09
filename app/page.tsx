export const dynamic = "force-dynamic";
import { getAll } from "@/src/services/polls";
import CardPolls from "@/components/polls/card-polls";

export default async function Home() {
  const polls = await getAll();
  console.log("polls:", polls);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {polls?.polls?.map((p) => (
          <CardPolls key={p.id} poll={{ poll: p }} />
        ))}
      </div>
    </div>
  )
}
