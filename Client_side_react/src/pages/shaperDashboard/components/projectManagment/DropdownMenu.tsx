
import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { filterContext } from '../../../shaperDashboard/components/projectManagment/ProjectManagment';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
  const { filterOption, setfilterOption } = useContext(filterContext);
  const handleOptionClick = (option: string) => {
    setfilterOption(option);
  }
  return (
    <Menu as="div" className=" ml-20 relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex  justify-center   px-3 py-2    " style={{ color: '#189AB4', fontFamily: 'Segoe UI', fontSize: '23px', }}>
          Filtre

        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 left-2 z-15 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => handleOptionClick('status')}
                  className={classNames(
                    active ? 'bg-gray-100 text-blue-900' : 'text-gray-400',
                    'block px-4 py-2 z-25'
                  )}
                >
                  Status
                </div>
              )}
            </Menu.Item>
            <Menu.Item >
              {({ active }) => (
                <div
                  onClick={() => handleOptionClick('deadline')}
                  className={classNames(
                    active ? 'bg-gray-100 text-blue-900' : 'text-gray-400',
                    'block px-4 py-2 z-45'
                  )}
                >
                  Deadline
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

