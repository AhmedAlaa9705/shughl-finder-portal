
import { Car } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Car className="h-8 w-8 text-blue-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-right">
        <h2 className="text-lg font-bold text-gray-800">كار رنت</h2>
        <p className="text-xs text-gray-600">خدمات النقل والمشاوير</p>
      </div>
    </div>
  );
};

export default Logo;
