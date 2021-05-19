import { MeetingParticipantsInterface } from '../interfaces/meeting-participants-interface';

export class MeetingParticipants implements MeetingParticipantsInterface {
  private _mentorId: string;
  private _menteeId: string;

  private constructor(menteeId: string, mentorId: string) {
    this._menteeId = menteeId;
    this._mentorId = mentorId;
  }

  public static load({ menteeId, mentorId }: { menteeId: string; mentorId: string }): MeetingParticipantsInterface {
    return new MeetingParticipants(menteeId, mentorId);
  }

  get mentorId() {
    return this._mentorId;
  }

  get menteeId() {
    return this._menteeId;
  }
}
