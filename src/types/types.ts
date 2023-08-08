export type PbUser = {
  avatar: string;
  avatarUrl: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
};

export type PbChat = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  isGroup: boolean;
  lastMessageAt: string;
  name?: string;
  updated: string;
  users: string[];
  expand: { users: PbUser[] };
};

export type PbMessage = {
  body: string;
  collectionId: string;
  collectionName: string;
  conversation: string;
  created: Date;
  id: string;
  image?: string;
  seenBy: string[];
  sender: string;
  updated: Date;
  expand: { seenBy: PbUser[]; sender: PbUser; conversation: PbChat };
};
