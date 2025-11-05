"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import type { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof ToastProvider> & {
  toastOptions?: Partial<ToastProps>;
};

export function Toaster({ toastOptions, ...props }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider {...props}>
      {toasts.map(({ id, title, description, action, ...toastProps }) => (
        <Toast key={id} {...toastOptions} {...toastProps}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
