import { MeetingTimeInterface } from '../interfaces/meeting-time-interface';

export class MeetingTime implements MeetingTimeInterface {
  private _startTime: number;
  private _endTime: number;

  private constructor(startTime: number, endTime: number) {
    this._startTime = startTime;
    this._endTime = endTime;
  }

  public static load({ startTime, endTime }: { startTime: number; endTime: number }): MeetingTimeInterface {
    const meetingTime = new MeetingTime(startTime, endTime);
    meetingTime.valid();
    return meetingTime;
  }

  private valid() {
    if (this._startTime < Math.floor(new Date().getTime() / 1000) || this._endTime <= this._startTime) {
      throw new Error('invalid meeting time');
    }
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }
}
