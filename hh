Absolutely! Let's provide a comprehensive list of all the "Masking Value Filter" conditions, along with examples, based on the `evaluate_filter_condition` function, including the "not equal" (`ne` or `!=`) condition.

**Understanding the Filter Condition Syntax**

The filter condition is a string that specifies one or more conditions that must be met for a masking rule to be applied. The conditions are separated by semicolons (`;`), and they can be combined using "AND" or "OR" operators.

**Condition Format:** `ColumnName,Operator,Value`

**Operators:**

* **`eq`:** Equal to
* **`ne` or `!=`:** Not equal to
* **`gt`:** Greater than
* **`lt`:** Less than
* **`contains`:** Contains (substring)
* **`startswith`:** Starts with
* **`endswith`:** Ends with

**Examples:**

1.  **Simple Equality (`eq`)**

    * **Condition:** `Country,eq,'USA'`
    * **Explanation:** Apply the masking rule only if the "Country" column is equal to "USA".
    * **Example Data:**
        * `Country`: "USA" (Rule applies)
        * `Country`: "Canada" (Rule does not apply)

2.  **Not Equal (`ne` or `!=`)**

    * **Condition:** `Department,ne,'Finance'` or `Department,!=,'Finance'`
    * **Explanation:** Apply the masking rule only if the "Department" column is *not* equal to "Finance".
    * **Example Data:**
        * `Department`: "Sales" (Rule applies)
        * `Department`: "Finance" (Rule does not apply)

3.  **Greater Than (`gt`)**

    * **Condition:** `Age,gt,30`
    * **Explanation:** Apply the masking rule only if the "Age" column is greater than 30.
    * **Example Data:**
        * `Age`: 35 (Rule applies)
        * `Age`: 25 (Rule does not apply)

4.  **Less Than (`lt`)**

    * **Condition:** `Salary,lt,50000`
    * **Explanation:** Apply the masking rule only if the "Salary" column is less than 50000.
    * **Example Data:**
        * `Salary`: 45000 (Rule applies)
        * `Salary`: 60000 (Rule does not apply)

5.  **Contains (`contains`)**

    * **Condition:** `Department,contains,'Sales'`
    * **Explanation:** Apply the masking rule only if the "Department" column contains the substring "Sales".
    * **Example Data:**
        * `Department`: "Sales and Marketing" (Rule applies)
        * `Department`: "Finance" (Rule does not apply)

6.  **Starts With (`startswith`)**

    * **Condition:** `EmployeeID,startswith,'EMP'`
    * **Explanation:** Apply the masking rule only if the "EmployeeID" column starts with "EMP".
    * **Example Data:**
        * `EmployeeID`: "EMP123" (Rule applies)
        * `EmployeeID`: "123EMP" (Rule does not apply)

7.  **Ends With (`endswith`)**

    * **Condition:** `FileName,endswith,'.txt'`
    * **Explanation:** Apply the masking rule only if the "FileName" column ends with ".txt".
    * **Example Data:**
        * `FileName`: "document.txt" (Rule applies)
        * `FileName`: "document.docx" (Rule does not apply)

8.  **Combining Conditions with "AND"**

    * **Condition:** `Country,eq,'USA';AND;Age,gt,30`
    * **Explanation:** Apply the masking rule only if both the "Country" is "USA" *and* the "Age" is greater than 30.
    * **Example Data:**
        * `Country`: "USA", `Age`: 35 (Rule applies)
        * `Country`: "USA", `Age`: 25 (Rule does not apply)
        * `Country`: "Canada", `Age`: 35 (Rule does not apply)

9.  **Combining Conditions with "OR"**

    * **Condition:** `Country,eq,'USA';OR;Country,eq,'IND'`
    * **Explanation:** Apply the masking rule if the "Country" is either "USA" *or* "IND".
    * **Example Data:**
        * `Country`: "USA" (Rule applies)
        * `Country`: "IND" (Rule applies)
        * `Country`: "Canada" (Rule does not apply)

10. **Complex Combinations**

    * **Condition:** `Country,eq,'USA';OR;Department,contains,'Sales';AND;Age,lt,40`
    * **Explanation:** Apply the masking rule if the "Country" is "USA" *or* if the "Department" contains "Sales" *and* the "Age" is less than 40.
    * **Example Data:**
        * `Country`: "USA", `Department`: "Finance", `Age`: 45 (Rule applies)
        * `Country`: "Canada", `Department`: "Sales and Marketing", `Age`: 35 (Rule applies)
        * `Country`: "Canada", `Department`: "Sales and Marketing", `Age`: 45 (Rule does not apply)
        * `Country`: "Canada", `Department`: "Finance", `Age`: 45 (Rule does not apply)

**Important Notes:**

* String values in the filter conditions must be enclosed in single quotes (e.g., `'USA'`).
* Numeric values should not be enclosed in quotes (e.g., `30`).
* The filter conditions are case-sensitive.
* The condition is evaluated from left to right.

I hope this thorough explanation and set of examples are helpful!
