
export interface Session {
  sessionid: string;
  user_id: string;
  expires_at: Date;
  fresh: boolean;
}