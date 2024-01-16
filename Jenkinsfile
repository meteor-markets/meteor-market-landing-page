pipeline {
     agent {
         label 'reactjs'
     }
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "CI=false npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "rsync -rav --delete build/* administrator@172.16.0.235:/var/www/html/react-pipeline/ecommerce-mobileapplication-21074014-reactjs-admin/"
                sh "echo ecommadmin.mobiloitte.org"
                
            }
        }
    }
}
