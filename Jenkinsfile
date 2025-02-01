pipeline {
    agent any

    parameters {
        file(name: 'METADATA_FILE', description: 'Upload the metadata file (optional)')
    }

    environment {
        BITBUCKET_REPO = "https://github.com/tmxrockers/home.git" // Update with your repo URL
        REPO_DIR = "home" // Directory where the repo will be cloned
        DEFAULT_METADATA_FILE = "${REPO_DIR}/DataMasking.xlsx" // Default metadata file path in the repo
    }

    stages {
        stage('Clone Bitbucket Repository') {
            steps {
                script {
                    // Clone the Bitbucket repository
                    echo "Cloning Bitbucket repository: ${BITBUCKET_REPO}"
                    git branch: 'datamasking', url: "${BITBUCKET_REPO}"
                }
            }
        }

        stage('Check Metadata File') {
            steps {
                script {
                    // Check if a metadata file was uploaded
                    if (fileExists(params.METADATA_FILE)) {
                        echo "Metadata file uploaded: ${params.METADATA_FILE}"
                        METADATA_PATH = params.METADATA_FILE
                    } else {
                        echo "No metadata file uploaded. Using default location: ${DEFAULT_METADATA_FILE}"
                        METADATA_PATH = DEFAULT_METADATA_FILE
                    }
                }
            }
        }

        stage('Run Python Script') {
            steps {
                script {
                    // Run the Python script with the metadata file path
                    echo "Running Python script from repository..."
                    bat "python ${REPO_DIR}/datamasking.py ${METADATA_PATH}" // Update with your script name
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}