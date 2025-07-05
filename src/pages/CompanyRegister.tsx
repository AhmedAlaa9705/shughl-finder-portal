
import { useState } from 'react';
import { Plus, Search, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import EmployerForm from '@/components/EmployerForm';
import JobForm from '@/components/JobForm';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';
import EmployerForm from '@/components/EmployerForm';

const CompanyRegister = () => {
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

   

        {/* Recent Jobs */}
       
      </main>
    </div>
  );
};

export default CompanyRegister;
