/**
 * @fileoverview PrintControls component for print and share buttons
 * @project     Steroid Guide Site
 * @module      components/ui/PrintControls
 */

import {
  PrinterIcon,
  ShareIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./Button";

type PrintControlsProps = {
  onPrint?: () => void;
  onShare?: () => void;
  onShowQR?: () => void;
  className?: string;
};

const PrintControls = ({
  onPrint = () => window.print(),
  onShare,
  onShowQR,
  className,
}: PrintControlsProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="secondary"
        size="sm"
        onClick={onPrint}
        className="print:hidden"
      >
        <PrinterIcon className="w-4 h-4 mr-1" />
        Print Schedule
      </Button>

      {onShare && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onShare}
          className="print:hidden"
        >
          <ShareIcon className="w-4 h-4 mr-1" />
          Share
        </Button>
      )}

      {onShowQR && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onShowQR}
          className="print:hidden"
        >
          <QrCodeIcon className="w-4 h-4 mr-1" />
          Show QR Code
        </Button>
      )}
    </div>
  );
};

export type { PrintControlsProps };
export { PrintControls };
