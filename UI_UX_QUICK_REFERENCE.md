# UI/UX Quick Reference Guide
## Critical Issues & Quick Fixes

---

## 🚨 CRITICAL ISSUES (Fix Immediately)

### 1. Mobile Sidebar Not Responsive
**Problem:** Fixed 256px sidebar breaks on mobile  
**Fix:** Use responsive classes and mobile drawer
```tsx
// App.tsx - Change line 82
<main className="flex-1 md:ml-64 bg-gray-50/50">

// Sidebar.tsx - Add mobile support
import { useIsMobile } from './ui/use-mobile';
import { Sheet } from './ui/sheet';
```

### 2. Missing Accessibility Labels
**Problem:** Screen readers can't identify buttons  
**Fix:** Add ARIA labels to all interactive elements
```tsx
<button
  aria-label="Navigate to Dashboard"
  aria-current={isActive ? "page" : undefined}
>
```

### 3. No Loading States
**Problem:** Users don't know when actions are processing  
**Fix:** Add loading indicators everywhere
```tsx
{isLoading ? <Spinner /> : <Content />}
```

### 4. No Error Handling
**Problem:** Failed actions provide no feedback  
**Fix:** Add error messages and toast notifications
```tsx
import { toast } from 'sonner';
toast.error('Operation failed');
```

---

## ⚡ QUICK WINS (Under 2 Hours Each)

### 1. Add Focus Indicators (30 min)
```tsx
className="focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:outline-none"
```

### 2. Fix Mobile Layout (2 hours)
- Remove fixed `ml-64` on mobile
- Add hamburger menu
- Use Sheet component for mobile sidebar

### 3. Add Empty States (1 hour)
```tsx
{items.length === 0 ? (
  <EmptyState icon={BookOpen} title="No items" />
) : (
  <ItemsList />
)}
```

### 4. Standardize Spacing (1 hour)
- Use consistent padding: `p-4`, `p-6`, `p-8`
- Document spacing scale

### 5. Add Breadcrumbs (1 hour)
```tsx
<Breadcrumb>
  <BreadcrumbItem>Dashboard</BreadcrumbItem>
  <BreadcrumbItem>Study Plans</BreadcrumbItem>
</Breadcrumb>
```

---

## 📋 CHECKLIST

### Accessibility
- [ ] All buttons have aria-labels
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Forms have proper labels

### Responsive Design
- [ ] Sidebar works on mobile
- [ ] All layouts adapt to screen size
- [ ] Touch targets are 44x44px minimum
- [ ] Text is readable on small screens
- [ ] No horizontal scrolling

### User Feedback
- [ ] Loading states for all async operations
- [ ] Error messages for failed actions
- [ ] Success confirmations
- [ ] Empty states for empty data
- [ ] Progress indicators

### Consistency
- [ ] Consistent spacing scale
- [ ] Standardized button usage
- [ ] Uniform card styles
- [ ] Consistent typography
- [ ] Standardized color usage

---

## 🎨 DESIGN TOKENS

### Spacing Scale
```tsx
xs: '0.5rem'  // 8px
sm: '1rem'    // 16px
md: '1.5rem'  // 24px
lg: '2rem'    // 32px
xl: '3rem'    // 48px
```

### Color Palette
```tsx
Primary: purple-600 (#7C3AED)
Secondary: blue-600 (#2563EB)
Success: green-600
Error: red-600
Warning: orange-600
```

### Typography Scale
```tsx
xs: 0.75rem   // 12px
sm: 0.875rem  // 14px
base: 1rem    // 16px
lg: 1.125rem  // 18px
xl: 1.25rem   // 20px
2xl: 1.5rem   // 24px
```

---

## 🔧 COMMON PATTERNS

### Accessible Button
```tsx
<button
  onClick={handleClick}
  aria-label="Action description"
  className="focus-visible:ring-2 focus-visible:ring-purple-600"
>
  <Icon aria-hidden="true" />
  <span>Label</span>
</button>
```

### Loading State
```tsx
{isLoading ? (
  <div className="flex items-center justify-center p-8">
    <Spinner />
    <span className="sr-only">Loading...</span>
  </div>
) : (
  <Content />
)}
```

### Error State
```tsx
{error && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-600">{error.message}</p>
  </div>
)}
```

### Empty State
```tsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium mb-2">No items found</h3>
    <p className="text-gray-500 mb-4">Get started by creating your first item</p>
    <Button onClick={handleCreate}>Create Item</Button>
  </div>
) : (
  <ItemsList items={items} />
)}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```tsx
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

---

## 🚀 IMPLEMENTATION ORDER

1. **Week 1: Critical Fixes**
   - Mobile responsiveness
   - Basic accessibility
   - Loading states

2. **Week 2: User Feedback**
   - Error handling
   - Empty states
   - Success messages

3. **Week 3: Polish**
   - Consistency improvements
   - Visual hierarchy
   - Microinteractions

4. **Week 4: Enhancement**
   - Advanced features
   - Onboarding
   - Analytics improvements

---

## 📚 RESOURCES

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design Guidelines](https://material.io/design)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

*For detailed analysis, see `UI_UX_ANALYSIS.md`*

