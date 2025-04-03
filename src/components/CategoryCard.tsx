
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppCategory } from '@/lib/db-types';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface CategoryCardProps {
  category: AppCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { apps } = useAppContext();
  const appCount = apps.filter(app => app.categoryIds.includes(category.id)).length;
  
  return (
    <Card className="overflow-hidden app-card h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <h3 className="font-medium text-xl">{category.name}</h3>
        <p className="text-muted-foreground mt-2">{category.description}</p>
        <p className="text-sm font-medium mt-4">{appCount} {appCount === 1 ? 'app' : 'apps'}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/categories/${category.slug}`} className="flex justify-between items-center">
            <span>Browse {category.name}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
