import groovy.json.JsonSlurperClassic

node {
	checkout scm
    def gitDocker = docker.build("custom-withgit:0.5")
    try {
        gitDocker.inside {

            stage('Build') { 
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm run build'
            }

            stage('Performance Test') {
                sh 'node lightHouseTestServer &'
                sh 'npm run lighthouse'

				def lightHouseReport = readJSON(file:'lighthouse.report.json')
                def reportCategories = lightHouseReport['categories']

                def minPerformanceRequirement = 0.1

                def accessibilityScore = reportCategories['accessibility']['score']
                def performanceScore = reportCategories['performance']['score']
                def bestPracticesScore = reportCategories['best-practices']['score']
                def seoScore = reportCategories['seo']['score']

                if (performanceScore < minPerformanceRequirement || accessibilityScore < minPerformanceRequirement || bestPracticesScore < minPerformanceRequirement || seoScore < minPerformanceRequirement) {
                    throw new Exception('Performance test failed!')
                }

                publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: '.',
                  reportFiles: 'lighthouse.report.html',
                  reportName: "Lighthouse"
                ])
            }

            stage("Notify success build") {
                echo 'Succes'
			}
        }

        stage('Clean workspace') {
            deleteDir()
        }
    }
    catch(ex) {
        echo ex.toString()
    }
}

