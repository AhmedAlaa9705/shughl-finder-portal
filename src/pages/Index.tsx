
import { Briefcase, User } from 'lucide-react';
import JobPortalCard from '@/components/JobPortalCard';

const Index = () => {
  const handleEmployerClick = () => {
    console.log('صاحب عمل clicked');
    // TODO: Navigate to employer dashboard
  };

  const handleJobSeekerClick = () => {
    console.log('يبحث عن عمل clicked');
    // TODO: Navigate to job seeker dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="text-center pt-16 pb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          بوابة الوظائف
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          منصة شاملة للربط بين أصحاب العمل والباحثين عن وظائف
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-700 mb-3">
              اختر نوع حسابك
            </h2>
            <p className="text-gray-500">
              حدد الخيار المناسب لك للبدء في استخدام المنصة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>© 2024 بوابة الوظائف - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
};

export default Index;
