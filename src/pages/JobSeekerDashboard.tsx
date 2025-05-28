
import { useState } from 'react';
import { Search, FileText, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobSeekerForm from '@/components/JobSeekerForm';

const JobSeekerDashboard = () => {
  const [showForm, setShowForm] = useState(true);

  const handleFormComplete = () => {
    setShowForm(false);
  };

  if (showForm) {
    return <JobSeekerForm onComplete={handleFormComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم الباحث عن عمل</h1>
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="ml-2 h-4 w-4" />
              البحث عن وظائف
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المرسلة</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">هذا الشهر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المقابلات</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">مقابلات مجدولة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">نسبة اكتمال الملف</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">قريب من الاكتمال</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>وظائف مقترحة لك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-semibold">مطور React</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    الرياض • شركة التقنيات المتقدمة
                  </p>
                  <p className="text-sm text-green-600 mt-1">5000 - 7000 ريال</p>
                </div>
                <Button size="sm">التقدم للوظيفة</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-semibold">مصمم واجهات مستخدم</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    جدة • شركة الإبداع الرقمي
                  </p>
                  <p className="text-sm text-green-600 mt-1">4000 - 6000 ريال</p>
                </div>
                <Button size="sm">التقدم للوظيفة</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-semibold">محلل بيانات</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    الدمام • شركة البيانات الذكية
                  </p>
                  <p className="text-sm text-green-600 mt-1">6000 - 8000 ريال</p>
                </div>
                <Button size="sm">التقدم للوظيفة</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;
