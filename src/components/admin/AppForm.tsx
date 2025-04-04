import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { App } from '@/lib/db-types';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Form schema
const appFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  logoUrl: z.string().url({ message: 'Please enter a valid URL' }),
  categoryIds: z.array(z.string()).min(1, { message: 'Select at least one category' }),
  locationIds: z.array(z.string()).min(1, { message: 'Select at least one location' }),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' }),
  features: z.array(z.string()),
  isBundle: z.boolean().default(false),
  publisher: z.string().optional(),
});

type AppFormValues = z.infer<typeof appFormSchema>;

interface AppFormProps {
  initialData?: App;
  onCancel: () => void;
}

const AppForm: React.FC<AppFormProps> = ({ initialData, onCancel }) => {
  const { categories, locations, addApp, updateApp } = useAppContext();
  const { toast } = useToast();
  const [featureInput, setFeatureInput] = React.useState('');
  
  const isEditMode = !!initialData;
  
  const form = useForm<AppFormValues>({
    resolver: zodResolver(appFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      features: initialData.features || [],
    } : {
      title: '',
      slug: '',
      description: '',
      logoUrl: '',
      categoryIds: [],
      locationIds: [],
      websiteUrl: '',
      features: [],
      isBundle: false,
      publisher: '',
    },
  });
  
  const onSubmit = (data: AppFormValues) => {
    try {
      if (isEditMode) {
        updateApp(data as App);
        toast({
          title: "App Updated",
          description: `${data.title} has been updated successfully`,
        });
      } else {
        // Generate an ID for new apps
        const newApp = {
          ...data,
          id: `app-${Date.now()}`, // Simple ID generation
        } as App;
        addApp(newApp);
        toast({
          title: "App Added",
          description: `${data.title} has been added successfully`,
        });
      }
      onCancel(); // Close the form
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving the app",
        variant: "destructive",
      });
      console.error(error);
    }
  };
  
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues('features') || [];
      form.setValue('features', [...currentFeatures, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  
  const handleRemoveFeature = (index: number) => {
    const currentFeatures = form.getValues('features') || [];
    form.setValue('features', currentFeatures.filter((_, i) => i !== index));
  };
  
  const handleSlugGeneration = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      form.setValue('slug', slug);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter app title" 
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
                  <Input placeholder="app-slug" {...field} />
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
                  placeholder="Enter app description" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/logo.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Input placeholder="Google, Microsoft, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categoryIds"
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categoryIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, category.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== category.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {category.name}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="locationIds"
          render={() => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {locations.map((location) => (
                  <FormField
                    key={location.id}
                    control={form.control}
                    name="locationIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={location.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(location.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, location.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== location.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {location.name}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Features</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <Button type="button" onClick={handleAddFeature}>Add</Button>
          </div>
          
          <div className="mt-2">
            {form.getValues('features')?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <div className="bg-muted p-2 rounded-md flex-grow">{feature}</div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveFeature(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="isBundle"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  This is a bundle app
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update App' : 'Add App'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppForm;
