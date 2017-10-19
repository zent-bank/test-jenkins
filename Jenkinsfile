pipeline{
    agent any
    stages {
        stage('build'){
            steps {
                sh 'PATH=/sbin:/usr/sbin:/usr/bin:/usr/local/bin ' +
                   'npm install'
            }
        }
        stage('deploy'){
            steps {
                sh 'PATH=/sbin:/usr/sbin:/usr/bin:/usr/local/bin ' +
                   'pm2 start index.js'
            }
        }
    }
}
