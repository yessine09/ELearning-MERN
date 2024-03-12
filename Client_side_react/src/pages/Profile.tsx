import Button from '../components/Button';
import { useAuth } from '../contexts/Auth';
import { useStack } from '../contexts/Stack';
import AddModel from '../features/AccManagment/AddModal';
import SelectRole from '../features/AccManagment/roles';

type Role = {
  id: string;
  name: string;
  description: string;
};

export default function ProfilePage() {
  const { logoutUser } = useAuth();
  const stack = useStack();

  const showModal = () => {
    console.log('show modal');
    stack.push(<AddModel HideModal={() => { stack.pop() }} selectedOption={'users'} />);
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center">
      <h1 className="text-sm font-bold capitalize text-gray-900">{ }</h1>
      <Button type="button" clickHandler={showModal}>
        <span className="text-sm font-bold capitalize text-purple-100">logout</span>
      </Button>

      <Button type="button" clickHandler={logoutUser}>
        <span className="text-sm font-bold capitalize text-purple-100">logout</span>
      </Button>

      <SelectRole onSelect={function (role: { _id: string; name: string; resources: string[]; createdAt: string; updatedAt: string; }): void {
        throw new Error('Function not implemented.');
      }} />
    </div>
  );
}
