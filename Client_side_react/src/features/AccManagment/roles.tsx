import React, { useState, useEffect } from "react";
import { getAllRoles } from "../../api/crudServices";

type Role = {
    _id: string;
    name: string;
    resources: string[];
    createdAt: string;
    updatedAt: string;
};

type Props = {
    onSelect: (role: Role) => void;
};

const SelectRole = ({ onSelect }: Props) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await getAllRoles();
            console.log("Roles:", roles);
            setRoles(roles.data.roles);
        };

        fetchRoles();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const roleId = event.target.value;
        const role = roles.find((r) => r._id === roleId);

        if (role) {
            setSelectedRole(role);
            onSelect(role);
        }
    };

    if (!roles || roles.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <label htmlFor="role-select">Select a role:</label>
            <select id="role-select" value={selectedRole?._id} onChange={handleSelectChange}>
                <option value="">-- Select --</option>
                {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                        {role.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectRole;
