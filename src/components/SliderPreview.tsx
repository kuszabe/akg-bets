import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/slider/slider.js";
import "./SliderPreview.css";

export type SliderPreviewProps = {
  value: number;
  minimum?: number;
  maximum?: number;
  unit?: string;
  label?: string;
};

/** Read-only summary; wagering and payout information belong on the detail page. */
export function SliderPreview(props: SliderPreviewProps) {
  const minimum = () => props.minimum ?? 0;
  const maximum = () => props.maximum ?? 100;
  const value = () => Math.min(maximum(), Math.max(minimum(), props.value));

  return (
    <wa-card class="slider-preview" appearance="plain">
      <div class="wa-stack wa-gap-xs">
      <div class="slider-preview-summary wa-cluster wa-gap-xs">
        <span>{props.label ?? "Current attendance"}</span>
        <strong>{Math.round(props.value)} {props.unit}</strong>
      </div>
      <div inert>
      <wa-slider
        min={minimum()}
        max={maximum()}
        value={value()}
        step={0.01}
        readonly
        aria-hidden="true"
      >
        <span slot="reference">{minimum()}{props.unit ? ` ${props.unit}` : ""}</span>
        <span slot="reference">{maximum()}{props.unit ? ` ${props.unit}` : ""}</span>
      </wa-slider>
      </div>
      </div>
    </wa-card>
  );
}
