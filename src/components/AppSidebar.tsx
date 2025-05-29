
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users,
  LogOut 
} from 'lucide-react';

const AppSidebar = () => {
  return (
    <aside className="bg-white border-r border-gray-200 min-h-screen w-60 flex flex-col">
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-green-600 font-bold text-xl flex items-center">
            <span className="text-green-600 text-2xl">✦</span>
            <span className="ml-2">SIPATUH</span>
          </div>
        </Link>
      </div>
      
      <div className="px-2 py-4">
        <p className="text-gray-400 text-xs font-medium px-4 mb-2">MENU</p>
        
        <nav className="space-y-1">
          <Link 
            to="/" 
            className="flex items-center text-gray-700 bg-gray-100 px-4 py-2.5 rounded-md font-medium gap-3"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/form" 
            className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-md font-medium gap-3"
          >
            <FileText size={18} />
            <span>Form</span>
          </Link>
          
          <Link 
            to="/officer" 
            className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-md font-medium gap-3"
          >
            <Users size={18} />
            <span>Officer</span>
          </Link>
        </nav>
      </div>
      
      {/* <div className="mt-auto p-2">
        <button className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-md font-medium gap-3 w-full">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div> */}
    </aside>
  );
};

export default AppSidebar;
