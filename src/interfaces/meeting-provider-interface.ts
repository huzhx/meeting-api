import { MeetingScheduleInputInterface } from './meeting-schedule-input-interface';

export interface MeetingProviderInterface {
  scheduleMeeting<Type>(meetingScheduleInput: MeetingScheduleInputInterface): Promise<Type>;
}
