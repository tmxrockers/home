import sys
import traceback

def main(metadata_file):
    try:
        # Your existing logic here
        print(f"Processing metadata file: {metadata_file}")
        # Simulate an error for testing
        if metadata_file == "invalid_file.xlsx":
            raise ValueError("Invalid metadata file provided!")
    except Exception as e:
        # Print the exception message and stack trace
        print(f"Exception occurred: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)  # Exit with a non-zero status code to indicate failure

if __name__ == "__main__":
    metadata_file = sys.argv[1] if len(sys.argv) > 1 else "default_file.xlsx"
    main(metadata_file)
