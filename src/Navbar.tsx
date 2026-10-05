import { Loading } from "solid-js"
import { paths } from "./router"

const Navbar = () => (
    <nav>
        <span>
            <wa-button href={paths.app()} appearance="plain">AKGbets</wa-button>
        </span>
        <span></span>
        <span>
            <wa-button href={paths.app.account()} appearance="plain"><wa-icon name="user"></wa-icon></wa-button>
        </span>
    </nav>
)

export default Navbar