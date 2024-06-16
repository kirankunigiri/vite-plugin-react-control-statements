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

export const If: FunctionComponent<IfProps> = () => null;

export const Choose: FunctionComponent<ChooseProps> = () => null;

export const When: FunctionComponent<WhenProps> = () => null;

export const Otherwise: FunctionComponent<OtherwiseProps> = () => null;
