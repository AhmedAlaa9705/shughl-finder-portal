
import { useState } from 'react';
import { Car, Users, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RideForm from '@/components/RideForm';
import Logo from '@/components/Logo';

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم الباحث عن دورة</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowRideForm(true)}
                >
                  <Car className="ml-2 h-4 w-4" />
                  طلب دورة جديدة
                </Button>
              </div>
              <Logo />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    من المعادي إلى مدينة نصر
                  </h3>
                  <p className="text-sm text-gray-600">ذهاب وعودة • 6 أيام العمل • 7:30 ص</p>
                </div>
                <Button variant="outline" size="sm">عرض التفاصيل</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    من الجيزة إلى التجمع الخامس
                  </h3>
                  <p className="text-sm text-gray-600">ذهاب فقط • 5 أيام العمل • 8:00 ص</p>
                </div>
                <Button variant="outline" size="sm">عرض التفاصيل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RideDashboard;
