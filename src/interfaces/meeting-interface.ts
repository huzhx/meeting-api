import { MeetingTimeInterface } from './meeting-time-interface';
import { MeetingParticipantsInterface } from './meeting-participants-interface';

export interface MeetingInterface {
  events?: [];
  meetingId: string;
  scheduledTime: MeetingTimeInterface;
  pariticipants: MeetingParticipantsInterface;
  session: number;
}
