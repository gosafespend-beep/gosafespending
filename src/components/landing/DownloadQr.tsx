import { QRCodeSVG } from "qrcode.react";
import { DOWNLOAD_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DownloadQrProps {
  className?: string;
  size?: number;
  caption?: string;
}

/**
 * Encodes one URL for both stores. /download?src=qr sends iPhone and Android
 * scanners to their own store, so a single printed or on-screen code serves
 * everyone. Rendered as SVG so it stays sharp and adds no image request.
 */
export const DownloadQr = ({
  className,
  size = 112,
  caption = "Scan with your phone's camera",
}: DownloadQrProps) => (
  <figure className={cn("flex flex-col items-center gap-2", className)}>
    <div className="rounded-xl bg-white p-2.5">
      <QRCodeSVG
        value={`${DOWNLOAD_URL}?src=qr&go=1`}
        size={size}
        level="M"
        marginSize={0}
        title="QR code to download Safe Spend"
      />
    </div>
    <figcaption className="text-xs text-muted-foreground">{caption}</figcaption>
  </figure>
);
