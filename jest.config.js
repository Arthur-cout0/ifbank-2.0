module.exports = {
    preset: 'react-native',
    transform: {},
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@testing-library)/)'
      ],
};