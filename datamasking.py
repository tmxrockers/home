import os
import sys
import win32wnet
import openpyxl
import pandas as pd

# Shared drive details
shared_drive_path = r"\\192.168.0.114\DataMasking"
username = "Arun"
password = "9655299619"

# Default metadata file location
DEFAULT_METADATA_FILE = os.path.join(shared_drive_path, "DataMasking.xlsx")

def connect_to_shared_drive():
    """Connect to the shared drive."""
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

def disconnect_from_shared_drive():
    """Disconnect from the shared drive."""
    try:
        win32wnet.WNetCancelConnection2(shared_drive_path, 0, True)
        print("Disconnected from the shared drive.")
    except Exception as e:
        print(f"Failed to disconnect from the shared drive: {e}")

def mask_email(value):
    """Mask an email address while keeping the domain intact."""
    if "@" in value:
        username, domain = value.split("@", 1)
        masked_username = "".join("x" if c.isalpha() else c for c in username)
        return f"{masked_username}@{domain}"
    return value  # Return unchanged if not a valid email

def apply_masking(value, pattern, mask_value):
    """Apply different masking patterns."""
    if value is None or str(value).strip() == "":
        return value  # Do not mask empty cells

    if pattern == "Constant":
        return mask_value
    elif pattern == "Prefix":
        return f"{mask_value}{value}"
    elif pattern == "Suffix":
        return f"{value}{mask_value}"
    elif pattern == "Email":
        return mask_email(str(value))
    elif pattern == "Null":
        return None
    return value  # Default: No masking if pattern is unknown

def is_row_empty(row):
    """Check if all values in a row are NULL or empty."""
    return all(cell.value is None or str(cell.value).strip() == "" for cell in row)

def ensure_valid_headers(sheet, header_row):
    """Ensure headers are correctly formatted as strings to avoid Alteryx issues."""
    headers = []
    for cell in sheet[header_row]:
        if isinstance(cell.value, (int, float)):  
            cell.value = f"Column_{cell.column}"  # Rename numerical headers
        elif cell.value is None or str(cell.value).strip() == "":
            cell.value = f"Column_{cell.column}"  # Rename blank headers
        else:
            cell.value = str(cell.value).strip()  # Convert to string
        cell.number_format = "@"  # Force text format
        headers.append(cell.value)
    return headers

def mask_excel_file(file_path, header_row, rules):
    """Mask Excel data while handling NULL row scenarios."""
    try:
        wb = openpyxl.load_workbook(file_path)
        sheet = wb.active  # Use the first sheet by default

        headers = ensure_valid_headers(sheet, header_row)
        column_indices = {col: idx + 1 for idx, col in enumerate(headers)}

        previous_row_empty = False  # Flag to track empty row condition

        for row in sheet.iter_rows(min_row=header_row + 1):  
            if is_row_empty(row):  
                previous_row_empty = True  
                continue  # Skip masking for empty rows

            if previous_row_empty:
                print("Skipping masking due to NULL row condition.")
                break  # Stop masking if previous row was empty

            for column_name, pattern, mask_value in rules:
                col_idx = column_indices.get(column_name)
                if col_idx:
                    cell = row[col_idx - 1]
                    cell.value = apply_masking(cell.value, pattern, mask_value)

        # Save masked file back to the shared drive
        base_dir = os.path.dirname(file_path)
        masked_folder = os.path.join(base_dir, "Masked_Files")
        os.makedirs(masked_folder, exist_ok=True)  # Create only if not exists

        output_file = os.path.join(masked_folder, os.path.basename(file_path))
        wb.save(output_file)
        print(f"Masked file saved: {output_file}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main(metadata_file):
    """Main function to process the metadata file."""
    connect_to_shared_drive()

    # Read metadata file
    if not os.path.exists(metadata_file):
        print(f"Metadata file not found at {metadata_file}. Using default location: {DEFAULT_METADATA_FILE}")
        metadata_file = DEFAULT_METADATA_FILE

    metadata_df = pd.read_excel(metadata_file)

    # Rest of your masking logic...
    grouped_rules = metadata_df.groupby(["Workflow Type", "File Path", "Header Row"])

    for (workflow_type, file_path, header_row), group in grouped_rules:
        full_file_path = os.path.join(shared_drive_path, file_path)
        masking_rules = list(zip(group["Column Name"], group["Masking Pattern"], group["Masking Value"]))
        mask_excel_file(full_file_path, int(header_row), masking_rules)

    disconnect_from_shared_drive()

if __name__ == "__main__":
    # Accept metadata file path as a command-line argument
    metadata_file = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_METADATA_FILE
    main(metadata_file)
