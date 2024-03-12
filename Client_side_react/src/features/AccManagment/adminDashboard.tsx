import { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../helpers/AssetHelpers";
import List from "./List";
import { getAllRoles, getAllUsers, getAllUsersByRole } from "../../api/crudServices";
import AdminSideBar from "./AdminSideBar";
import FilterByRole from "./Filter";
import FilterComponent from "./AddActor";
import Cookies from "js-cookie";
import { getShaperById } from "../../api/enrollment";
import SearchBar from "./SearchBar";
import Drop from "../../pages/shaperDashboard/components/projectManagment/DropdownMenu";


interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function Dashboard() {
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const [loading, setLoading] = useState<boolean>(false);

    const [user, setUser] = useState<any>({});

    try {
        const userId = Cookies.get('userId');
        useEffect(() => {
            const fetchUser = async () => {
                const response = await getShaperById(userId);
                setUser(response);
            };
            fetchUser();
        }, [userId]);

    } catch (error) {
        console.error('Error fetching users:', error);
    }

    useEffect(() => {
        async function fetchRolesAndUsers() {
            try {
                const rolesResponse = await getAllRoles();
                setRoles(rolesResponse.data.roles.map((role: { name: string }) => role.name));

                const usersResponse = await getAllUsers();
                const usersWithIds = usersResponse.data.users.map((user: User) => ({ ...user, id: user.id }));
                setUsers(usersWithIds);
                setFilteredUsers(usersWithIds); // set the initial filtered users to all users
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        setLoading(true);
        fetchRolesAndUsers();
    }, []);

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const roleName = event.target.value;
        setSelectedRole(roleName);
        const rolesResponse = await getAllRoles();
        const roleId = rolesResponse.data.roles.find((role: any) => role.name === roleName)._id;
        let usersData;
        try {
            if (roleId) {
                const response = await getAllUsersByRole(roleId);
                usersData = response.data.users.map((user: User) => ({ ...user, id: user.id }));
            } else {
                // roleId is undefined, so set usersData to an empty array
                usersData = [];
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setFilteredUsers(usersData);
    };



    const headers = [
        {
            key: 'firstName',
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            key: 'lastName',
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'createdAt',
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString();
            },
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
    );
    return (
        <div className='flex h-screen bg-cover bg-repeat-y '>
            <AdminSideBar />
            <div className="px-20 py-4 flex-1 flex flex-col h-fit items-center bg-gray-100">
                <div>
                    <div className='m-[1%] flex items-center' style={{ marginLeft: '80px' }}>
                        <img src={toAbsoluteUrl('/assets/icons/home.svg')} />
                        <div className='ml-2 font-segoe-ui text-lg text-darkBlue opacity-90 '>Admin Dashboad</div>
                    </div>

                    <div className="flex items-center">
                        <h1 style={{ color: '#05445E', marginLeft: '75px', marginTop: '-30px', fontFamily: 'Segoe UI', fontSize: '20px' }}>Accounts Managment Dashboard<div className="separator " style={{
                            textDecoration: '  underline double ', marginLeft: '185px', marginTop: '-8px',
                            flexGrow: '', borderBottom: '1px solid #D3D3D3 ', width: '700px', fontWeight: 'bolder'

                        }}></div> </h1>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px', marginLeft: '20px' }}>
                            <div style={{
                                boxShadow: '3px 3px 3px #0000003D',
                                backgroundColor: '#ffffff',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                outlineColor: '#fefefe',
                                border: '',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center', marginRight: '90px'
                            }}>
                                <img src={toAbsoluteUrl('assets/icons/message.svg')}></img>
                            </div>
                            <div className='' style={{ display: 'flex', alignItems: 'center', marginLeft: '-70px' }}>
                                <div style={{
                                    boxShadow: '3px 3px 3px #0000003D',
                                    backgroundColor: '#ffffff',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    outlineColor: '#fefefe',
                                    border: '',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img src={toAbsoluteUrl('assets/icons/ring.svg')}></img>
                                </div></div>

                        </div>


                    </div>
                    <div className='' style={{ marginLeft: '75px' }}>
                        {/*begin::Symbol*/}

                        <div className='flex items-center'>
                            <div className='symbol symbol-50px mt-6 mr-4'>

                                <img
                                    src={toAbsoluteUrl('assets/images/logos/logoo.png')}
                                    alt=''
                                    className='w-[80px] h-[80px] m-2 rounded-full object-cover'
                                />
                            </div>
                            <div className='flex flex-col'>

                                <div className='flex items-center' style={{ marginTop: '25px' }}>
                                    <h1 className='text-2xl font-bold ' style={{ color: '#05445e' }}>Admin Shape</h1>

                                    <img style={{ marginTop: '4px', marginLeft: '10px' }} src=''></img>
                                </div>
                                <div className='flex items-center'>
                                    <img src={toAbsoluteUrl('assets/icons/mail.svg')} />
                                    <span className='  mb-1' style={{ fontSize: '15px', marginTop: '6px', color: '#6b909e', fontFamily: 'Segoe UI', marginLeft: '10px' }}>{user.email}</span>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='flex flex-col justify-between items-center'>
                    <div className="flex justify-between w-[45%]">

                        <FilterByRole roles={roles} onFilter={handleRoleChange} />
                    </div>
                    <div className="flex items-center mt-12 mx-12" >
                        <span style={{ color: '#189AB4', fontFamily: 'Segoe UI', fontSize: '24px', fontWeight: '700' }}>Users</span>
                        <SearchBar />
                        <div className="flex items-center justify-between">
                            <Drop />

                            <a href="#InProgress"><div className="ml-10 mr-3 font-font text-[18px] font-[600] text-[#189AB4]" > Shapers </div></a>
                            <a href="#Review"><div className="mx-3 font-font text-[18px] font-[600] text-[#189AB4]" > Mentors </div></a>
                            <a href="#Closed"><div className="mx-3 font-font text-[18px]  font-[600] text-[#189AB4]" > Business </div></a>
                        </div>

                    </div>
                    <FilterComponent />
                    <List
                        data={paginatedData}
                        headers={headers}
                        totalPages={Math.ceil(filteredUsers.length / pageSize)}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        pageSize={pageSize}
                        canDelete={true}
                        canUpdate={true}
                        canCreate={true}
                        rowKey="id"
                    />

                </div>
            </div>
        </div>
    )
}
