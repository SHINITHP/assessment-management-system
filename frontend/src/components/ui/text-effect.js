'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
const defaultStaggerTimes = {
    char: 0.03,
    word: 0.05,
    line: 0.1,
};
const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
    exit: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};
const defaultItemVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
    exit: { opacity: 0 },
};
const presetVariants = {
    blur: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: 'blur(12px)' },
            visible: { opacity: 1, filter: 'blur(0px)' },
            exit: { opacity: 0, filter: 'blur(12px)' },
        },
    },
    'fade-in-blur': {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            exit: { opacity: 0, y: 20, filter: 'blur(12px)' },
        },
    },
    scale: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0 },
        },
    },
    fade: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
        },
    },
    slide: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
        },
    },
};
const AnimationComponent = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
    const content = per === 'line' ? (_jsx(motion.span, { variants: variants, className: 'block', children: segment })) : per === 'word' ? (_jsx(motion.span, { "aria-hidden": 'true', variants: variants, className: 'inline-block whitespace-pre', children: segment })) : (_jsx(motion.span, { className: 'inline-block whitespace-pre', children: segment.split('').map((char, charIndex) => (_jsx(motion.span, { "aria-hidden": 'true', variants: variants, className: 'inline-block whitespace-pre', children: char }, `char-${charIndex}`))) }));
    if (!segmentWrapperClassName) {
        return content;
    }
    const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';
    return (_jsx("span", { className: cn(defaultWrapperClassName, segmentWrapperClassName), children: content }));
});
AnimationComponent.displayName = 'AnimationComponent';
const splitText = (text, per) => {
    if (per === 'line')
        return text.split('\n');
    return text.split(/(\s+)/);
};
const hasTransition = (variant) => {
    if (!variant)
        return false;
    return (typeof variant === 'object' && 'transition' in variant);
};
const createVariantsWithTransition = (baseVariants, transition) => {
    if (!transition)
        return baseVariants;
    const { exit: _, ...mainTransition } = transition;
    return {
        ...baseVariants,
        visible: {
            ...baseVariants.visible,
            transition: {
                ...(hasTransition(baseVariants.visible)
                    ? baseVariants.visible.transition
                    : {}),
                ...mainTransition,
            },
        },
        exit: {
            ...baseVariants.exit,
            transition: {
                ...(hasTransition(baseVariants.exit)
                    ? baseVariants.exit.transition
                    : {}),
                ...mainTransition,
                staggerDirection: -1,
            },
        },
    };
};
export function TextEffect({ children, per = 'word', as = 'p', variants, className, preset = 'fade', delay = 0, speedReveal = 1, speedSegment = 1, trigger = true, onAnimationComplete, onAnimationStart, segmentWrapperClassName, containerTransition, segmentTransition, style, }) {
    const segments = splitText(children, per);
    const MotionTag = motion[as];
    const baseVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: defaultItemVariants };
    const stagger = defaultStaggerTimes[per] / speedReveal;
    const baseDuration = 0.3 / speedSegment;
    const customStagger = hasTransition(variants?.container?.visible ?? {})
        ? (variants?.container?.visible).transition
            ?.staggerChildren
        : undefined;
    const customDelay = hasTransition(variants?.container?.visible ?? {})
        ? (variants?.container?.visible).transition
            ?.delayChildren
        : undefined;
    const computedVariants = {
        container: createVariantsWithTransition(variants?.container || baseVariants.container, {
            staggerChildren: customStagger ?? stagger,
            delayChildren: customDelay ?? delay,
            ...containerTransition,
            exit: {
                staggerChildren: customStagger ?? stagger,
                staggerDirection: -1,
            },
        }),
        item: createVariantsWithTransition(variants?.item || baseVariants.item, {
            duration: baseDuration,
            ...segmentTransition,
        }),
    };
    return (_jsx(AnimatePresence, { mode: 'popLayout', children: trigger && (_jsxs(MotionTag, { initial: 'hidden', animate: 'visible', exit: 'exit', variants: computedVariants.container, className: className, onAnimationComplete: onAnimationComplete, onAnimationStart: onAnimationStart, style: style, children: [per !== 'line' ? _jsx("span", { className: 'sr-only', children: children }) : null, segments.map((segment, index) => (_jsx(AnimationComponent, { segment: segment, variants: computedVariants.item, per: per, segmentWrapperClassName: segmentWrapperClassName }, `${per}-${index}-${segment}`)))] })) }));
}
