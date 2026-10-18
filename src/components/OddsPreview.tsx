import "./OddsPreview.css";
import { For } from "solid-js";

export type OddsPreviewProps = {
  options: { label: string; payout: string }[];
};

/** Passive answer displays; the enclosing card handles navigation. */
export function OddsPreview(props: OddsPreviewProps) {
  const columns = () => props.options.length === 1 || props.options.some(option => option.label.length > 22) ? 1 : 2;
  return (
    <div class={["site-answers wa-grid wa-gap-xs", columns() === 1 ? "site-answers-1" : "site-answers-2"]}>
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
