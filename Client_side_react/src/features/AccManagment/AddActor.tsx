import { SetStateAction, useState } from 'react';
import { useStack } from '../../contexts/Stack';
import AddModel from './AddModal';

const FilterComponent = () => {
    const [selectedOption, setSelectedOption] = useState('user');
    const stack = useStack();

    const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedOption(event.target.value);
    };

    const handleAddUser = () => {
        stack.push(<AddModel HideModal={() => stack.pop()} selectedOption={selectedOption} />);
    };

    return (
        <div className="flex justify-center self-end mr-20">
            <select
                id="account-type"
                className="rounded-lg shadow-sm text-gray-800 py-2 px-4 mb-2"
                value={selectedOption}
                onChange={handleOptionChange}
            >
                <option value="user">User</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
                <option value="entreprise">Entreprise</option>
                <option value="contentCreator">Content Creator</option>
            </select>
            <button
                className=" text-white bg-[#3699ff] font-semibold py-2 px-2 rounded-lg shadow-sm"
                onClick={handleAddUser}
            >
                Create account
            </button>
        </div>
    );
};

export default FilterComponent;

