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

                // def lightHouseReport = readJSON file: 'lighthouse-report.json'
				// assert lightHouseReport['key'] == 'value'
				// assert lightHouseReport.key == 'value'

				def lightHouseReport = readJSON(file:'lighthouse-report.json')
                echo lightHouseReport

				echo 'THIS IS SPARTA'

                def reportCategories = lightHouseReport['categories']
                echo reportCategories

                echo 'THIS IS SPARTA'

                def accessibilityScore = reportCategories['accessibility']['score']
                echo accessibilityScore

                // def reportCategories = lightHouseReportJson['categories']
                // def minPerformanceRequirement = 0.9

                // def performanceScore = reportCategories['performance']['score']

				// echo performanceScore

                // def accessibilityScore = reportCategories['accessibility']['score']
                // def bestPracticesScore = reportCategories['best-practices']['score']
                // def seoScore = reportCategories['seo']['score']

                // if (performanceScore < minPerformanceRequirement || accessibilityScore < minPerformanceRequirement || bestPracticesScore < minPerformanceRequirement || seoScore < minPerformanceRequirement) {
                //     throw new Exception('Performance test failed!')
                // }
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

