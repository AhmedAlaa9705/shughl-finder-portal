
import { useState } from 'react';
import { Car, Users, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RideForm from '@/components/RideForm';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';

const RideDashboard = () => {
  const [showRideForm, setShowRideForm] = useState(true);

  if (showRideForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50" dir="rtl">
        <main className="container mx-auto px-4 py-8">
          <RideForm onBack={() => setShowRideForm(false)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50" dir="rtl">
      {/* Responsive Header */}
      <ResponsiveNavbar 
        title="لوحة تحكم الباحث عن دورة"
        primaryAction={{
          label: "طلب دورة جديدة",
          icon: <Car className="ml-2 h-4 w-4" />,
          onClick: () => setShowRideForm(true)
        }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">طلبات الدورات</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">طلبات نشطة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الدورات المتاحة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">في منطقتك</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرحلات القادمة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Ride Requests */}
        <Card>
          <CardHeader>
            <CardTitle>طلبات الدورات الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    من المعادي إلى مدينة نصر
                  </h3>
                  <p className="text-sm text-gray-600">ذهاب وعودة • 6 أيام العمل • 7:30 ص</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">عرض التفاصيل</Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    من الجيزة إلى التجمع الخامس
                  </h3>
                  <p className="text-sm text-gray-600">ذهاب فقط • 5 أيام العمل • 8:00 ص</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">عرض التفاصيل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RideDashboard;
