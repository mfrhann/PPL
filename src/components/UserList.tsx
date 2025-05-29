
import { Avatar } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  reports?: number;
}

interface UserListProps {
  title: string;
  users: User[];
  type: 'report' | 'officer';
}

const UserList = ({ title, users, type }: UserListProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm">
          {type === 'report' && (
            <div className="flex items-center gap-1 border rounded-md px-3 py-1 text-gray-700">
              <span>30 Days</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L2 5H10L6 9Z" fill="currentColor"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <div className="bg-gray-300 w-full h-full rounded-full" />
              </Avatar>
              <span>{user.name}</span>
            </div>
            {type === 'report' && user.reports !== undefined && (
              <span className="text-gray-500 text-sm">{user.reports} Reports</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <a href="#" className="text-green-600 text-sm hover:underline">
          See full {type === 'report' ? 'Report' : 'Officer'} List
        </a>
      </div>
    </div>
  );
};

export default UserList;
