
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EmployerFormData {
  name: string;
  fieldOfWork: string;
  phoneNumber: string;
}

const EmployerForm = () => {
  const [formData, setFormData] = useState<EmployerFormData>({
    name: '',
    fieldOfWork: '',
    phoneNumber: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (field: keyof EmployerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.fieldOfWork || !formData.phoneNumber) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    console.log('Employer form data:', formData);
    
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ بيانات صاحب العمل بنجاح"
    });

    // Reset form after successful submission
    setFormData({
      name: '',
      fieldOfWork: '',
      phoneNumber: ''
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">بيانات صاحب العمل</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="أدخل الاسم"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldOfWork">مجال العمل</Label>
            <Input
              id="fieldOfWork"
              type="text"
              value={formData.fieldOfWork}
              onChange={(e) => handleInputChange('fieldOfWork', e.target.value)}
              placeholder="أدخل مجال العمل"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">رقم التليفون</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="أدخل رقم التليفون"
              className="text-right"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            حفظ البيانات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployerForm;
