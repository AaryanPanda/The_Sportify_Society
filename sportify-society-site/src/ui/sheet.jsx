import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

export const Sheet = Dialog.Root
export const SheetTrigger = Dialog.Trigger

export const SheetContent = React.forwardRef(({ children, className = "", side = "left", ...props }, ref) => {
  const sideStyles = {
    top: "inset-x-0 top-0 h-[50%] w-full",
    bottom: "inset-x-0 bottom-0 h-[50%] w-full",
    left: "inset-y-0 left-0 h-full w-3/4 max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 max-w-sm",
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      <Dialog.Content
        ref={ref}
        className={`fixed z-50 transform rounded-md bg-white p-4 shadow-xl transition-all duration-300 ease-in-out ${sideStyles[side]} ${className}`}
        {...props}
      >
        <div className="flex justify-end">
          <Dialog.Close asChild>
            <button className="text-gray-500 transition hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
        </div>
        <div className="mt-2">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  )
})

SheetContent.displayName = "SheetContent"
