import { MeetingParticipantsInterface } from './meeting-participants-interface';
import { MeetingTimeInterface } from './meeting-time-interface';

export interface MeetingScheduleInputInterface {
  meetingParticipants: MeetingParticipantsInterface;
  meetingTime: MeetingTimeInterface;
}
