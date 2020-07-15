node('master') {
  def myRepo = checkout scm
  def serviceName = sh returnStdout: true, script: 'cat package.json | grep name | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' | tr -d \'[[:space:]]\''
  stage('Build') {
    def branch = myRepo.GIT_BRANCH.replaceAll('/','-')
    def Date latestdate = new Date(); 
    VERSION = sh returnStdout: true, script: 'cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' | tr -d \'[[:space:]]\''
    imageTag = "${branch}-${VERSION}.${BUILD_ID}-${latestdate.getTime()}"
    DOCKER_IMAGE = docker.build("${serviceName}:${imageTag}")

  }
}