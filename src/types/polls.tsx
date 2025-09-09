export interface PollOption {
    id: string;
    text: string;
    votes?: number;
  }

  export interface PollData {
    poll:Poll
  }

  export interface PollsData {
    polls:Poll[]
  }
  
  export interface Poll {
    id: number;
    question: string;
    options: PollOption[];
  }
  