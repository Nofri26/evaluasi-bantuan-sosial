import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Dropdown = ({ options, value, onChange, placeholder }) => (
    <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {value ? value.name : placeholder}
            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                {options.map((option) => (
                    <Menu.Item key={option.id}>
                        {({ active }) => (
                            <button
                                onClick={() => onChange(option)}
                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                            >
                                {option.name}
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </div>
        </Menu.Items>
    </Menu>
);

export default Dropdown;
