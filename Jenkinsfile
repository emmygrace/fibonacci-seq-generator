pipeline {
    agent {
        docker {
            image 'node'
            args '-p 8080:8080'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'npm run build'
                archiveArtifacts artifacts: 'build/**, server.js', fingerprint: true
                input message: 'Deploy complete. Please Click "Proceed" to continue.'
            }
        }
    }
}