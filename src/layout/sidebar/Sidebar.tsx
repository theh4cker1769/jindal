import React, { useEffect, useState } from "react"
import { RiTriangleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = (props: { sidebarActive: any }) => {

  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(props.sidebarActive)
    setDropdownInteStatState(false)
  }, [props.sidebarActive])

  const [dropdownInteStatState, setDropdownInteStatState] = useState(false)
  const dropdownInteStat = () => {
    setDropdownInteStatState(!dropdownInteStatState)
    setActive(true)
  }

  return (
    <nav className={`sidebar ${active ? 'active' : ''}`}>
      <ul className="list-unstyled components mb-5">
        <li>
          <div className="item">
            <img src="/images/home.svg" alt="" /><span>Home</span>
          </div>
        </li>
        <li>
          <div className="item">
            <img src="/images/price_architectecture.svg" alt="" />
            <span> Price Architectecture</span>
          </div>
        </li>
        <li className="active">
          <div className="item" onClick={dropdownInteStat}>
            <img src="/images/intregrated_strategy.svg" alt="" />
            <span>Intregrated Strategy </span>
            <i className={`${dropdownInteStatState && "active"}`}><RiTriangleFill /></i>
          </div>
          {dropdownInteStatState &&
            <div className="dropdow-content">
              <span>
                <NavLink to={'/client-configurations'} className={({ isActive }) => isActive ? "active" : ""}>
                  Client Configurations
                </NavLink>
              </span>
              <span>
                <NavLink to={'elasticity-pricing-track'} className={({ isActive }) => isActive ? "active" : ""}>
                  Elasticity Pricing Track
                </NavLink>
              </span>
              <span><NavLink to={'/test2'}>Elasticity Pricing Track <br /> Model Details</NavLink></span>
            </div>
          }
        </li>
        <li>
          <div className="item">
            <img src="/images/reports.svg" alt="" />
            <span>Reports</span>
          </div>
        </li>
      </ul>

    </nav>
  )
}

export default Sidebar