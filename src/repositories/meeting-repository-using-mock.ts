import { MeetingRepositoryInterface } from '../interfaces/meeting-repository-interface';
import { v4 as uuidv4 } from 'uuid';
import { MeetingInterface } from '../interfaces/meeting-interface';

export class MeetingRepositoryUsingMock implements MeetingRepositoryInterface {
  private models: Map<string, MeetingInterface>;

  constructor(models: Map<string, MeetingInterface>) {
    this.models = models;
  }

  public getNextId() {
    return uuidv4();
  }

  public save(meeting: MeetingInterface) {
    this.models.set(meeting.meetingId, meeting);
    console.log(this.models);
  }
}
