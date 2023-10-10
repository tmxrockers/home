import cx_Oracle

# Set up your Oracle database connection parameters
username = "your_username"
password = "your_password"
dsn = "your_tns_entry"  # This can be a TNS entry or an Oracle connection string

# Establish the connection
connection = cx_Oracle.connect(username, password, dsn)

# Create a cursor object to execute SQL statements
cursor = connection.cursor()

# Example SQL query
sql_query = "SELECT * FROM your_table"

# Execute the query
cursor.execute(sql_query)

# Fetch and print results
for row in cursor:
    print(row)

# Close the cursor and connection when done
cursor.close()
connection.close()
