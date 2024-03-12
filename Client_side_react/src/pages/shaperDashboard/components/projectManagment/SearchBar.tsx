import { useEffect, useRef, useState } from "react";
import { getTasksByClient } from "../../../../api/tasks";
import Cookies from "js-cookie";

function SearchBar() {
    const userId = Cookies.get("userId");
    const [searchQuery, setSearchQuery] = useState("");
    const [matchingTasks, setMatchingTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getTasksByClient(userId);
            setMatchingTasks(tasks);
        };
        fetchTasks();
    }, [userId]);

    useEffect(() => {
        const filteredTasks = matchingTasks.filter((task) => {
            const query = searchQuery.toLowerCase().trim();
            return (
                task.title.toLowerCase().includes(query) && query.length > 0
            );
        });
        setFilteredTasks(filteredTasks);
    }, [matchingTasks, searchQuery]);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [menuRef]);

    return (
        <div className=" ">
            <form className="max-w-sm px-4 ml-20 relative inline-block text-left">
                <div className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ marginLeft: "360px", color: "#05445E" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        style={{
                            height: "40px",
                            fontSize: "px",
                            width: "400px",
                            boxShadow: "1px 2px 2px #0000003D",
                            color: "#05445E",
                        }}
                        type="text"
                        placeholder="Search Tasks "
                        className="w-full pl-3  text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={handleMenuToggle}
                    />
                </div>
            </form>
            {menuOpen && filteredTasks.length > 0 && (
                <div
                    ref={menuRef}
                    className="relative z-10 left-24 w-[400px] bottom-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >

                    {/* <div className="absolute z-50 right-0 mt-0 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
                    <div className="">
                        {filteredTasks.map((task) => (
                            <div key={task._id} className="py-1 px-2 hover:bg-gray-100">
                                {task.title}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
