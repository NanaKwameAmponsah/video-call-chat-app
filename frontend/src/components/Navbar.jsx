import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { BellIcon, BrainIcon, LogOutIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';

const Navbar = () => {

    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");

    const {logoutMutation}= useLogout()

    return <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className= "flex items-center justify-end w-full">
                {/* SHOW THE LOGO ONLY IF WE'RE IN THE CHAT PAGE */}
                {isChatPage && ( 
                    <div className="pl-5">
                        <Link to="/" className="flex items-center gap-2.5">
                            <BrainIcon className="size-9 text-primary"/>
                            <span className= "text03xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                MindSwap
                            </span>
                        </Link>
                    </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
            <Link to={"/notifications"}>
                <button className="btn btn-ghost btn-circle">
                    <BellIcon className="h-6 w-6 text-base-content opacity-70"/>
                </button>
            </Link>

        </div>
        {/*DO LATER */}
        <ThemeSelector />

        <div className="avatar">
            <div className="w-9 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
        </div>
        {/*Logout button , once we log out, the code will refetch the authenticated user  on success and then be navigated to the login page*/}
        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
        </button>


        </div>
    </div>

    </nav>


}

export default Navbar