---
tags:
  - patterns
  - best-practice
type: guide
status: stable
created: 2026-08-04
---

# Code Patterns — Glenn Claes Portfolio

> Reusable patterns and conventions used throughout the codebase. Copy these for consistency.

---

## React Patterns

### Language-Aware Component

Every component that renders text wraps in `useLanguage()`:

```tsx
import { useLanguage } from '@/i18n/LanguageProvider';

export function MyComponent() {
  const { messages } = useLanguage();
  
  return (
    <div>
      <h2>{messages.mySection.title}</h2>
      <p>{messages.mySection.description}</p>
    </div>
  );
}
```

**Used in:** All section components ([[Hero]], [[About]], [[Services]], etc.)

---

### IntersectionObserver Hook

For one-shot scroll-triggered effects:

```tsx
useEffect(() => {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );

  elements.forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

**See:** [[components#useReveal.ts]]

---

### Event Listener Cleanup

Always return cleanup from `useEffect`:

```tsx
useEffect(() => {
  const handler = (event: Event) => { /* ... */ };
  window.addEventListener('custom-event', handler);
  return () => window.removeEventListener('custom-event', handler);
}, []);
```

**Used in:** [[Contact.tsx]], [[LanguageSwitcher.tsx]]

---

### State with Previous Value

When new state depends on previous:

```tsx
setForm(current => ({ ...current, ...newValues }));
```

**Used in:** [[Contact.tsx]] prefill handler

---

## CSS Patterns

### Reveal Animation

Base class + `.in` modifier:

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
              transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

**Stagger via data attributes:**
```css
.reveal[data-delay='1'] { transition-delay: 0.08s; }
.reveal[data-delay='2'] { transition-delay: 0.16s; }
```

**See:** [[css-design-system#Scroll Reveal System]]

---

### Modal Scroll Lock

```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }
}, [isOpen]);
```

**Used in:** [[CaseStudyModal.tsx]]

---

### Card Hover Lift

```css
.project-card {
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**See:** [[css-design-system#Cards]]

---

## Data Patterns

### Locale-Aware Data Merging

```tsx
export function getProjects(locale: Locale): Project[] {
  return Object.keys(baseProjects).map((id) => ({
    ...baseProjects[id as ProjectId],
    ...projectTexts[locale][id as ProjectId],
  }));
}
```

**See:** [[components#projects.ts]], [[architecture#Data Layer]]

---

### CustomEvent Payload

```tsx
// Dispatcher
const openContact = (preset: ContactPreset) => {
  window.dispatchEvent(
    new CustomEvent<ContactPreset>('open-contact', { detail: preset })
  );
};

// Listener
useEffect(() => {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ContactPreset>).detail;
    setForm(current => ({ ...current, ...detail }));
  };
  window.addEventListener('open-contact', handler);
  return () => window.removeEventListener('open-contact', handler);
}, []);
```

**See:** [[app/api-reference/adapters/use-cases#2. Cross-Component Communication]]

---

## Three.js Patterns

### Scene Initialization with Cleanup

```tsx
useEffect(() => {
  const scene = initHeroScene(canvasRef.current!, options);
  return () => scene?.dispose();
}, []);
```

**Key:** Return cleanup function from the effect.

**See:** [[components#hero-scene.ts]]

---

### Mouse Tracking with Lerp

```tsx
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  targetRotation.x = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
  targetRotation.y = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
});

function animate() {
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;
  group.rotation.x = currentRotation.x;
  group.rotation.y = currentRotation.y;
}
```

**See:** [[architecture#Three.js Hero Scene]]

---

## Testing Patterns

### Component Test with LanguageProvider

```tsx
const renderWithProvider = (component: React.ReactNode) =>
  render(<LanguageProvider>{component}</LanguageProvider>);

it('renders text', () => {
  renderWithProvider(<MyComponent />);
  expect(screen.getByText('expected text')).toBeInTheDocument();
});
```

**See:** [[testing#Unit & Component Tests]]

---

### CustomEvent Test

```tsx
it('prefills form from event', () => {
  render(<Contact />);
  
  act(() => {
    window.dispatchEvent(new CustomEvent('open-contact', {
      detail: { type: 'Automation', message: 'Hello' }
    }));
  });
  
  expect(screen.getByLabelText(/type/i)).toHaveValue('Automation');
  expect(screen.getByLabelText(/message/i)).toHaveValue('Hello');
});
```

**See:** [[components#Contact.test.tsx]]

---

## Accessibility Patterns

### Modal Focus Management

```tsx
const closeButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isOpen) {
    closeButtonRef.current?.focus();
  }
}, [isOpen]);
```

**See:** [[components#CaseStudyModal.tsx]]

---

### Error Message Association

```tsx
<div class="field">
  <input aria-invalid={hasError} aria-describedby={hasError ? 'name-error' : undefined} />
  {hasError && <span id="name-error" class="field-error">Please enter your name</span>}
</div>
```

**See:** [[components#Contact.tsx]]

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase.tsx | `CaseStudyModal.tsx` |
| Hooks | camelCase with `use` prefix | `useReveal.ts` |
| Utilities | camelCase.ts | `navigation.ts` |
| Data files | lowercase.ts | `projects.ts` |
| Tests | Co-located `*.test.tsx` | `Contact.test.tsx` |
| CSS classes | kebab-case | `.project-card` |
| CSS variables | kebab-case with `--` prefix | `--accent-hover` |

**See:** [[architecture#File Naming Conventions]]

---

*Last updated: August 2026*
