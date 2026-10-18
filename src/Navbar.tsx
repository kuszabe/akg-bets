import { Loading } from "solid-js"
import { paths } from "./router"

const Navbar = () => (
    <nav>
        <span>
            <b style="font-size: 1.3rem;">AKGbets</b>
        </span>
        <span>
            <wa-button appearance="plain"><span style="color: var(--wa-color-text-normal);">310 zed</span></wa-button>
            <wa-button href={paths.account()} appearance="plain"><wa-icon name="user"></wa-icon></wa-button>
        </span>
    </nav>
)

export default Navbar