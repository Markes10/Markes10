self.__BUILD_MANIFEST = {
  __rewrites: {
    afterFiles: [],
    beforeFiles: [
      {
        source: '/Markes10//_next/:path+',
        destination: '/Markes10/_next/:path+',
      },
    ],
    fallback: [],
  },
  sortedPages: ['/_app', '/_error'],
};
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
