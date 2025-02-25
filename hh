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





Right, let's add specific examples of the "Range" (or "Conditional" as it's labeled in your image) condition to the list, with a focus on how it interacts with the filter conditions.

**Range (Conditional) Condition Examples**

Remember, the "Range" condition (labeled as "Conditional" in your image) allows for complex numeric masking based on ranges and multipliers.

**1. Simple Range with Filter**

* **Metadata:**
    * `Masking Pattern`: `Conditional`
    * `Masking Value`: `10-20`
    * `Masking Value Filter`: `Country,eq,'USA'`
* **Explanation:** If the "Country" is "USA", generate a random number between 10 and 20 (inclusive).
* **Example Data:**
    * `Country`: "USA", `Value`: 15 (Output: a random number between 10 and 20)
    * `Country`: "Canada", `Value`: 15 (Output: 15 - no change)

**2. Complex Range with Multiple Conditions**

* **Metadata:**
    * `Masking Pattern`: `Conditional`
    * `Masking Value`: `eq,0,1.0;range,20,50,1.1;jge,56,0.8`
    * `Masking Value Filter`: `Country,eq,'USA';OR;Country,eq,'IND'`
* **Explanation:**
    * If the "Country" is "USA" or "IND", apply the following:
        * If the value is 0, multiply it by 1.0 (no change).
        * If the value is between 20 and 50, generate a random number in that range and multiply it by 1.1.
        * If the value is greater than or equal to 56, multiply it by 0.8.
* **Example Data:**
    * `Country`: "USA", `Value`: 0 (Output: 0)
    * `Country`: "IND", `Value`: 30 (Output: a random number between 20 and 50, multiplied by 1.1)
    * `Country`: "USA", `Value`: 60 (Output: 60 * 0.8 = 48)
    * `Country`: "Canada", `Value`: 30 (Output: 30 - no change)

**3. Range with Age-Based Conditions**

* **Metadata:**
    * `Masking Pattern`: `Conditional`
    * `Masking Value`: `age,0-20,2.0;range,20-50,1.1;jge,56,0.8`
    * `Masking Value Filter`: `Country,eq,'USA';OR;Country,eq,'IND'`
* **Explanation:**
    * If the "Country" is "USA" or "IND", apply the following based on the "Age" column:
        * If "Age" is between 0 and 20, generate a random number between 0 and 20, and multiply that random number by 2.0.
        * If "Age" is between 20 and 50, generate a random number between 20 and 50, and multiply that random number by 1.1.
        * If "Age" is greater than or equal to 56, multiply the original value by 0.8.
* **Example Data:**
    * `Country`: "USA", `Age`: 18, `Value`: 10 (Output: a random number between 0 and 20, multiplied by 2.0)
    * `Country`: "IND", `Age`: 35, `Value`: 30 (Output: a random number between 20 and 50, multiplied by 1.1)
    * `Country`: "USA", `Age`: 60, `Value`: 60 (Output: 60 * 0.8 = 48)
    * `Country`: "Canada", `Age`: 35, `Value`: 30 (Output: 30 - no change)

**Key Considerations for Range Conditions:**

* The "Range" condition is specifically for numeric data.
* The filter conditions determine when the range masking is applied.
* The code uses random.choice([2,3]) to get either 2 or 3 decimal places.
* When using the age based logic, the age column must be present in the excel file.

These examples should further clarify how the "Range" condition works within your data masking process.


Absolutely! Let's break down each masking pattern and its logic, along with examples, based on the code and the metadata you've provided.

**Masking Patterns and Logic**

1.  **Constant:**

    * **Logic:** Replaces the original cell value with the specified `Masking Value`.
    * **Metadata Example:**
        * `Masking Pattern`: `Constant`
        * `Masking Value`: `Candidate, Name`
    * **Example Data:**
        * Input: `Contractor`: `John Doe`
        * Output: `Contractor`: `Candidate, Name`

2.  **Prefix:**

    * **Logic:** Adds the `Masking Value` to the beginning of the original cell value.
    * **Metadata Example:**
        * `Masking Pattern`: `Prefix`
        * `Masking Value`: `PREFIX_`
    * **Example Data:**
        * Input: `EmployeeID`: `12345`
        * Output: `EmployeeID`: `PREFIX_12345`

3.  **Suffix:**

    * **Logic:** Adds the `Masking Value` to the end of the original cell value.
    * **Metadata Example:**
        * `Masking Pattern`: `Suffix`
        * `Masking Value`: `_PR`
    * **Example Data:**
        * Input: `Contractor ID`: `12345`
        * Output: `Contractor ID`: `12345_PR`

4.  **Email:**

    * **Logic:** Masks the username portion of an email address while keeping the domain intact.
    * **Metadata Example:**
        * `Masking Pattern`: `Email`
        * `Masking Value`: (Not used)
    * **Example Data:**
        * Input: `Email`: `john.doe@example.com`
        * Output: `Email`: `jxxxx.xxx@example.com`

5.  **Range (Conditional):**

    * **Logic:** Applies complex numeric masking based on ranges and multipliers.
    * **Metadata Example:**
        * `Masking Pattern`: `Conditional` (treated as Range)
        * `Masking Value`: `eq,0,1,0, age, 0-20,2.0;range, 20-50,1.1; range, 53-56,1.0;jge,56,0.8`
    * **Example Data:**
        * Input: `Current Bill Rate (ST/Hr)`: `0`, `Age`: `30`
        * Output: `Current Bill Rate (ST/Hr)`: `0` (eq,0,1.0)
        * Input: `Current Bill Rate (ST/Hr)`: `30`, `Age`: `30`
        * Output: `Current Bill Rate (ST/Hr)`: Random number between 20 and 50, multiplied by 1.1.
        * Input: `Current Bill Rate (ST/Hr)`: `60`, `Age`: `60`
        * Output: `Current Bill Rate (ST/Hr)`: `60 * 0.8 = 48`

6.  **Null:**

    * **Logic:** Replaces the original cell value with `None` (NULL).
    * **Metadata Example:**
        * `Masking Pattern`: `Null`
        * `Masking Value`: (Not used)
    * **Example Data:**
        * Input: `PhoneNumber`: `123-456-7890`
        * Output: `PhoneNumber`: `None`

**Interactions with Filter Conditions**

* All the patterns can be used in combination with the filter conditions.
* The filter conditions decide if the masking pattern is applied to the cell or not.
* If the filter condition is met, then the masking pattern is applied.
* If the filter condition is not met, then the original value of the cell is kept.

**Example with Filter:**

* **Metadata:**
    * `Masking Pattern`: `Suffix`
    * `Masking Value`: `_PR`
    * `Masking Value Filter`: `Country,eq,'USA'`
* **Example Data:**
    * Input: `Contractor ID`: `12345`, `Country`: `USA`
    * Output: `Contractor ID`: `12345_PR`
    * Input: `Contractor ID`: `12345`, `Country`: `Canada`
    * Output: `Contractor ID`: `12345` (No change)

This comprehensive overview should give you a clear understanding of each masking pattern and how they work within the data masking process.

