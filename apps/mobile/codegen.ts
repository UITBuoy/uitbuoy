import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:3001/graphql",
	documents: "src/**/*.graphql",
	// ignoreNoDocuments: true,
	generates: {
		"src/gql/graphql.ts": {
			// preset: "client",
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				withHooks: true,
				withRefetchFn: true,
				withMutationFn: true,
			},
			// config: {
			// 	enumsAsTypes: true,
			// 	futureProofEnums: true,
			// },
		},
	},
};

export default config;
