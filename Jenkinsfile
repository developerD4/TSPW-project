pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}

// 1. Connect to GitHub
//         ↓
// 2. Clone/checkout your project
//         ↓
// 3. npm install
//         ↓
// 4. npx playwright test
//         ↓
// 5. Generate test results