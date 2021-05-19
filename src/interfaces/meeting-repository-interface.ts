import { MeetingInterface } from './meeting-interface';

export interface MeetingRepositoryInterface {
  getNextId(): string;
  save(meeting: MeetingInterface): void;
}
