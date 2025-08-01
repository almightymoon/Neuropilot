import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils';
export const Card = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('rounded-lg border border-gray-200 bg-white p-6 shadow-sm', className), ...props, children: children }));
});
Card.displayName = 'Card';
export const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex flex-col space-y-1.5 p-6', className), ...props, children: children }));
});
CardHeader.displayName = 'CardHeader';
export const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("h3", { ref: ref, className: cn('text-lg font-semibold leading-none tracking-tight', className), ...props, children: children }));
});
CardTitle.displayName = 'CardTitle';
export const CardContent = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('p-6 pt-0', className), ...props, children: children }));
});
CardContent.displayName = 'CardContent';
//# sourceMappingURL=card.js.map