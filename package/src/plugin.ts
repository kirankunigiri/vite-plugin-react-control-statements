import type { Plugin } from "vite";

// Remove JSX comments to avoid issues
function removeJSXComments(code: string): string {
	const commentRegex = /{\/\*[\s\S]*?\*\/}/g;
	return code.replace(commentRegex, '');
}

// Transform If statements
function transformIf(code: string) {
	const ifRegex = /<If\s+condition=\{(.+?)}\s*>([\s\S]*?)<\/If>/g;
	return code.replace(ifRegex, (match, condition, content) => {
		return `{${condition} ? (<>${content}</>) : null}`;
	});
}

// Transform Choose/When/Otherwise statements
function transformChoose(code: string): string {
	const chooseRegex = /<Choose>([\s\S]*?)<\/Choose>/g;
	const whenRegex = /<When\s+condition=\{(.+?)}\s*>([\s\S]*?)<\/When>/g;
	const otherwiseRegex = /<Otherwise\s*>([\s\S]*?)<\/Otherwise>/g;

	return code.replace(chooseRegex, (match, chooseContent) => {
		const conditions: string[] = [];
		const contents: string[] = [];
		let otherwiseContent: string | null = null;

		// When Block
		let matchWhen;
		while ((matchWhen = whenRegex.exec(chooseContent))) {
			conditions.push(matchWhen[1]);
			contents.push(`(<>${matchWhen[2]}</>)`);
		}

		// Join when conditions
		const conditionsCode = conditions
				.map((condition, index) => `${condition} ? ${contents[index]}`)
				.join(' : ');

		// Otherwise Block
		const matchOtherwise = otherwiseRegex.exec(chooseContent);
		if (matchOtherwise) {
			otherwiseContent = matchOtherwise[1];
		}

		// If there are conditions, add the otherwiseContent if it exists, otherwise add a default empty fragment
		return conditions.length > 0
				? `{${conditionsCode} : ${otherwiseContent ? `<>${otherwiseContent}</>` : '<></>'}}`
				: `{${otherwiseContent ? `<>${otherwiseContent}</>` : ''}}`;
	});
}

export default function reactControlStatements(): Plugin {
	return {
		name: 'vite:react-control-statements',
		enforce: 'pre',
		transform(_source: string, id: string) {
			// Only transform tsx and jsx files
			if (!/\.(tsx|jsx)$/.test(id)) return null;
			// Transform code
			let transformedCode = removeJSXComments(_source);
			transformedCode = transformIf(transformedCode);
			transformedCode = transformChoose(transformedCode);
			return {
				code: transformedCode,
				map: null,
			};
		},
	};
}
