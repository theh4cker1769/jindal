const Header = (props: { toggleSidebarProp: () => void }) => {

    const toggleSidebar = () => {
        props.toggleSidebarProp()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light px-3">
            <div>
                <a href="index.html" className="logo">
                    <img src="/images/logo.svg" alt=""/>
                </a>
            </div>
            <div className="container-fluid">
                <button type="button" id="sidebarCollapse" className="btn" onClick={toggleSidebar}>
                    <img src="/images/Drawer.svg" alt="" />
                    <span className="sr-only">Toggle Menu</span>
                </button>
                <button
                    className="btn btn-dark d-inline-block d-lg-none ml-auto"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <img src="/images/Drawer.svg" alt="" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto align-items-center headerUL">
                        <li className="nav-item active">
                            <img src="/images/profiles.svg" alt="" />
                        </li>
                        <li className="nav-item">
                            <img src="/images/setting.svg" alt="" />
                        </li>
                        <li className="nav-item">
                            <img src="/images/notification.svg" alt="" />
                        </li>
                        <li className="nav-item">
                            <div className="media">
                                <img src="/images/avtar.svg" className="mr-1" alt="..." />
                                <div className="media-body">
                                    <h6 className="mt-0">kumar Saurabh</h6>
                                    21 June 2023, 16:40
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header