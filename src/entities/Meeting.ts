import { MeetingInterface } from '../interfaces/meeting-interface';
import { MeetingParticipantsInterface } from '../interfaces/meeting-participants-interface';
import { MeetingTimeInterface } from '../interfaces/meeting-time-interface';

export class Meeting implements MeetingInterface {
  private _events: [];
  private _meetingId: string;
  private _scheduledTime: MeetingTimeInterface;
  private _pariticipants: MeetingParticipantsInterface;
  private _session: number;
  private _metaData: Map<string, any>;

  private constructor(
    meetingId: string,
    scheduledTime: MeetingTimeInterface,
    pariticipants: MeetingParticipantsInterface,
    session: number
  ) {
    this._meetingId = meetingId;
    this._scheduledTime = scheduledTime;
    this._pariticipants = pariticipants;
    this._session = session;
    this._events = [];
    this._metaData = new Map();
  }

  public static schedule(
    meetingId: string,
    scheduledTime: MeetingTimeInterface,
    pariticipants: MeetingParticipantsInterface,
    session: number
  ) {
    return new Meeting(meetingId, scheduledTime, pariticipants, session);
  }

  get meetingId() {
    return this._meetingId;
  }

  get scheduledTime() {
    return this._scheduledTime;
  }

  get pariticipants() {
    return this._pariticipants;
  }

  get session() {
    return this._session;
  }

  get events() {
    return this._events;
  }

  get metaData() {
    return this._metaData;
  }

  public setMetaData({ key, value }: { key: string; value: string }) {
    this._metaData.set(key, value);
  }
}
