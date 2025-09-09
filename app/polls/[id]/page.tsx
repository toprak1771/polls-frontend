export const dynamic = "force-dynamic";
import PollDetailClient from "@/src/components/polls/poll-detail-client";

const PollDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto p-4">
      <PollDetailClient id={params.id} />
    </div>
  );
}

export default PollDetail;

