
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

const rideFormSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف مطلوب'),
  tripType: z.enum(['oneway', 'return', 'roundtrip']),
  governorate: z.string().min(1, 'المحافظة مطلوبة'),
  area: z.string().min(1, 'المنطقة مطلوبة'),
  locationLink: z.string().optional(),
  pickupTime: z.string().min(1, 'موعد الإقلال مطلوب'),
  dropoffLocation: z.string().min(1, 'مكان النزول مطلوب'),
  dropoffTime: z.string().min(1, 'موعد النزول مطلوب'),
  workDays: z.enum(['6days', '5days'])
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
      workDays: '6days'
    }
  });

  const tripType = watch('tripType');
  const workDays = watch('workDays');

  const onSubmit = (data: RideFormData) => {
    console.log('Ride form data:', data);
    // Handle form submission here
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
                {...register('phone')}
                placeholder="أدخل رقم الهاتف"
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
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
                <RadioGroupItem value="return" id="return" />
                <Label htmlFor="return">عودة فقط</Label>
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
                  {...register('governorate')}
                  placeholder="اختر المحافظة"
                />
                {errors.governorate && (
                  <p className="text-sm text-red-600">{errors.governorate.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="area">المنطقة *</Label>
                <Input
                  id="area"
                  {...register('area')}
                  placeholder="اختر المنطقة"
                />
                {errors.area && (
                  <p className="text-sm text-red-600">{errors.area.message}</p>
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
                {...register('dropoffTime')}
              />
              {errors.dropoffTime && (
                <p className="text-sm text-red-600">{errors.dropoffTime.message}</p>
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
              {...register('dropoffLocation')}
              placeholder="أدخل مكان النزول"
            />
            {errors.dropoffLocation && (
              <p className="text-sm text-red-600">{errors.dropoffLocation.message}</p>
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
                <RadioGroupItem value="6days" id="6days" />
                <Label htmlFor="6days">6 أيام (الجمعة إجازة)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5days" id="5days" />
                <Label htmlFor="5days">5 أيام (الجمعة والسبت إجازة)</Label>
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
