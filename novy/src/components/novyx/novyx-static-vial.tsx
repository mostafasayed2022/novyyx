import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import styles from "./novyx-static-vial.module.css";

type NovyxStaticVialProps = {
  className?: string;
  priority?: boolean;
  sizes: string;
};

export function NovyxStaticVial({ className, priority = false, sizes }: NovyxStaticVialProps) {
  return (
    <div className={cn("relative aspect-[1009/1559] h-full max-w-full", className)}>
      <Image
        src="/products/novyx-ghk-cu-vial.png"
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-contain drop-shadow-[0_28px_28px_rgba(23,60,112,0.28)]", styles.float)}
      />
    </div>
  );
}
