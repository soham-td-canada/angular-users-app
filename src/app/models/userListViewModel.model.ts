import { User } from './user.model';

export interface UserListViewModel {
  users: User[];
  searchTerm: string;
}
