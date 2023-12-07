const Sidebar = (props: { sidebarActive: any }) => {
  return (
    <nav id="sidebar" className={!props.sidebarActive ? 'active' : ''}>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <a href="#">
            <img src="/images/home.svg" alt="" /><span>Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/price_architectecture.svg" alt="" />
            <span> Price Architectecture</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/intregrated_strategy.svg" alt="" />
            <span>Intregrated Strategy</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/reports.svg" alt="" />
            <span>Reports</span>
          </a>
        </li>
      </ul>

    </nav>
  )
}

export default Sidebar