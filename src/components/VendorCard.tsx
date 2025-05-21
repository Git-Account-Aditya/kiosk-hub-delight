
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import HygieneRating from './HygieneRating';
import { Badge } from '@/components/ui/badge';

interface VendorCardProps {
  id: string;
  name: string;
  image: string;
  cuisineType: string[];
  location: string;
  hygieneRating: number;
  distance?: string;
  featured?: boolean;
}

const VendorCard = ({
  id,
  name,
  image,
  cuisineType,
  location,
  hygieneRating,
  distance,
  featured = false,
}: VendorCardProps) => {
  return (
    <Link to={`/vendors/${id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-primary border-2' : ''}`}>
        <div className="relative h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-secondary hover:bg-secondary">Featured</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <HygieneRating rating={hygieneRating} size="sm" />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {cuisineType.map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
            {distance && <span className="ml-auto text-xs">{distance}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VendorCard;
