
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface JobFormData {
  carType: string;
  carModel: string;
  carCount: string;
  workHoursFrom: string;
  workHoursTo: string;
  governorate: string;
  city: string;
  dailyKilometers: string;
  workNature: string;
  fixedRoute: string;
  paymentFrequency: string;
  paymentIncludes: string[];
  paymentDay: string;
  paymentMethod: string;
  averageWorkDays: string;
  salary: string;
}

interface JobFormProps {
  onBack: () => void;
}

const JobForm = ({ onBack }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    carType: '',
    carModel: '',
    carCount: '',
    workHoursFrom: '',
    workHoursTo: '',
    governorate: '',
    city: '',
    dailyKilometers: '',
    workNature: '',
    fixedRoute: '',
    paymentFrequency: '',
    paymentIncludes: [],
    paymentDay: '',
    paymentMethod: '',
    averageWorkDays: '26',
    salary: ''
  });

  const [showJobPosting, setShowJobPosting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentIncludesChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentIncludes: checked 
        ? [...prev.paymentIncludes, value]
        : prev.paymentIncludes.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.carType || !formData.carCount || !formData.workHoursFrom || 
        !formData.workHoursTo || !formData.governorate || !formData.city ||
        !formData.dailyKilometers || !formData.workNature || !formData.paymentFrequency ||
        !formData.paymentDay || !formData.paymentMethod || !formData.salary) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    console.log('Job form data:', formData);
    setShowJobPosting(true);
    
    toast({
      title: "تم إنشاء الإعلان بنجاح",
      description: "تم إنشاء إعلان الوظيفة بنجاح"
    });
  };

  const JobPosting = () => (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-center text-green-600">إعلان الوظيفة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed text-right">
          <p>
            مطلوب سيارة {formData.carType} عدد {formData.carCount}
            {formData.carModel && ` موديلات من ${formData.carModel}`}
          </p>
          <p>
            العمل {parseInt(formData.workHoursTo) - parseInt(formData.workHoursFrom)} ساعات 
            عمل من {formData.workHoursFrom} الى {formData.workHoursTo}
          </p>
          <p>مكان العمل: {formData.governorate} - {formData.city}</p>
          <p>طبيعة العمل: {formData.workNature}</p>
          <p>عدد الكيلومترات اليومية: {formData.dailyKilometers}</p>
          {formData.fixedRoute && <p>خط السير: {formData.fixedRoute}</p>}
          <p>طريقة الدفع: {formData.paymentFrequency}</p>
          {formData.paymentIncludes.length > 0 && (
            <p>يشمل: {formData.paymentIncludes.join(' + ')}</p>
          )}
          <p>ميعاد الدفع: يوم {formData.paymentDay} من كل شهر</p>
          <p>طريقة الدفع: {formData.paymentMethod}</p>
          <p>متوسط أيام العمل: {formData.averageWorkDays} يوم في الشهر</p>
          <p className="font-bold text-blue-600">
            {formData.paymentFrequency === 'يومي' ? 'اليومية' : 'الشهرية'}: {formData.salary} جنيه
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <Button onClick={() => setShowJobPosting(false)} variant="outline" className="flex-1">
            تعديل الإعلان
          </Button>
          <Button onClick={onBack} className="flex-1 bg-green-600 hover:bg-green-700">
            نشر الإعلان
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showJobPosting) {
    return <JobPosting />;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">إضافة وظيفة جديدة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Car Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">معلومات السيارة</h3>
              
              <div className="space-y-2">
                <Label htmlFor="carType">نوع السيارة المطلوبة *</Label>
                <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر نوع السيارة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دوبل">دوبل</SelectItem>
                    <SelectItem value="ربع نقل">ربع نقل</SelectItem>
                    <SelectItem value="نصف نقل">نصف نقل</SelectItem>
                    <SelectItem value="ملاكي">ملاكي</SelectItem>
                    <SelectItem value="أتوبيس">أتوبيس</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carModel">الموديل (اختياري)</Label>
                <Input
                  id="carModel"
                  value={formData.carModel}
                  onChange={(e) => handleInputChange('carModel', e.target.value)}
                  placeholder="مثال: 2020 أو أحدث"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carCount">عدد السيارات *</Label>
                <Input
                  id="carCount"
                  type="number"
                  value={formData.carCount}
                  onChange={(e) => handleInputChange('carCount', e.target.value)}
                  placeholder="1"
                  className="text-right"
                />
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">معلومات العمل</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workHoursFrom">ساعات العمل من *</Label>
                  <Input
                    id="workHoursFrom"
                    type="time"
                    value={formData.workHoursFrom}
                    onChange={(e) => handleInputChange('workHoursFrom', e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workHoursTo">إلى *</Label>
                  <Input
                    id="workHoursTo"
                    type="time"
                    value={formData.workHoursTo}
                    onChange={(e) => handleInputChange('workHoursTo', e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="governorate">المحافظة *</Label>
                  <Input
                    id="governorate"
                    value={formData.governorate}
                    onChange={(e) => handleInputChange('governorate', e.target.value)}
                    placeholder="القاهرة"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="مدينة نصر"
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyKilometers">عدد الكيلومترات اليومية *</Label>
                <Select value={formData.dailyKilometers} onValueChange={(value) => handleInputChange('dailyKilometers', value)}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر المسافة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50 كم">50 كم</SelectItem>
                    <SelectItem value="100 كم">100 كم</SelectItem>
                    <SelectItem value="150 كم">150 كم</SelectItem>
                    <SelectItem value="200 كم">200 كم</SelectItem>
                    <SelectItem value="أكثر من 200 كم">أكثر من 200 كم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workNature">طبيعة العمل *</Label>
                <Select value={formData.workNature} onValueChange={(value) => handleInputChange('workNature', value)}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر طبيعة العمل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دورات">دورات</SelectItem>
                    <SelectItem value="خدمة موقع">خدمة موقع</SelectItem>
                    <SelectItem value="مشاوير خارجية">مشاوير خارجية</SelectItem>
                    <SelectItem value="مشاوير متنوعة">مشاوير متنوعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fixedRoute">خط السير الثابت (إن وجد)</Label>
                <Textarea
                  id="fixedRoute"
                  value={formData.fixedRoute}
                  onChange={(e) => handleInputChange('fixedRoute', e.target.value)}
                  placeholder="مثال: نقطة أ - نقطة ب - نقطة ج"
                  className="text-right"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">معلومات الدفع</h3>
            
            <div className="space-y-3">
              <Label>طريقة الدفع *</Label>
              <RadioGroup 
                value={formData.paymentFrequency} 
                onValueChange={(value) => handleInputChange('paymentFrequency', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="يومي" id="daily" />
                  <Label htmlFor="daily">يومي</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="شهري" id="monthly" />
                  <Label htmlFor="monthly">شهري (الحساب في آخر الشهر)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>ما يشمله الدفع</Label>
              <div className="grid grid-cols-3 gap-4">
                {['الوقود', 'الزيت', 'السكن'].map((item) => (
                  <label key={item} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.paymentIncludes.includes(item)}
                      onChange={(e) => handlePaymentIncludesChange(item, e.target.checked)}
                      className="rounded"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDay">ميعاد الدفع (يوم من الشهر) *</Label>
                <Input
                  id="paymentDay"
                  type="number"
                  min="1"
                  max="31"
                  value={formData.paymentDay}
                  onChange={(e) => handleInputChange('paymentDay', e.target.value)}
                  placeholder="25"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageWorkDays">متوسط أيام العمل في الشهر</Label>
                <Input
                  id="averageWorkDays"
                  type="number"
                  value={formData.averageWorkDays}
                  onChange={(e) => handleInputChange('averageWorkDays', e.target.value)}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">
                  {formData.paymentFrequency === 'يومي' ? 'اليومية' : 'الشهرية'} (جنيه) *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="500"
                  className="text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">طريقة الدفع *</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="كاش">كاش</SelectItem>
                  <SelectItem value="تحويلات بنكية">تحويلات بنكية</SelectItem>
                  <SelectItem value="انستا باي">انستا باي</SelectItem>
                  <SelectItem value="محفظة إلكترونية">محفظة إلكترونية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={onBack} variant="outline" className="flex-1">
              رجوع
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              إنشاء الإعلان
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobForm;
