import express from 'express';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';

import { MeetingScheduleInputInterface } from './interfaces/meeting-schedule-input-interface';
import { MeetingScheduleInput } from './value-objects/meeting-schedule-input';
import { MeetingParticipantsInterface } from './interfaces/meeting-participants-interface';
import { MeetingParticipants } from './value-objects/meeting-participants';
import { MeetingTimeInterface } from './interfaces/meeting-time-interface';
import { MeetingTime } from './value-objects/meeting-time';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Express + Typescript'));

app.post('/meetings', (req, res) => {
  const { menteeId, mentorId, startTime, endTime } = _.pick(req.body, ['menteeId', 'mentorId', 'startTime', 'endTime']);

  const meetingParticipants: MeetingParticipantsInterface = MeetingParticipants.load({ menteeId, mentorId });
  const meetingTime: MeetingTimeInterface = MeetingTime.load({ startTime, endTime });
  const meetingScheduleInput: MeetingScheduleInputInterface = MeetingScheduleInput.load(
    meetingParticipants,
    meetingTime
  );

  return res.send('create a meeting');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
