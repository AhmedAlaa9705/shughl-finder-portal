
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';

interface EmployerFormData {
  companyName: string;
  careerWork: string;
  phoneNumber: string;
}
const EmployerForm = () => {
  const [formData, setFormData] = useState<EmployerFormData>({
    companyName: '',
    careerWork: '',
    phoneNumber: ''
  });
const navigate=useNavigate();
  
  const { toast } = useToast();

  const handleInputChange = (field: keyof EmployerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url='https://localhost:44381/api/Companies/';
    if (!formData.companyName || !formData.careerWork || !formData.phoneNumber) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

        try{
        const res= await axios.post(url+'Insert',formData);
            console.log('Employer form data:', formData);
            console.log('response:', res.data);
            if(res.data=="added"){
              toast({
                  title: "تم الحفظ بنجاح",
                  description: "تم حفظ بيانات صاحب العمل بنجاح"
                });
                navigate('/employer');
            }

        }catch(error){

        }


    
  
    // Reset form after successful submission
    setFormData({
      companyName: '',
      careerWork: '',
      phoneNumber: ''
    });
  };



  return (
    
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">بيانات صاحب العمل</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}  className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="أدخل الاسم"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldOfWork">مجال العمل</Label>
            <Input
              id="fieldOfWork"
              type="text"
              value={formData.careerWork}
              onChange={(e) => handleInputChange('careerWork', e.target.value)}
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

          <Button type="submit"  className="w-full bg-blue-600 hover:bg-blue-700">
            حفظ البيانات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployerForm;
