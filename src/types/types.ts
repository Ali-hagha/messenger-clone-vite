import { Record } from "pocketbase";

export interface PbUser extends Record {
  avatar: string;
  avatarUrl: string;
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
}

export interface PbChat extends Record {
  isGroup: boolean;
  lastMessageAt: string;
  name?: string;
  users: string[];
  expand: { users: PbUser[] };
}

export interface PbMessage extends Record {
  body: string;
  conversation: string;
  image?: string;
  seenBy: string[];
  sender: string;
  expand: { seenBy: PbUser[]; sender: PbUser; conversation: PbChat };
}
