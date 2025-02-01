import os
import win32wnet
import openpyxl

# Shared drive details
shared_drive_path = r"\\192.168.0.114\DataMasking"
username = "Arun"
password = "9655299619"

# Excel file path on the shared drive
excel_file_path = os.path.join(shared_drive_path, "GDCE Resource Skill Details.xlsx")

# Connect to the shared drive
try:
    win32wnet.WNetAddConnection2(
        0,  # Type of resource (0 = disk)
        None,  # Local device name (None for no redirection)
        shared_drive_path,  # Remote network name
        None,  # Provider name (None for default)
        username,
        password,
    )
    print("Connected to the shared drive successfully.")
except Exception as e:
    print(f"Failed to connect to the shared drive: {e}")
    exit()

# Read the Excel file
try:
    workbook = openpyxl.load_workbook(excel_file_path)
    sheet = workbook.active

    # Example: Read data from the first row
    for row in sheet.iter_rows(min_row=1, max_row=1, values_only=True):
        print(row)

    # Example: Write data to the Excel file
    sheet.cell(row=2, column=1, value="New Data")
    workbook.save(excel_file_path)
    print("Excel file updated successfully.")

except Exception as e:
    print(f"Error reading/writing the Excel file: {e}")

# Disconnect from the shared drive
try:
    win32wnet.WNetCancelConnection2(shared_drive_path, 0, True)
    print("Disconnected from the shared drive.")
except Exception as e:
    print(f"Failed to disconnect from the shared drive: {e}")
