enum MeetingStatusCode {
  SCHEDULED,
  RESCHEDULED,
  CACENLED,
  COMPLETED,
  FAILED,
}

export interface MeetingStatusInterface {
  status: MeetingStatusCode;
}
