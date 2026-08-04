---
tags:
  - component
  - react
type: reference
status: stable
created: 2026-08-04
---

# ComponentName

> One-line description of what this component does.

**Related:** [[architecture]] | [[components]] | [[patterns#React Patterns]]

---

## Overview

Brief description of the component's role and where it fits in the application.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `string` | `required` | Description |
| `optional` | `boolean` | `false` | Description |

## State

| State | Type | Purpose |
|-------|------|---------|
| `isOpen` | `boolean` | Controls dropdown visibility |

## Hooks

```tsx
const [state, setState] = useState<Type>(initialValue);
useEffect(() => { /* effect */ }, [deps]);
```

## Render

```tsx
return (
  <div className="component-name">
    {/* Content */}
  </div>
);
```

## Accessibility

- ARIA attributes used
- Keyboard navigation
- Screen reader considerations

## Example Usage

```tsx
<ComponentName
  prop="value"
  onAction={(data) => handleAction(data)}
/>
```

## Related Components

- [[RelatedComponent1]] — Brief description
- [[RelatedComponent2]] — Brief description

## Tests

See [[components#ComponentName.test.tsx]] for test coverage.

---

*Last updated: August 2026*
