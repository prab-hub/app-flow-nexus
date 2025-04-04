import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppLocation } from '@/lib/db-types';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Form schema
const locationFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
});

type LocationFormValues = z.infer<typeof locationFormSchema>;

interface LocationFormProps {
  initialData?: AppLocation;
  onCancel: () => void;
  onSuccess?: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ initialData, onCancel, onSuccess }) => {
  const { addLocation, updateLocation } = useAppContext();
  const { toast } = useToast();
  
  const isEditMode = !!initialData;
  
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: initialData ? {
      ...initialData,
    } : {
      name: '',
      slug: '',
      description: '',
    },
  });
  
  const onSubmit = (data: LocationFormValues) => {
    try {
      if (isEditMode && initialData) {
        updateLocation({
          ...data,
          id: initialData.id,
        } as AppLocation);
        toast({
          title: "Location Updated",
          description: `${data.name} has been updated successfully`,
        });
      } else {
        // Generate an ID for new locations
        const newLocation = {
          ...data,
          id: `loc-${Date.now()}`, // Simple ID generation
        } as AppLocation;
        addLocation(newLocation);
        toast({
          title: "Location Added",
          description: `${data.name} has been added successfully`,
        });
      }
      onSuccess?.();
      onCancel(); // Close the form
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving the location",
        variant: "destructive",
      });
      console.error(error);
    }
  };
  
  const handleSlugGeneration = () => {
    const name = form.getValues('name');
    if (name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      form.setValue('slug', slug);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter location name" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    // Auto-generate slug if it's empty or unchanged from initial value
                    if (!form.getValues('slug') || (initialData && form.getValues('slug') === initialData.slug)) {
                      handleSlugGeneration();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="location-slug" {...field} />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSlugGeneration}
                >
                  Generate
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter location description" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update Location' : 'Add Location'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LocationForm;
