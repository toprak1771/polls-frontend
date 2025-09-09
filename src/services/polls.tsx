import { PollData, PollsData, Poll } from "../types/polls";
import { api } from "./http";

export async function getAll(): Promise<PollsData> {
    const {data} = await api.get("/polls");
    return data;
}

export async function getById(id: number): Promise<PollData> {
    const {data} = await api.get(`/polls/${id}`);
    return data;
}

export async function vote(id:string | number, optionId:string | number): Promise<Poll> {
    const {data} = await api.post(`/polls/${id}/vote`, {optionId});
    return data;
}

