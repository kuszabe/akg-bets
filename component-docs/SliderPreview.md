# SliderPreview

Read-only preview for slider bets: current attendance and a slider track. Payout information and wagering controls remain on the bet-detail page.

Source: `src/components/SliderPreview.tsx`. Its stylesheet is imported automatically. The app must load Web Awesome's theme and layout utilities. The preview imports and registers `wa-slider` and `wa-card` automatically.

Uses a Web Awesome `wa-slider` with its default styling and no endpoint labels. The slider is read-only and inert so it cannot capture focus or change the prediction inside the card link. The visible summary provides the text equivalent. A plain `wa-card` wraps the preview without extra padding; the enclosing bet's outlined `wa-card` supplies the single outer border.

## Usage

```tsx
import { SliderPreview } from "./components/SliderPreview";

// Pass only display values, including reactive values from Solid signals.
<SliderPreview value={attendance()} minimum={0} maximum={100} unit="%" />

// Customize the label for other numeric predictions.
<SliderPreview value={likes()} minimum={0} maximum={1000} label="Current prediction" />
```

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `number` | Required current value; displayed rounded to the nearest integer. |
| `minimum` | `number` | Lower bound; defaults to 0. |
| `maximum` | `number` | Upper bound; defaults to 100. Must exceed the minimum. |
| `unit` | `string` | Optional suffix for the displayed value, such as `%`. |
| `label` | `string` | Optional; defaults to `Current attendance`. |

The component has no dependency on the Bet model or payout calculations. The caller calculates the value to display. On the betting page, the caller passes `numericAverage(bet())`, which includes initial predictions and placed bets. The marker stays within the supplied range; the text shows the rounded supplied value.

Pass reactive props directly as shown; the component reads them through accessors so changing values update the preview. It has no click handler, hover color change, or editable controls. A parent link may open the bet's detail page.
