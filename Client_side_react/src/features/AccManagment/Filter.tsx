import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface FilterByRoleProps {
    roles: string[];
    onFilter: (event: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const FilterByRole = ({ roles, onFilter }: FilterByRoleProps) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        onFilter(event);
    };

    return (
        <Menu as="div" className=" ml-20 relative inline-block text-left">

            <div className="flex items-center justify-center space-x-4">
                <select
                    name="role-filter"
                    id="role-filter"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className=" text-[#3699ff] border text-[23px] border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 "
                >
                    <Menu.Button className="inline-flex  justify-center   px-3 py-2    " style={{ color: '#3699ff', fontFamily: 'Segoe UI', fontSize: '23px', }}>
                        Filter
                    </Menu.Button>

                    {roles.map((role, index) => (
                        <Menu.Item >
                            <option key={index} value={role}
                                className={classNames(
                                    'bg-gray-100 text-blue-900 block px-4 py-2 z-45'

                                )}
                            >
                                {role}
                            </option>
                        </Menu.Item >
                    ))}


                </select>
            </div>

        </Menu>
    );
};

export default FilterByRole;
