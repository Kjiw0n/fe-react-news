import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-6 w-fit items-center justify-center',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'group/trigger',
        // 기본 레이아웃
        'inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1',
        // 간격 및 텍스트
        'available-medium16 whitespace-nowrap',
        // 색상
        'text-weak fill-weak dark:text-white',
        // 전환 효과
        'transition-[color,box-shadow]',
        // 포커스 상태
        'focus-visible:ring-ring/50 focus-visible:outline-ring',
        'focus-visible:border-b-blue-700 focus-visible:ring-[3px] focus-visible:outline-1',
        // 비활성화 상태
        'disabled:pointer-events-none disabled:opacity-50',
        // 활성화 상태
        'data-[state=active]:text-strong data-[state=active]:selected-bold16 data-[state=active]:fill-point',
        // 다크모드 활성화 상태
        'dark:data-[state=active]:text-white',
        'dark:data-[state=active]:border-input',
        'dark:data-[state=active]:bg-input/30',
        // SVG 스타일링
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('min-h-100 flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
