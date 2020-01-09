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

                def lightHouseReport = readJSON file: 'lighthouse-report.json'
                def reportCategories = lightHouseReport['categories']
                def minPerformanceRequirement = 0.9

                def performanceScore = reportCategories['performance']['score']

				echo performanceScore

                def accessibilityScore = reportCategories['accessibility']['score']
                def bestPracticesScore = reportCategories['best-practices']['score']
                def seoScore = reportCategories['seo']['score']

                if (performanceScore < minPerformanceRequirement || accessibilityScore < minPerformanceRequirement || bestPracticesScore < minPerformanceRequirement || seoScore < minPerformanceRequirement) {
                    throw new Exception('Performance test failed!')
                }
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

