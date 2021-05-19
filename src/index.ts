import express from 'express';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';

import { MeetingScheduleInputInterface } from './interfaces/meeting-schedule-input-interface';
import { MeetingScheduleInput } from './value-objects/meeting-schedule-input';
import { MeetingParticipantsInterface } from './interfaces/meeting-participants-interface';
import { MeetingParticipants } from './value-objects/meeting-participants';
import { MeetingTimeInterface } from './interfaces/meeting-time-interface';
import { MeetingTime } from './value-objects/meeting-time';
import { MeetingProviderForVSee } from './meeting-providers/meeting-provider-for-vsee';
import { MeetingScheduleService } from './servives/meeting-schedule-service';
import { MeetingRepositoryUsingMock } from './repositories/meeting-repository-using-mock';
import models from './models';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Express + Typescript'));

app.post('/meetings', async (req, res) => {
  const { menteeId, mentorId, startTime, endTime, session } = _.pick(req.body, [
    'menteeId',
    'mentorId',
    'startTime',
    'endTime',
    'session',
  ]);

  const meetingParticipants: MeetingParticipantsInterface = MeetingParticipants.load({ menteeId, mentorId });
  const meetingTime: MeetingTimeInterface = MeetingTime.load({ startTime, endTime });
  const meetingScheduleInput: MeetingScheduleInputInterface = MeetingScheduleInput.load(
    meetingParticipants,
    meetingTime
  );

  const meetingProviderForVSee = new MeetingProviderForVSee(
    process.env.VSEE_API_KEY!,
    process.env.VSEE_API_SECRET!,
    process.env.VSEE_API_TOKEN!
  );

  const meetingRepositoryUsingMock = new MeetingRepositoryUsingMock(models.Meeting);

  const meetingId = meetingRepositoryUsingMock.getNextId();

  const meetingScheduleService = new MeetingScheduleService(meetingProviderForVSee, meetingRepositoryUsingMock);

  await meetingScheduleService.execute(meetingScheduleInput, meetingId, session);

  return res.status(201).send({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
