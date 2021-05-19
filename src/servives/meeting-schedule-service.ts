import { MeetingProviderInterface } from '../interfaces/meeting-provider-interface';
import { MeetingRepositoryInterface } from '../interfaces/meeting-repository-interface';
import { MeetingScheduleInputInterface } from '../interfaces/meeting-schedule-input-interface';
import { Meeting } from '../entities/Meeting';

export class MeetingScheduleService {
  private meetingProvider: MeetingProviderInterface;
  private meetingRepository: MeetingRepositoryInterface;

  constructor(meetingProvider: MeetingProviderInterface, meetingRepository: MeetingRepositoryInterface) {
    this.meetingProvider = meetingProvider;
    this.meetingRepository = meetingRepository;
  }

  public async execute(meetingScheduleInput: MeetingScheduleInputInterface, meetingId: string, session: number) {
    const externalId: string = await this.meetingProvider.scheduleMeeting(meetingScheduleInput);
    const meeting = Meeting.schedule(
      meetingId,
      meetingScheduleInput.meetingTime,
      meetingScheduleInput.meetingParticipants,
      session
    );
    meeting.setMetaData({ key: 'externalId', value: externalId });
    this.meetingRepository.save(meeting);
  }
}
