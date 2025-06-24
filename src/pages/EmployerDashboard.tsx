
import { useState } from 'react';
import { Plus, Search, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmployerForm from '@/components/EmployerForm';
import JobForm from '@/components/JobForm';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';

const EmployerDashboard = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  if (showJobForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
        <main className="container mx-auto px-4 py-8">
          <JobForm onBack={() => setShowJobForm(false)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Responsive Header */}
      <ResponsiveNavbar 
        title="لوحة تحكم صاحب العمل"
        primaryAction={{
          label: "إضافة وظيفة جديدة",
          icon: <Plus className="ml-2 h-4 w-4" />,
          onClick: () => setShowJobForm(true)
        }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Employer Form Section */}
        <div className="mb-8">
          <EmployerForm />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الوظائف المنشورة</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المتقدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+15% من الأسبوع الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المقابلات المجدولة</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>الوظائف الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div>
                  <h3 className="font-semibold">مطور ويب متقدم</h3>
                  <p className="text-sm text-gray-600">منشورة منذ يومين • 15 متقدم</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">عرض التفاصيل</Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div>
                  <h3 className="font-semibold">مصمم جرافيك</h3>
                  <p className="text-sm text-gray-600">منشورة منذ أسبوع • 8 متقدمين</p>
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

export default EmployerDashboard;
