import React, {useState, useEffect} from 'react'
import AddButton from '../add_btn/add_btn';
import UserMenu from '../user_menu/user_menu';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import './nav.css';

function Nav(props) {
    const [dark, setDark] = useState(false);

    function handleDark(){
        setDark(!dark);
    }

    useEffect(() => {
        if(dark){
            document.documentElement.classList.add('dark');
            document.querySelector('.mode-switch').classList.add('active');
        }
        else{
            document.documentElement.classList.remove('dark');
            document.querySelector('.mode-switch').classList.remove('active');
        }
    }, [dark])

    return (
        <div className='nav'>

            <div className="nav-left">
                <p className="nav-name">Dashboard</p>
            </div>

            <div className="nav-right">

                {props.user && <AddButton setData={props.setData} setSelectedTitle={props.setSelectedFile}></AddButton>}

                <button className="mode-switch" title="Switch Theme" onClick={handleDark} >
                    <svg className="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="28" height="28" viewBox="0 0 24 24">
                        <defs></defs>
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                </button>

                {props.user && <UserMenu setUser={props.setUser} />}

             </div>
        </div>
    )
}

export default Nav;
