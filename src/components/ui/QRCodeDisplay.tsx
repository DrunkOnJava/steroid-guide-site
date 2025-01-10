/**
 * @fileoverview QRCodeDisplay component for generating shareable QR codes
 * @project     Steroid Guide Site
 * @module      components/ui/QRCodeDisplay
 */

import { QRCodeSVG } from "qrcode.react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

type QRCodeDisplayProps = {
  url: string;
  title?: string;
  onClose?: () => void;
  className?: string;
};

const QRCodeDisplay = ({
  url,
  title = "Scan to view schedule",
  onClose,
  className,
}: QRCodeDisplayProps) => {
  return (
    <div
      className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ${className}`}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="self-end p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}

      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>

      <div className="p-4 bg-white rounded">
        <QRCodeSVG
          value={url}
          size={200}
          level="H"
          includeMargin
          className="dark:bg-white"
        />
      </div>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Use your phone's camera to scan the QR code
      </p>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="mt-4"
      >
        Copy Link
      </Button>
    </div>
  );
};

export type { QRCodeDisplayProps };
export { QRCodeDisplay };
