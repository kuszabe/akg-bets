import { Loading, ParentComponent } from "solid-js";

export const Center: ParentComponent = (props) => (
    <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', 'justify-content': 'center', height: '100%', width: '100%' }}>
        {props.children}
    </div>
)

export const darkMode = () => window.matchMedia("(prefers-color-scheme: dark)").matches