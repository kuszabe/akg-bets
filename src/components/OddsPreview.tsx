import "./OddsPreview.css";
import { For } from "solid-js";

export type OddsPreviewProps = {
  options: { label: string; payout: string }[];
};

/** Passive answer displays; the enclosing card handles navigation. */
export function OddsPreview(props: OddsPreviewProps) {
  return (
    <div class="site-answers wa-cluster wa-gap-xs">
      <For each={props.options}>
        {option => (
          <div class="site-odds-chip wa-split wa-gap-xs">
            <span>{option.label}</span>
            <strong>{option.payout}</strong>
          </div>
        )}
      </For>
    </div>
  );
}
