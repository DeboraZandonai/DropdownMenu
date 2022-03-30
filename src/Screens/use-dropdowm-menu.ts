/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, createRef, useEffect, useMemo } from 'react';

interface ButtonProps<ButtonElement extends HTMLElement>
	extends Pick<
		React.DetailedHTMLProps<React.ButtonHTMLAttributes<ButtonElement>, ButtonElement>,
		'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
	> {
	ref: React.RefObject<ButtonElement>;
}

export interface DropdownMenuOptions {
	disableFocusFirstItemOnClick?: boolean;
}

interface DropdownMenuResponse<ButtonElement extends HTMLElement> {
	readonly buttonProps: ButtonProps<ButtonElement>;
	readonly itemProps: {
		onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
		tabIndex: number;
		role: string;
		ref: React.RefObject<HTMLAnchorElement>;
	}[];
	readonly isOpen: boolean;
	readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	readonly moveFocus: (itemIndex: number) => void;
}

export default function useDropdownMenu<ButtonElement extends HTMLElement = HTMLButtonElement>(
	itemCount: number,
	options?: DropdownMenuOptions
): DropdownMenuResponse<ButtonElement> {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const currentFocusIndex = useRef<number | null>(null);
	const firstRun = useRef(true);
	const clickedOpen = useRef(false);

	const buttonRef = useRef<ButtonElement>(null);
	const itemRefs = useMemo<React.RefObject<HTMLAnchorElement>[]>(
		() => Array.from({ length: itemCount }, () => createRef<HTMLAnchorElement>()),
		[itemCount]
	);

	const isKeyboardEvent = (e: React.KeyboardEvent | React.MouseEvent): e is React.KeyboardEvent =>
		(e as React.KeyboardEvent).key !== undefined;

	const moveFocus = (itemIndex: number): void => {
		currentFocusIndex.current = itemIndex;
		itemRefs[itemIndex].current?.focus();
	};

	useEffect(() => {
		if (firstRun.current) {
			firstRun.current = false;
			return;
		}

		if (isOpen && !options?.disableFocusFirstItemOnClick) {
			moveFocus(0);
		} else if (!isOpen) {
			clickedOpen.current = false;
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const removalTracker = {
			removed: false,
		};

		const handleEveryClick = (event: MouseEvent): void => {

			setTimeout(() => {
				if (!(event.target instanceof Element)) {
					return;
				}

				if (event.target.closest('[role="menu"]') instanceof Element) {
					return;
				}

				setIsOpen(false);
			}, 10);
		};

		setTimeout(() => {
			if (removalTracker.removed) {
				return;
			}

			document.addEventListener('click', handleEveryClick);
		}, 1);

		return (): void => {
			removalTracker.removed = true;

			document.removeEventListener('click', handleEveryClick);
		};
	}, [isOpen]);

	useEffect(() => {
		const disableArrowScroll = (event: KeyboardEvent): void => {
			if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
				event.preventDefault();
			}
		};

		document.addEventListener('keydown', disableArrowScroll);

		return (): void => document.removeEventListener('keydown', disableArrowScroll);
	}, [isOpen]);


	const buttonListener = (e: React.KeyboardEvent | React.MouseEvent): void => {

		if (isKeyboardEvent(e)) {
			const { key } = e;

			if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(key)) {
				return;
			}

			if ((key === 'Tab' || key === 'ArrowDown') && clickedOpen.current && isOpen) {
				e.preventDefault();
				moveFocus(0);
			}

			if (key === 'Enter' || key === ' ') {
				e.preventDefault();
				setIsOpen(true);
			}

			if (key === 'Escape') {
				e.preventDefault();
				setIsOpen(false);
			}
		} else {
			if (options?.disableFocusFirstItemOnClick) {
				clickedOpen.current = !isOpen;
			}

			setIsOpen(!isOpen);
		}
	};

	const itemListener = (e: React.KeyboardEvent<HTMLAnchorElement>): void => {
		const { key } = e;

		if (['Tab', 'Shift', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', ' '].includes(key)) {
			let newFocusIndex = currentFocusIndex.current;


			if (key === 'Escape') {
				setIsOpen(false);
				buttonRef.current?.focus();
				return;
			} else if (key === 'Tab') {
				setIsOpen(false);
				return;
			} else if (key === 'Enter' || key === ' ') {
				if (!e.currentTarget.href) {
					e.currentTarget.click();
				}

				setIsOpen(false);
				return;
			}

			if (newFocusIndex !== null) {
				if (key === 'ArrowUp') {
					newFocusIndex -= 1;
				} else if (key === 'ArrowDown') {
					newFocusIndex += 1;
				}

				if (newFocusIndex > itemRefs.length - 1) {
					newFocusIndex = 0;
				} else if (newFocusIndex < 0) {
					newFocusIndex = itemRefs.length - 1;
				}
			}

			if (newFocusIndex !== null) {
				moveFocus(newFocusIndex);
			}

			return;
		}

		if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(key)) {
			const index = itemRefs.findIndex(
				(ref) =>
					ref.current?.innerText?.toLowerCase().startsWith(key.toLowerCase()) ||
					ref.current?.textContent?.toLowerCase().startsWith(key.toLowerCase()) ||
					ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(key.toLowerCase())
			);

			if (index !== -1) {
				moveFocus(index);
			}
		}
	};

	const buttonProps: ButtonProps<ButtonElement> = {
		onKeyDown: buttonListener,
		onClick: buttonListener,
		tabIndex: 0,
		ref: buttonRef,
		role: 'button',
		'aria-haspopup': true,
		'aria-expanded': isOpen,
	};

	const itemProps = Array.from({ length: itemCount }, (_ignore, index) => ({
		onKeyDown: itemListener,
		tabIndex: -1,
		role: 'menuitem',
		ref: itemRefs[index],
	}));

	return { buttonProps, itemProps, isOpen, setIsOpen, moveFocus } as const;
}