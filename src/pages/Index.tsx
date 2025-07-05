
import { Briefcase, User, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobPortalCard from '@/components/JobPortalCard';

const Index = () => {
  const navigate = useNavigate();

  const handleEmployerClick = () => {
    console.log('صاحب عمل clicked');
    navigate('/employer-form');
  };

  const handleJobSeekerClick = () => {
    console.log('يبحث عن عمل clicked');
    navigate('/job-seeker');
  };

  const handleRideClick = () => {
    console.log('فرد يبحث عن دورة clicked');
    navigate('/ride');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="text-center pt-16 pb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
        مشاويرجي
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          منصة شاملة للوظائف وخدمات النقل والمشاوير
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-700 mb-3">
              اختر الخدمة المناسبة
            </h2>
            <p className="text-gray-500">
              حدد الخيار المناسب لك للبدء في استخدام المنصة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Employer Card */}
            <JobPortalCard
              title="صاحب عمل"
              description="انشر وظائفك، اطلع على السير الذاتية، وابحث عن أفضل المواهب لشركتك"
              icon={Briefcase}
              gradientFrom="from-blue-500"
              gradientTo="to-blue-700"
              onClick={handleEmployerClick}
            />

            {/* Job Seeker Card */}
            <JobPortalCard
              title="يبحث عن عمل"
              description="ابحث عن الوظائف المناسبة، أرسل طلبات التوظيف، وابني ملفك المهني"
              icon={User}
              gradientFrom="from-green-500"
              gradientTo="to-green-700"
              onClick={handleJobSeekerClick}
            />

            {/* Ride Seeker Card */}
            <JobPortalCard
              title="فرد يبحث عن دورة"
              description="اطلب دورة نقل، حدد مواعيدك وأماكن الإقلال والنزول، وابحث عن أفضل الخيارات"
              icon={Car}
              gradientFrom="from-orange-500"
              gradientTo="to-orange-700"
              onClick={handleRideClick}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>© 2024 بوابة الخدمات - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
};

export default Index;
