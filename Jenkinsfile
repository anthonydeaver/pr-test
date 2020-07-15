def REPO = env.REPO_URL
  node() {
    def myRepo = checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'Jenkins2Github', url: 'https://github.com/TheWeatherCompany/wsi-media-engage-broadcast-pr-test/']]])
    def serviceName = sh returnStdout: true, script: 'cat package.json | grep name | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' | tr -d \'[[:space:]]\''
    stage('Build') {
      def branch = myRepo.GIT_BRANCH.replaceAll('/','-')
      def Date latestdate = new Date(); 
      VERSION = sh returnStdout: true, script: 'cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' | tr -d \'[[:space:]]\''
      imageTag = "${branch}-${VERSION}.${BUILD_ID}-${latestdate.getTime()}"
      println("name: ${serviceName}")
      println("tag: ${imageTag}")
      docker.withRegistry(REPO, '<repo creds>') {
        DOCKER_IMAGE = docker.build("${serviceName}:${imageTag}")
      }
    }
  }