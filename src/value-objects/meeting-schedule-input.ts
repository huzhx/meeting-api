import { MeetingParticipantsInterface } from '../interfaces/meeting-participants-interface';
import { MeetingScheduleInputInterface } from '../interfaces/meeting-schedule-input-interface';
import { MeetingTimeInterface } from '../interfaces/meeting-time-interface';

export class MeetingScheduleInput implements MeetingScheduleInputInterface {
  private _meetingParticipants: MeetingParticipantsInterface;
  private _meetingTime: MeetingTimeInterface;

  private constructor(meetingParticipants: MeetingParticipantsInterface, meetingTime: MeetingTimeInterface) {
    this._meetingParticipants = meetingParticipants;
    this._meetingTime = meetingTime;
  }

  public static load(
    meetingParticipants: MeetingParticipantsInterface,
    meetingTime: MeetingTimeInterface
  ): MeetingScheduleInputInterface {
    return new MeetingScheduleInput(meetingParticipants, meetingTime);
  }

  get meetingParticipants() {
    return this._meetingParticipants;
  }

  get meetingTime() {
    return this._meetingTime;
  }
}
