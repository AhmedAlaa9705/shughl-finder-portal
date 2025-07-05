
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Clock, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';



const rideFormSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  phoneNumber: z.string().min(10, 'رقم الهاتف مطلوب'),
  tripType: z.enum(['oneway', 'returnOnly', 'roundtrip']),
  goverment: z.string().min(1, 'المحافظة مطلوبة'),
  city: z.string().min(1, 'المنطقة مطلوبة'),
  locationLink: z.string().optional(),
  pickupTime: z.string().min(1, 'موعد الإقلال مطلوب') .transform((val) => (val.length === 5 ? val + ':00' : val)),
  dropLocation: z.string().min(1, 'مكان النزول مطلوب'),  
  dropofftime: z.string().min(1, 'موعد النزول مطلوب') .transform((val) => (val.length === 5 ? val + ':00' : val)),
  workDays: z.enum(['days6', 'days5']).optional()
});

type RideFormData = z.infer<typeof rideFormSchema>;

interface RideFormProps {
  onBack: () => void;
}

const RideForm = ({ onBack }: RideFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RideFormData>({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      tripType: 'roundtrip',
      workDays: 'days6'
    }
  });
const navigate=useNavigate();

  const tripType = watch('tripType');
  const workDays = watch('workDays');

  const onSubmit =  (data: RideFormData) => {
     const url='https://localhost:44381/api/Riders/';
    debugger;

axios.post(url+'Insert',data).then(response => {
    console.log('Success:', response.data);
 


setValue('name','');
setValue('city','');
setValue('phoneNumber','');
setValue('dropLocation','');
setValue('dropofftime','');
setValue('goverment','');
setValue('locationLink','');
setValue('pickupTime','');

navigate('/employer');




  
  })
  .catch(error => {
    if (error.response) {
      console.log('Error Response:', error.response.data); // 👈 هنا التفاصيل المهمة
    } else {
      console.log('Unknown Error:', error.message);
    }
  });
   // console.log("rs",res.data);
    console.log(data);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            العودة
          </Button>
          <CardTitle className="text-2xl">طلب دورة نقل</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                {...register('phoneNumber')}
                placeholder="أدخل رقم الهاتف"
                dir="ltr"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          {/* Trip Type */}
          <div className="space-y-3">
            <Label>نوع الرحلة *</Label>
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setValue('tripType', value as any)}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneway" id="oneway" />
                <Label htmlFor="oneway">ذهاب فقط</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="returnOnly" id="returnOnly" />
                <Label htmlFor="returnOnly">عودة فقط</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundtrip" id="roundtrip" />
                <Label htmlFor="roundtrip">ذهاب وعودة</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Pickup Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              مكان الإقلال
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="governorate">المحافظة *</Label>
                <Input
                  id="governorate"
                  {...register('goverment')}
                  placeholder="اختر المحافظة"
                />
                {errors.goverment && (
                  <p className="text-sm text-red-600">{errors.goverment.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="area">المنطقة *</Label>
                <Input
                  id="area"
                  {...register('city')}
                  placeholder="اختر المنطقة"
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locationLink">رابط الموقع (لمزيد من الدقة)</Label>
              <Input
                id="locationLink"
                {...register('locationLink')}
                placeholder="أدخل رابط Google Maps أو الموقع"
                dir="ltr"
              />
            </div>
          </div>

          {/* Time Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                موعد الإقلال *
              </Label>
              <Input
                id="pickupTime"
                type="time"
                {...register('pickupTime')}
              />
              {errors.pickupTime && (
                <p className="text-sm text-red-600">{errors.pickupTime.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dropoffTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                موعد النزول *
              </Label>
              <Input
                id="dropoffTime"
                type="time"
                {...register('dropofftime')}
              />
              {errors.dropofftime && (
                <p className="text-sm text-red-600">{errors.dropofftime.message}</p>
              )}
            </div>
          </div>

          {/* Drop-off Location */}
          <div className="space-y-2">
            <Label htmlFor="dropoffLocation" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              مكان النزول *
            </Label>
            <Input
              id="dropoffLocation"
              {...register('dropLocation')}
              placeholder="أدخل مكان النزول"
            />
            {errors.dropLocation && (
              <p className="text-sm text-red-600">{errors.dropLocation.message}</p>
            )}
          </div>

          {/* Work Days */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              أيام العمل *
            </Label>
            <RadioGroup
              value={workDays}
              onValueChange={(value) => setValue('workDays', value as any)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="days6" id="days6" />
                <Label htmlFor="days6">6 أيام (الجمعة إجازة)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="days5" id="days5" />
                <Label htmlFor="days5">5 أيام (الجمعة والسبت إجازة)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
            >
              إرسال طلب الدورة
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RideForm;
