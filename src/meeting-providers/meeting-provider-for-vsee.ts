import axios from 'axios';
import { MeetingProviderInterface } from '../interfaces/meeting-provider-interface';
import { MeetingScheduleInputInterface } from '../interfaces/meeting-schedule-input-interface';
import { VSeeApiResponseInterface } from '../interfaces/vsee-api-response-interface';

export class MeetingProviderForVSee implements MeetingProviderInterface {
  private apiKey: string;
  private apiSecret: string;
  private apiToken: string;

  constructor(apiKey: string, apiSecret: string, apiToken: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.apiToken = apiToken;
  }

  public async scheduleMeeting<String>(meetingScheduleInput: MeetingScheduleInputInterface): Promise<String> {
    const intakeId = await this.postIntakes();
    const visitId = await this.postVisits(meetingScheduleInput, intakeId);
    return visitId;
  }

  private async postIntakes(): Promise<string> {
    const apiRes: VSeeApiResponseInterface = await axios({
      method: 'post',
      url: `${process.env.VSEE_BASE_URL}/intakes`,
      headers: {
        'X-ApiToken': this.apiToken,
      },
    });

    if (apiRes.status !== 200) {
      throw new Error('POST /intakes failed');
    }

    const intakeId = apiRes.data.data.id;
    return Promise.resolve(intakeId);
  }

  private async postVisits(meetingScheduleInput: MeetingScheduleInputInterface, intakeCode: string): Promise<any> {
    const apiRes: VSeeApiResponseInterface = await axios({
      method: 'post',
      url: `${process.env.VSEE_BASE_URL}/visits`,
      data: {
        member_id: meetingScheduleInput.meetingParticipants.menteeId,
        provider_id: meetingScheduleInput.meetingParticipants.mentorId,
        room_code: process.env.VSEE_ROOMCODE,
        type: process.env.VSEE_VISIT_TYPE,
        intake_id: intakeCode,
        slot_start: meetingScheduleInput.meetingTime.startTime,
        slot_end: meetingScheduleInput.meetingTime.endTime,
      },
      headers: {
        'X-ApiToken': this.apiToken,
      },
    });

    if (apiRes.status !== 200) {
      throw new Error('POST /visits failed');
    }

    const visitId = apiRes.data.data.id;
    return Promise.resolve(visitId);
  }
}
