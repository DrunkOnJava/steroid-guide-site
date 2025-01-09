/**
 * @fileoverview Accessible modal dialog component with transitions
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Modal
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * A reusable modal component built with Headless UI's Dialog component.
 *
 * Core Features:
 * - Smooth enter/exit transitions
 * - Backdrop with click-to-close
 * - Responsive sizing and positioning
 * - Close button with icon
 * - Focus management
 *
 * Accessibility:
 * - Proper ARIA attributes
 * - Keyboard navigation support
 * - Focus trap within modal
 * - Screen reader announcements
 *
 * Visual Design:
 * - Semi-transparent backdrop
 * - Centered content positioning
 * - Smooth animations
 * - Responsive padding and margins
 *
 * Integration Features:
 * - TypeScript props interface
 * - Flexible content rendering
 * - Event handling for close actions
 * - Z-index management
 *
 * @example
 * ```tsx
 * import Modal from './Modal';
 *
 * function ExampleComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>
 *         Open Modal
 *       </button>
 *
 *       <Modal
 *         isOpen={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         title="Example Modal"
 *       >
 *         <div className="p-4">
 *           <p>Modal content goes here</p>
 *         </div>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - @headlessui/react@2.2.0 (Dialog, Transition)
 * - @heroicons/react@2.2.0
 * - react@18.3.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Modern browser with CSS transitions
 * - Parent React application
 * - Proper z-index context
 */

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 dark:shadow-black/20 sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-2xl font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
