const jestConfig = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': "babel-jest"
    }
}

export default jestConfig