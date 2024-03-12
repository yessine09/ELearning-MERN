import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
export default function Drowpdown() {
  return (
    <div>
      




    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
        
           <img src='/assets/icons/trois.svg'></img>
                    
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-blue-400' : 'text-gray-400',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Weekly
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-blue-400' : 'text-gray-400',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Monthly
                </a>
              )}
            </Menu.Item>
            
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>



    </div>
  )
}
