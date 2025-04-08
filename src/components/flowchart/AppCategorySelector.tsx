
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type AppCategory = 'need' | 'want' | 'toBuy' | 'ending' | 'favorite' | 'none';

interface AppCategorySelectorProps {
  selectedCategory: AppCategory;
  onChange: (category: AppCategory) => void;
}

const AppCategorySelector: React.FC<AppCategorySelectorProps> = ({
  selectedCategory,
  onChange
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Subscription category:</h3>
      <RadioGroup value={selectedCategory} onValueChange={(value) => onChange(value as AppCategory)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="need" id="need" />
          <Label htmlFor="need" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Need</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="want" id="want" />
          <Label htmlFor="want" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Want</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="toBuy" id="toBuy" />
          <Label htmlFor="toBuy" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Looking to buy</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ending" id="ending" />
          <Label htmlFor="ending" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Ending subscription</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="favorite" id="favorite" />
          <Label htmlFor="favorite" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Favorite</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none" className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span>None</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AppCategorySelector;
