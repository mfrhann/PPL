
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import UserList from "@/components/UserList";
import { FileText, Send, Users } from "lucide-react";

const Index = () => {
  // Sample data
  const reportUsers = [
    { id: 1, name: "Jane Doe", reports: 5 },
    { id: 2, name: "John Smith", reports: 2 },
    { id: 3, name: "Luca Modric", reports: 4 },
    { id: 4, name: "Declan Rice", reports: 2 },
  ];

  const officerUsers = [
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" },
    { id: 3, name: "Luca Modric" },
    { id: 4, name: "Declan Rice" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Form Created" 
          value="32" 
          icon={<FileText className="stroke-current" size={24} />} 
        />
        <StatCard 
          title="Report Sent" 
          value="32" 
          icon={<Send className="stroke-current" size={24} />} 
        />
        <StatCard 
          title="Active Officer" 
          value="32" 
          icon={<Users className="stroke-current" size={24} />} 
        />
        <StatCard 
          title="Region Covered" 
          value="32" 
          icon={
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9L12 2L2 9V20H22V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          } 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserList title="Report List" users={reportUsers} type="report" />
        <UserList title="Officer List" users={officerUsers} type="officer" />
      </div>
    </Layout>
  );
};

export default Index;
