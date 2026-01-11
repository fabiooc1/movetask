export interface ProjectMemberModel {
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  joinedAt: Date;
}
