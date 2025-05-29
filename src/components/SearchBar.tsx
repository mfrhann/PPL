
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative w-96">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full py-2 pl-4 pr-10 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          <Search size={20} />
        </div>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex items-center bg-white border rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-colors outline-none">
            <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-100 text-orange-500">
                  🍔
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2 mr-1">
              <p className="text-sm font-medium">Delicious Burger</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Delicious Burger</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 font-medium">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchBar;
