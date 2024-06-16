import type { ReactNode, FC, FunctionComponent } from "react";

// Export plugin
export { default } from "./plugin";

// Global Types for Control Statements


type IfProps = {
	condition: boolean;
	children: ReactNode;
};

type ChooseProps = {
	children: ReactNode;
};

type WhenProps = {
	condition: boolean;
	children: ReactNode;
};

type OtherwiseProps = {
	children: ReactNode;
};

/** Render conditionally based on the condition prop */
export const If: FunctionComponent<IfProps> = () => null;

/** Container component for When/Otherwise components */
export const Choose: FunctionComponent<ChooseProps> = () => null;

/** Render conditionally based on the condition prop inside a Choose component */
export const When: FunctionComponent<WhenProps> = () => null;

/** Render conditionally as the default case inside a Choose component */
export const Otherwise: FunctionComponent<OtherwiseProps> = () => null;
