import { ReactNode } from 'react';

declare global {
	function If(props: {
		condition: boolean;
		children: ReactNode;
	}): any;
	function Choose(props: {
		children: ReactNode;
	}): any;
	function When(props: {
		condition: boolean;
		children: ReactNode;
	}): any;
	function Otherwise(props: {
		children: ReactNode;
	}): any;
}

export {}
