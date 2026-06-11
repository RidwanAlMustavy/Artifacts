---
title: "Naming Things is Hard: A Guide to Token Taxonomy"
excerpt: "The secret to an enduring design system isn't the color palette—it's the vocabulary. If design and engineering don't speak the same language, the system breaks."
date: "2025-03-20"
author: "Maya Chen"
category: "Design"
readTime: "8 min read"
featured: true
coverGradient: "from-amber-400 to-orange-600"
---

# Naming Things is Hard: A Guide to Token Taxonomy

The hardest part of building a design token architecture isn't picking the perfect hex codes. It's figuring out what to call them. If your names are too specific, they lack flexibility. If they're too generic, they lose meaning.

Here is the three-tier framework that saved our product language from complete chaos.

## 1. Global Tokens (The Raw Ingredients)

These represent your foundational values. They are immutable and independent of context.

- `color.blue.500`
- `spacing.scale.16`
- `font.size.sm`

Engineers and designers should rarely map these directly to UI elements. They are the base values from which everything else flows.

## 2. Alias Tokens (The Functional Context)

Alias tokens give meaning to your raw ingredients based on their intended application or semantic role.

- `color.brand.primary` -> maps to `color.blue.500`
- `color.text.body` -> maps to `color.grey.800`
- `color.background.surface` -> maps to `color.white`

This layer allows you to swap themes (like Dark Mode) smoothly without altering your core components.

## 3. Component-Specific Tokens (The Scope)

These are tied explicitly to an individual component's properties.

- `button.primary.background` -> maps to `color.brand.primary`
- `card.elevation.shadow` -> maps to `shadow.sm`

Keep these reserved for components with highly unique attributes to avoid over-engineering your architecture early on.
