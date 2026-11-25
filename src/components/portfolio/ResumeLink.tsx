import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { profile } from "@/lib/portfolio-data";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "download"> & { children: ReactNode };

/**
 * Downloads the resume PDF. Inside an embedded frame (e.g. the editor preview),
 * browsers block downloads, so it opens the PDF in a new tab instead.
 */
export function ResumeLink({ children, onClick, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    let framed = false;
    try {
      framed = window.self !== window.top;
    } catch {
      framed = true;
    }
    if (framed) {
      e.preventDefault();
      window.open(profile.resumeUrl, "_blank", "noopener");
    }
  };

  return (
    <a
      {...rest}
      href={profile.resumeUrl}
      download={profile.resumeFileName}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
