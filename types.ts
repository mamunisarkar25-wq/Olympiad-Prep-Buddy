export interface UserInput {
  studentClass: string;
  subjectFocus: string;
  subSubject: string;
  topic: string;
  mode: string;
  additionalRequest: string;
}

export interface OlympiadResponse {
  topicOverview: string;
  practiceZone: string;
  solutions: string;
  skillFeedback: string;
  challenge: string;
}