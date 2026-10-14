import "@awesome.me/webawesome/dist/components/card/card.js";
import "./BetCardPreview.css";
import type { JSX } from "@solidjs/web";

export type BetCardPreviewProps = {
  href: string;
  statement: string;
  groupLabel: string;
  expiryDate: string;
  closingLabel: string;
  hidden?: boolean;
  children: JSX.Element;
};

export function BetCardPreview(props: BetCardPreviewProps) {
  return (
    <wa-card class="site-bet-card" appearance="outlined" hidden={props.hidden}>
      <a href={props.href} class="site-bet-card-link wa-stack wa-gap-xs">
        <div class="site-bet-meta wa-split wa-gap-xs">
          <span class="site-bet-group">{props.groupLabel}</span>
          <time datetime={props.expiryDate}>Closes {props.closingLabel}</time>
        </div>
        <h2>{props.statement}</h2>
        {props.children}
      </a>
    </wa-card>
  );
}
