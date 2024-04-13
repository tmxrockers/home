WITH RankedData AS (
    SELECT 
        REPORT_DATE,
        DSCRPTN,
        UPLOAD_VERSION,
        ROW_NUMBER() OVER (PARTITION BY REPORT_DATE ORDER BY UPLOAD_DATE DESC) AS rn
    FROM finance_ref_master_data
    WHERE DSCRPTN = 'Current Forecast'
)
SELECT 
    REPORT_DATE,
    UPLOAD_DATE,
    UPLOAD_VERSION,
    DSCRPTN
FROM finance_ref_master_data
WHERE DSCRPTN = 'Current Forecast'
OR (REPORT_DATE, UPLOAD_VERSION) IN (
    SELECT REPORT_DATE, UPLOAD_VERSION
    FROM RankedData
    WHERE rn = 1
)
ORDER BY REPORT_DATE DESC, UPLOAD_VERSION DESC;



WITH QuarterRanking AS (
    SELECT 
        REPORT_DATE, 
        DSCRPTN,
        CASE 
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '0+12' THEN 1
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '4+8' THEN 2
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '7+5' THEN 3
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '10+2' THEN 4
            ELSE 0
        END AS QuarterRank
    FROM finance_ref_master_data
)
SELECT 
    REPORT_DATE, 
    MAX(UPLOAD_DATE) AS MAX_UPLOAD_DATE,
    QuarterRank
FROM QuarterRanking
GROUP BY REPORT_DATE, QuarterRank
ORDER BY REPORT_DATE DESC, QuarterRank ASC;




WITH forecast_data AS (
  SELECT f.*,
         -- Extract quarter and year from DSCRPTN
         TO_NUMBER(SUBSTR(DSCRPTN, INSTR(DSCRPTN, '+') + 1)) AS quarter,
         TO_NUMBER(SUBSTR(DSCRPTN, 1, INSTR(DSCRPTN, '+') - 1)) AS year
  FROM finanance_ref_master_data f
  WHERE DSCRPTN LIKE 'Current Forecast%'
),
-- Find the maximum upload version for each non-recent quarter
max_version_per_quarter AS (
  SELECT year, quarter, MAX(upload_version) AS max_version
  FROM forecast_data
  GROUP BY year, quarter
  HAVING year || quarter <> (
    SELECT TO_CHAR(MAX(upload_date), 'YYYY') || 
           TO_CHAR(MAX(CASE WHEN DSCRPTN LIKE 'Current Forecast%' THEN 
                             TO_NUMBER(SUBSTR(DSCRPTN, INSTR(DSCRPTN, '+') + 1))
                          END), 'Q')
    FROM finanance_ref_master_data
  )
)
-- Select data for the drop-down
SELECT f.upload_version,
       f.year || ' Q' || f.quarter AS description
FROM forecast_data f
LEFT JOIN max_version_per_quarter mv ON f.year = mv.year AND f.quarter = mv.quarter
WHERE (f.year || f.quarter = (  -- Recent quarter (all versions)
         SELECT TO_CHAR(MAX(upload_date), 'YYYY') || 
                TO_CHAR(MAX(CASE WHEN DSCRPTN LIKE 'Current Forecast%' THEN 
                                 TO_NUMBER(SUBSTR(DSCRPTN, INSTR(DSCRPTN, '+') + 1))
                              END), 'Q')
         FROM finanance_ref_master_data
       )
     OR f.upload_version = mv.max_version) -- Other quarters (latest version)
ORDER BY year, quarter, upload_version DESC;




WITH recent_data AS (
    SELECT 
        UPLOAD_DATE,
        UPLOAD_VERSION,
        ROW_ID,
        DSCRPTN,
        ABBERVTIN,
        ROW_NUMBER() OVER (PARTITION BY DSCRPTN ORDER BY UPLOAD_DATE DESC, UPLOAD_VERSION DESC) AS rn
    FROM 
        finance_data
    WHERE 
        DSCRPTN = 'Current Forecast'
),
max_version_data AS (
    SELECT 
        UPLOAD_DATE,
        UPLOAD_VERSION,
        ROW_ID,
        DSCRPTN,
        ABBERVTIN
    FROM 
        finance_data
    WHERE 
        DSCRPTN = 'Current Forecast'
    AND 
        UPLOAD_VERSION = (SELECT MAX(UPLOAD_VERSION) FROM finance_data WHERE DSCRPTN = 'Current Forecast')
)
SELECT 
    UPLOAD_DATE,
    UPLOAD_VERSION,
    ROW_ID,
    DSCRPTN,
    ABBERVTIN
FROM 
    recent_data
WHERE 
    rn = 1
UNION ALL
SELECT 
    UPLOAD_DATE,
    UPLOAD_VERSION,
    ROW_ID,
    DSCRPTN,
    ABBERVTIN
FROM 
    max_version_data
WHERE 
    UPLOAD_VERSION <> (SELECT MAX(UPLOAD_VERSION) FROM finance_data WHERE DSCRPTN = 'Current Forecast')
ORDER BY 
    UPLOAD_DATE DESC;
