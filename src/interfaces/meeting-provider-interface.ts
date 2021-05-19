import { MeetingInterface } from './meeting-interface';
import { MeetingScheduleInputInterface } from './meeting-schedule-input-interface';

export interface MeetingProviderInterface {
  scheduleMeeting(meetingScheduleInput: MeetingScheduleInputInterface): MeetingInterface;
}
