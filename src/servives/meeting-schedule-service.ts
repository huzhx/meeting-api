import { MeetingProviderInterface } from '../interfaces/meeting-provider-interface';
import { MeetingRepositoryInterface } from '../interfaces/meeting-repository-interface';
import { MeetingScheduleInputInterface } from '../interfaces/meeting-schedule-input-interface';
import { MeetingInterface } from '../interfaces/meeting-interface';

export class MeetingScheduleService {
  private meetingProvider: MeetingProviderInterface;
  private meetingRepository: MeetingRepositoryInterface;

  constructor(meetingProvider: MeetingProviderInterface, meetingRepository: MeetingRepositoryInterface) {
    this.meetingProvider = meetingProvider;
    this.meetingRepository = meetingRepository;
  }

  public execute(meetingScheduleInput: MeetingScheduleInputInterface) {
    const meeting: MeetingInterface = this.meetingProvider.scheduleMeeting(meetingScheduleInput);
    this.meetingRepository.save(meeting);
  }
}
