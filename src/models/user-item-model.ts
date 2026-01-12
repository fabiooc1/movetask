export interface UserItemModel {
  id: string;
  name: string;
  image?: string | null;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
