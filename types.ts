
export interface UserResponses {
  favoriteColor: string;
  favoriteAnimal: string;
  favoriteSnack: string;
  birthMonth: string;
}

export interface AgentProfile {
  lastName: string;
  fullName: string;
  rank: string;
  specialty: string;
  lastKnownLocation: string;
  clearanceLevel: number;
}

export enum AppStep {
  INPUT = 'INPUT',
  SCAN = 'SCAN',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT'
}
