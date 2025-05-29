
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <div className="text-green-700 mb-2">
        {icon}
      </div>
      <p className="text-sm text-green-800 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-green-900">{value}</h3>
    </div>
  );
};

export default StatCard;
