# Preview components

Each preview has its own component file. Pages select examples and calculate display values; previews accept only the fields they render, never a `Bet` object.

## Home page

| Component | Props |
| --- | --- |
| `src/components/BetCardPreview.tsx` | `href`, `statement`, `groupLabel`, ISO `expiryDate`, formatted `closingLabel`, optional `hidden`, and `children` for the answer preview. |
| `src/components/OddsPreview.tsx` | `options`: an array of `{ label: string, payout: string }`, such as `{ label: "Yes", payout: "2x" }`. |
| `src/components/SliderPreview.tsx` | See [SliderPreview.md](./SliderPreview.md). |

```tsx
import { BetCardPreview } from "../src/components/BetCardPreview";
import { OddsPreview } from "../src/components/OddsPreview";

<BetCardPreview
  href="/designs/robotics"
  statement="Will the robotics team win?"
  groupLabel="Robotics"
  expiryDate="2026-10-31T16:00:00Z"
  closingLabel="31 Oct"
>
  <OddsPreview options={[{ label: "Yes", payout: "2x" }, { label: "No", payout: "2x" }]} />
</BetCardPreview>
```

These components use Web Awesome cards and layout utilities. Component styles are imported automatically, and the card and slider components register themselves. Load Web Awesome’s theme and layout utilities as in `src/App.tsx`. Pass Solid signals directly in JSX for reactive updates.
