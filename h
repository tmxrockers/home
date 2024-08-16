### Jira Epic: Enhancements and Bug Fixes for ITCL Snapshot and ETL Workflows

**Epic Description:**

This Epic aims to implement a series of enhancements and bug fixes related to the ITCL Monthly & Weekly Snapshot reports and ETL workflows. These updates are essential for improving the accuracy and efficiency of data management within the system. Key objectives include updating hierarchy details in F29, ensuring valid data entries in the "Multi Row" column, expanding the copper view with additional fields, and refining the ETL summary report by removing unused workflows and adjusting the SP ETL process to handle the "Has Visa" field appropriately.

**Acceptance Criteria:**

1. **Hierarchy Updates in F29:**
   - New hierarchy details are correctly reflected in the F29 table when generating ITCL Monthly & Weekly Snapshot reports.
   - Testing confirms that the hierarchy is consistent across all relevant views and reports.

2. **Multi-Row Column Validation:**
   - The system only accepts a capital "Y" or a capital "N" as valid entries for the "Multi Row" column during the generation of ITCL Headcount Reports.
   - Any attempt to input invalid values is rejected with an appropriate error message.

3. **Copper View Updates:**
   - The copper view is updated to include the fields: Overall Status, Stage of Onboarding, Vendor Name, Name of Candidate, Expected Start Date, Secondary Skill, Tertiary Skill, and Job Description.
   - All fields are accurately populated and displayed for relevant records in the copper view.

4. **ETL Summary Report Updates:**
   - Unused workflows are successfully removed from the ETL summary report.
   - The ETL summary report screen accurately reflects the six active workflows: ITCL Incremental, SP Incremental, Finance_Forecast Initiative Funding, ITCL Open_Positions Report, Finance Forecast Report, and Work Order Pipeline SOW Queue Report.

5. **SP ETL Process Modification:**
   - The SP ETL process correctly checks the SP Universal Set table before updating the "Has Visa" column.
   - For records found in the SP Universal Set table, the "Has Visa" column is populated with the existing value.
   - For records not found, the "Has Visa" column is updated with a hyphen, following current system behavior.
   - Validation and testing confirm that the process is working as expected, without introducing any errors or inconsistencies.

---

These criteria ensure that the objectives of the Epic are met, and that the system functions as intended after the implementation of the described enhancements and fixes.