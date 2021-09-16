import React from 'react'
import { NavLink } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import './side_bar.css';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
function SideBar() {
    return (
        <div className='sidebar'>
 
            <NavLink className="sidebar-link" activeClassName="active" exact to="/">
                <HomeIcon></HomeIcon>
            </NavLink>

            <NavLink className="sidebar-link" activeClassName="active" to="/Charts">
                <TimelineIcon></TimelineIcon>
            </NavLink>

            <NavLink className="sidebar-link" activeClassName="active" to="/Table">
                <TableChartOutlinedIcon></TableChartOutlinedIcon>
            </NavLink>

            <NavLink className="sidebar-link" activeClassName="active" to="/ChartsPage">
                <EqualizerIcon></EqualizerIcon>
            </NavLink>
            <NavLink className="sidebar-link" activeClassName="active" to="/ManagePage">
                <CalendarTodayIcon></CalendarTodayIcon>
            </NavLink>

        </div>
    )
}

export default SideBar;