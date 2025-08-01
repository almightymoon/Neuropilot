import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils';
export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsx("label", { className: "text-sm font-medium text-gray-700", children: label })), _jsx("input", { className: cn('flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-red-500 focus-visible:ring-red-500', className), ref: ref, ...props }), error && (_jsx("p", { className: "text-sm text-red-600", children: error }))] }));
});
Input.displayName = 'Input';
//# sourceMappingURL=input.js.map