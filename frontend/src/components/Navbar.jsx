import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { BellIcon, BrainIcon, LogOutIcon, UserIcon, SettingsIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';
import ProfileEditModal from './ProfileEditModal';
import { useState } from 'react';

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const { logoutMutation } = useLogout();

    return (
        <>
            <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end w-full">
                        {/* SHOW THE LOGO ONLY IF WE'RE IN THE CHAT PAGE */}
                        {isChatPage && ( 
                            <div className="pl-5">
                                <Link to="/" className="flex items-center gap-2.5">
                                    <BrainIcon className="size-9 text-primary"/>
                                    <span className="text03xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                        MindSwap
                                    </span>
                                </Link>
                            </div>
                        )}

                        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                            <Link to={"/notifications"}>
                                <button className="btn btn-ghost btn-circle">
                                    <BellIcon className="h-6 w-6 text-base-content opacity-70"/>
                                </button>
                            </Link>
                        </div>

                        {/* Theme Selector */}
                        <ThemeSelector />

                        {/* Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 rounded-full">
                                    <img src={authUser?.profilePic} alt="User Avatar" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <button 
                                        onClick={() => setIsProfileModalOpen(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <UserIcon className="h-4 w-4" />
                                        Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={logoutMutation}
                                        className="flex items-center gap-2 text-error"
                                    >
                                        <LogOutIcon className="h-4 w-4" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Edit Modal */}
            <ProfileEditModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                authUser={authUser}
            />
        </>
    );
};




export default Navbar