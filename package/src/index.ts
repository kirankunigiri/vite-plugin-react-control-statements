import type { ReactNode } from "react";

// Export plugin
export { default } from "./plugin";

// Global Types for Control Statements
declare global {
	function If(props: {
		condition: boolean,
		children: ReactNode;
	}): any;

	function Choose(props: {
		children: ReactNode;
	}): any;

	function When(props: {
		condition: boolean,
		children: ReactNode;
	}): any;

	function Otherwise(props: {
		children: ReactNode;
	}): any;
}

export {};
