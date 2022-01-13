module.export = {
	resolve: {
		fallback: {
			path: require.resolve('path-browserify'),
			stream: require.resolve('stream-browserify'),
			crypto: require.resolve('crypto-browserify'),
			http: require.resolve('stream-http'),
			querystring: require.resolve('querystring-es3'),
			url: require.resolve('url/'),
		},
	},
};
