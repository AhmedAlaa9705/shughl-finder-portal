
import { useEffect, useState } from 'react';
import { Search, FileText, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobSeekerForm from '@/components/JobSeekerForm';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [showForm, setShowForm] = useState(true);

  const handleFormComplete = () => {
    setShowForm(false);
  };

const [getJobs,setJobs]=useState([]);

useEffect(()=>{

axios.get('https://localhost:44381/api/Jobs/AllJobs').then(res=>{
  console.log("jobs", res.data);
  setJobs(res.data);
})
},[])





  if (showForm) {
    return <JobSeekerForm onComplete={handleFormComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50" dir="rtl">
      {/* Responsive Header */}
      <ResponsiveNavbar 
        title="لوحة تحكم الباحث عن عمل"
        primaryAction={{
          label: "البحث عن وظائف",
          icon: <Search className="ml-2 h-4 w-4" />,
          onClick: () => console.log('البحث عن وظائف clicked')
        }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              {getJobs.map((item)=>(
        <div key={item.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">مطلوب سياره:{item.carType}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    {item.governorate} •{item.city}
                  </p>
                  <p className="text-sm text-green-600 mt-1">من الساعه:{item.workFrom}الي :{item.workTo}</p>
                </div>
                <Button size="sm" className="w-full lg:w-auto">التقدم للوظيفة</Button>
              </div>

              ))}
      
              
              {/* <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">مصمم واجهات مستخدم</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    جدة • شركة الإبداع الرقمي
                  </p>
                  <p className="text-sm text-green-600 mt-1">4000 - 6000 ريال</p>
                </div>
                <Button size="sm" className="w-full lg:w-auto">التقدم للوظيفة</Button>
              </div> */}

              {/* <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">محلل بيانات</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 ml-1" />
                    الدمام • شركة البيانات الذكية
                  </p>
                  <p className="text-sm text-green-600 mt-1">6000 - 8000 ريال</p>
                </div>
                <Button size="sm" className="w-full lg:w-auto">التقدم للوظيفة</Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;
