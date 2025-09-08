export interface PollOption {
    id: string;
    text: string;
    votes?: number;
  }
  
  export interface Poll {
    id: number;
    question: string;
    options: PollOption[];
  }
  