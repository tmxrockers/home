import os

# Specify the directory where temporary files are stored
temp_directory = r'C:\Path\To\Your\Temporary\Directory'

# Delete all files in the temporary directory
for filename in os.listdir(temp_directory):
    file_path = os.path.join(temp_directory, filename)
    try:
        if os.path.isfile(file_path):
            os.unlink(file_path)
    except Exception as e:
        print(f"Error deleting {file_path}: {e}")
