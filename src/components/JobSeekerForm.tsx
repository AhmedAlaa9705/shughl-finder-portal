
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Car } from 'lucide-react';

interface JobSeekerFormProps {
  onComplete: () => void;
}

const JobSeekerForm = ({ onComplete }: JobSeekerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carCount: '',
    carType: '',
    carBrand: '',
    carModel: ''
  });

  const carTypes = [
    'ملاكى سيدان',
    'ملاكى 7 راكب',
    'ربع نقل',
    'نص نقل',
    'دوبل كابينه',
    'ميكروباص',
    'ميكروباص سقف عالى',
    'ميكروباص وسط',
    'مينى باص',
    'باص',
    'مينى فان'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('بيانات الباحث عن عمل:', formData);
    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Car className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            تسجيل بيانات الباحث عن عمل
          </CardTitle>
          <p className="text-gray-600 mt-2">
            يرجى إدخال بياناتك الشخصية ومعلومات المركبة
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* الاسم */}
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            {/* رقم التليفون */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم التليفون</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="أدخل رقم التليفون"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            {/* عدد السيارات */}
            <div className="space-y-2">
              <Label htmlFor="carCount">عدد السيارات</Label>
              <Input
                id="carCount"
                type="number"
                min="1"
                placeholder="أدخل عدد السيارات"
                value={formData.carCount}
                onChange={(e) => handleInputChange('carCount', e.target.value)}
                required
              />
            </div>

            {/* نوع السيارة */}
            <div className="space-y-2">
              <Label htmlFor="carType">نوع السيارة</Label>
              <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع السيارة" />
                </SelectTrigger>
                <SelectContent>
                  {carTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ماركة السيارة */}
            <div className="space-y-2">
              <Label htmlFor="carBrand">ماركة السيارة</Label>
              <Input
                id="carBrand"
                type="text"
                placeholder="أدخل ماركة السيارة"
                value={formData.carBrand}
                onChange={(e) => handleInputChange('carBrand', e.target.value)}
                required
              />
            </div>

            {/* موديل السيارة */}
            <div className="space-y-2">
              <Label htmlFor="carModel">موديل السيارة</Label>
              <Input
                id="carModel"
                type="text"
                placeholder="أدخل موديل السيارة"
                value={formData.carModel}
                onChange={(e) => handleInputChange('carModel', e.target.value)}
                required
              />
            </div>

            {/* زر الإرسال */}
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <ArrowRight className="ml-2 h-5 w-5" />
              المتابعة إلى لوحة التحكم
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSeekerForm;
