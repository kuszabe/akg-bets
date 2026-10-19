import { BetCardPreview } from "../preview-cards/BetCardPreview";
import { OddsPreview } from "../preview-cards/OddsPreview";
import { SliderPreview } from "../preview-cards/SliderPreview";
import { HomeLayout } from "../layout";

export default function Home() {
    return (
        <HomeLayout>
            <div class="two-column">
                <BetCardPreview closingLabel="2026.11.01" expiryDate="2026.11.01" groupLabel="dolgok" href="" statement="Holnap be jön-e szmunti">
                    <OddsPreview options={[
                        {label: "Itt lesz nyitáson", payout: "1.5x"},
                        {label: "Nem jön be", payout: "2x"},
                        {label: "Később jön be", payout: "3x"},
                    ]}/>
                </BetCardPreview>
                <BetCardPreview closingLabel="2026.11.01" expiryDate="2026.11.01" groupLabel="dolgok" href="" statement="Ez egy teszt fogadás">
                    <OddsPreview options={[
                        {label: "Igen", payout: "2x"},
                        {label: "Nem", payout: "2x"},
                    ]}/>
                </BetCardPreview>
                <BetCardPreview closingLabel="2026.11.01" expiryDate="2026.11.01" groupLabel="dolgok" href="" statement="Ez egy teszt fogadás">
                    <OddsPreview options={[
                        {label: "Igen", payout: "2x"},
                        {label: "Nem", payout: "2x"},
                    ]}/>
                </BetCardPreview>
                <BetCardPreview closingLabel="2026.11.01" expiryDate="2026.11.01" groupLabel="dolgok" href="" statement="Ez egy teszt fogadás">
                    <OddsPreview options={[
                        {label: "Igen", payout: "2x"},
                        {label: "Nem", payout: "2x"},
                    ]}/>
                </BetCardPreview>
                <BetCardPreview closingLabel="2026.11.01" expiryDate="2026.11.01" groupLabel="dolgok" href="" statement="Mennyit fog késni Zsombor hétfőn">
                    <SliderPreview value={10} label="várható késés" maximum={120} minimum={0} unit="perc"/>
                </BetCardPreview>
            </div>
        </HomeLayout>
    );
}