import React from 'react';
import { Button } from '@/components/ui';
import { ArrowRight, Plus, Check, Trash, ExternalLink, Save, Send } from 'lucide-react';

/**
 * Design System Page
 * 
 * This page showcases all UI components in the design system
 * with examples of how to use them consistently.
 */
const DesignSystem: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-brand-navy">Design System</h1>
      
      {/* Button Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-brand-navy">Buttons</h2>
        <p className="text-slate-700 mb-8">
          The Button component consolidates all button styles into a single, flexible component.
          Below are examples of the different variants, sizes, and styles available.
        </p>

        {/* Variants */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Button Variants</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default">Default (Primary)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondaryOutline">Secondary Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <div className="p-4 bg-brand-navy rounded inline-block">
              <Button variant="glass">Glass</Button>
            </div>
            <div className="p-4 bg-brand-navy rounded inline-block">
              <Button variant="hero">Hero</Button>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-brand-navy">When to use each variant</h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              <li><strong>Default (Primary):</strong> Main call-to-action buttons, form submissions</li>
              <li><strong>Secondary:</strong> Alternative actions, secondary workflows</li>
              <li><strong>Destructive:</strong> Delete, remove, or cancel actions</li>
              <li><strong>Outline:</strong> Less prominent actions that should still be visible</li>
              <li><strong>Secondary Outline:</strong> Same as outline but with brand-gold color</li>
              <li><strong>Ghost:</strong> Very subtle actions that shouldn't draw attention</li>
              <li><strong>Link:</strong> When a button should appear as a text link</li>
              <li><strong>Glass:</strong> Used on darker backgrounds, especially in hero sections</li>
              <li><strong>Hero:</strong> Primary actions on dark backgrounds (like "Start Transaction")</li>
            </ul>
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Button Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm" variant="default">Small</Button>
            <Button size="default" variant="default">Default</Button>
            <Button size="lg" variant="default">Large</Button>
            <Button size="xl" variant="default">Extra Large</Button>
            <Button size="icon" variant="default" aria-label="Add item">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-brand-navy">When to use each size</h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              <li><strong>Small:</strong> Compact interfaces, tight spaces, secondary actions</li>
              <li><strong>Default:</strong> Standard buttons throughout the interface</li>
              <li><strong>Large:</strong> Primary actions, form submissions</li>
              <li><strong>Extra Large:</strong> Hero sections, main call-to-actions</li>
              <li><strong>Icon:</strong> For icon-only buttons (must include aria-label)</li>
            </ul>
          </div>
        </div>

        {/* Border Radius */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Border Radius</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button radius="default" variant="default">Default Radius</Button>
            <Button radius="lg" variant="default">Large Radius</Button>
            <Button radius="xl" variant="default">Extra Large Radius</Button>
            <Button radius="full" variant="default">Full Radius</Button>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-brand-navy">Border Radius Consistency</h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              <li><strong>Default (rounded-md):</strong> Used for most interface elements, matching shadcn/ui defaults</li>
              <li><strong>Large (rounded-lg):</strong> Used for cards and larger elements</li>
              <li><strong>Extra Large (rounded-xl):</strong> Used for some primary action buttons and featured elements</li>
              <li><strong>Full (rounded-full):</strong> Used for hero buttons, CTA buttons, and floating action buttons</li>
            </ul>
          </div>
        </div>

        {/* With Icons */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Buttons with Icons</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default" icon={<ArrowRight />}>
              Next Step
            </Button>
            <Button variant="secondary" icon={<Save />}>
              Save Progress
            </Button>
            <Button variant="outline" icon={<Check />}>
              Complete
            </Button>
            <Button variant="destructive" icon={<Trash />}>
              Delete
            </Button>
            <Button variant="link" icon={<ExternalLink />} iconPosition="right">
              View Documentation
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-brand-navy">Icon Usage Guidelines</h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              <li>Use icons to reinforce the button's purpose</li>
              <li>Default icon position is on the left</li>
              <li>Right-positioned icons typically indicate navigation or external links</li>
              <li>Keep icons consistent across similar actions</li>
              <li>Use Lucide React icons for consistency</li>
            </ul>
          </div>
        </div>

        {/* Animation Examples */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Button Animations</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default" withAnimation={true}>
              With Animation
            </Button>
            <Button 
              variant="hero" 
              radius="full" 
              withAnimation={true}
              icon={
                <ArrowRight className="w-5 h-5" />
              }
            >
              Start Transaction
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-brand-navy">Animation Guidelines</h4>
            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              <li>Use animations sparingly and purposefully</li>
              <li>Primarily use animations for hero sections and primary CTAs</li>
              <li>Avoid animations for standard form buttons and utility actions</li>
              <li>Keep animations subtle and quick (the component handles this automatically)</li>
            </ul>
          </div>
        </div>
        
        {/* Common Use Cases */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-brand-navy">Common Button Patterns</h3>
          
          <h4 className="text-lg font-medium mt-6 mb-3 text-brand-navy">Form Actions</h4>
          <div className="p-6 border rounded-lg mb-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="default">Submit</Button>
              <Button variant="outline" size="default">Cancel</Button>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mt-6 mb-3 text-brand-navy">Hero Section</h4>
          <div className="p-6 bg-brand-navy rounded-lg mb-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                radius="full" 
                withAnimation={true}
                icon={<Send />}
              >
                Get Started
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                radius="full" 
                withAnimation={true}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mt-6 mb-3 text-brand-navy">Data Table Actions</h4>
          <div className="p-6 border rounded-lg mb-6">
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">View</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mt-6 mb-3 text-brand-navy">Multi-Step Form</h4>
          <div className="p-6 border rounded-lg mb-6">
            <div className="flex justify-between">
              <Button variant="outline" size="default">Back</Button>
              <Button 
                variant="default" 
                size="default" 
                icon={<ArrowRight />} 
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Link */}
      <div className="p-6 bg-brand-blue/10 rounded-lg mb-12">
        <h3 className="text-xl font-medium mb-2 text-brand-navy">Documentation</h3>
        <p className="text-slate-700 mb-4">
          For complete API documentation and implementation details, please see 
          the <code className="px-1 py-0.5 bg-slate-200 rounded text-brand-blue">unified-button.docs.md</code> file 
          in the components/ui directory.
        </p>
        <p className="text-slate-700">
          For migration guidance from existing button components, refer to 
          the <code className="px-1 py-0.5 bg-slate-200 rounded text-brand-blue">DESIGN_SYSTEM_MIGRATION.md</code> file 
          in the project root.
        </p>
      </div>
    </div>
  );
};

export default DesignSystem;
