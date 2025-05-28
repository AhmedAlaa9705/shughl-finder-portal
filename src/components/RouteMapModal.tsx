
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Save, MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RoutePoint {
  lng: number;
  lat: number;
  name: string;
}

interface RouteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (points: RoutePoint[]) => void;
  initialPoints?: RoutePoint[];
}

const RouteMapModal = ({ isOpen, onClose, onSave, initialPoints = [] }: RouteMapModalProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [points, setPoints] = useState<RoutePoint[]>(initialPoints);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenEntered, setTokenEntered] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [46.7219, 24.6877], // Riyadh coordinates
      zoom: 10
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add click event to add points
    map.current.on('click', (e) => {
      const newPoint: RoutePoint = {
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        name: `نقطة ${points.length + 1}`
      };
      
      const updatedPoints = [...points, newPoint];
      setPoints(updatedPoints);
      addMarker(newPoint, updatedPoints.length - 1);
      updateRoute(updatedPoints);
    });

    // Add initial points if any
    points.forEach((point, index) => {
      addMarker(point, index);
    });

    if (points.length > 1) {
      updateRoute(points);
    }
  };

  const addMarker = (point: RoutePoint, index: number) => {
    if (!map.current) return;

    const marker = new mapboxgl.Marker({ color: '#10b981' })
      .setLngLat([point.lng, point.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<div dir="rtl">${point.name}</div>`))
      .addTo(map.current);

    markersRef.current.push(marker);
  };

  const updateRoute = async (routePoints: RoutePoint[]) => {
    if (!map.current || routePoints.length < 2) return;

    const coordinates = routePoints.map(point => [point.lng, point.lat]).join(';');
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxToken}`
      );
      
      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        const route = data.routes[0].geometry;
        
        if (map.current.getSource('route')) {
          (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
            type: 'Feature',
            properties: {},
            geometry: route
          });
        } else {
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          });

          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#10b981',
              'line-width': 5
            }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const clearPoints = () => {
    setPoints([]);
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (map.current && map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }
  };

  const handleSave = () => {
    onSave(points);
    onClose();
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
      setTimeout(initializeMap, 100);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            تحديد خط السير الثابت
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {!tokenEntered ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">رمز Mapbox مطلوب</h3>
                <p className="text-gray-600">
                  يرجى إدخال رمز Mapbox العام الخاص بك لعرض الخريطة
                </p>
                <p className="text-sm text-gray-500">
                  يمكنك الحصول على الرمز من{' '}
                  <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    mapbox.com
                  </a>
                </p>
              </div>
              
              <div className="w-full max-w-md space-y-4">
                <div>
                  <Label htmlFor="mapboxToken">رمز Mapbox العام</Label>
                  <Input
                    id="mapboxToken"
                    type="text"
                    placeholder="pk.ey..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                  />
                </div>
                <Button onClick={handleTokenSubmit} className="w-full">
                  عرض الخريطة
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  انقر على الخريطة لإضافة نقاط المسار
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearPoints}>
                    مسح جميع النقاط
                  </Button>
                  <span className="text-sm text-gray-500 flex items-center">
                    عدد النقاط: {points.length}
                  </span>
                </div>
              </div>
              
              <div ref={mapContainer} className="flex-1 rounded-lg border" />
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={onClose}>
                  إلغاء
                </Button>
                <Button onClick={handleSave} disabled={points.length === 0}>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المسار ({points.length} نقطة)
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteMapModal;
